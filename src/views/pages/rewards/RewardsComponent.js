import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomText from "views/components/CustomText";
import CustomImage from "views/components/CustomImage";
import RewardsContainer from "./RewardsContainer";
import ArrowH from "assets/images/arrow_h.svg";
import ArrowHD from "assets/images/arrow_hd.svg";
import VLine from "assets/images/vline.svg";
import VSLine from "assets/images/vsline.svg";
import { toast, ToastContainer } from "react-toastify";
import BalanceIcon from "assets/images/balanceIcon.svg";
import LizCoinIcon from "assets/images/lizCoinIcon.png";
import LineCharts from "../home/LineChart";
import { getPriceRate } from "functions/Utility";
import { config } from "constant";
import { getRewardsPerWeight } from "functions/Utility";
import { lizBalance } from "functions/Utility";
import { useSelector } from "react-redux";
import { modifyScale } from "functions/Utility";
import { getUnclaimedRewards } from "functions/Utility";
import { claimReward } from "functions/Utility";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getReward } from "functions/Utility";
import { getStakedLizards } from "functions/Utility";
import Loader from "views/layout/Loader";
import { Link } from "react-router-dom";

export default function RewardsComponent({
  showHideChart = true,
  width = 400,
  height = 150,
  data = [],
}) {
  const isPhoneMode = useMediaQuery("(max-width:600px)");
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);

  const [rewardsPerWeight, setRewardsPerWeight] = useState(0);
  const [balance, setBalance] = useState(0);
  const [lizPrice, setLizPrice] = useState(0);
  const [lizRate, setLizRate] = useState(0);
  const [lizHistory, setLizHistory] = useState({});
  const [unClaimedReward, setUnClaimedReward] = useState(0);
  const [genesisAmt, setGenesisAmt] = useState(0);
  const [ethLizAmt, setEthLizAmt] = useState(0);
  const [reward, setReward] = useState({});
  const [dailyEarned, setDailyEarned] = useState(0);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const getLizHistory = async () => {
    fetch(config.lizcoinHistory).then((response) => {
      response.json().then((jsonData) => {
        const prices = jsonData.prices;
        const rate = getPriceRate(prices);
        const history = [];
        for (var i = 0; i < prices.length; i += 20) {
          history.push({ price: prices[i][1] });
        }
        setLizHistory(modifyScale(history));
        setLizRate(rate);
        setLizPrice(prices[prices.length - 1][1]);
      });
    });
  };

  const claim = async () => {
    try {
      if (unClaimedReward > 0) {
        setLoading(true);
        setTitle("Claiming now...");
        await claimReward();
        setBalance(await lizBalance(walletAddress));
        setUnClaimedReward(await getUnclaimedRewards(walletAddress));
        const reward = await getReward(walletAddress);
        setReward(reward);
        setLoading(false);
        toast.success("Claim Successful.");
      } else {
        toast.info("No Reward!");
      }
    } catch (e) {
      toast.error("Claim failed.");
      setLoading(false);
    }
  };

  const initData = async () => {
    await getLizHistory();
    const rewardsWeight = await getRewardsPerWeight();
    setRewardsPerWeight(rewardsWeight);
    setBalance(await lizBalance(walletAddress));
    setUnClaimedReward(await getUnclaimedRewards(walletAddress));
    const reward = await getReward(walletAddress);
    setReward(reward);
    setDailyEarned(
      rewardsWeight.totalWeight != 0
        ? (((reward.stakedWeight * rewardsWeight.rate) /
            rewardsWeight.totalWeight) *
            86400) /
            config.decimal
        : 0
    );
    const stakedData = await getStakedLizards(walletAddress);
    setGenesisAmt(stakedData.gLizards.length);
    setEthLizAmt(stakedData.ethLizards.length);
  };

  useEffect(() => {
    if (config.rewardStatus) {
      let isSubscribed = true;
      if (isSubscribed && correctNet && web3Object) {
        initData();
      }
      return () => (isSubscribed = false);
    }
  }, [walletAddress, correctNet, web3Object]);
  
  return (
    <div className="items-center pt-12 pb-20">
      {config.rewardStatus ? (
        <>
          <div className="w-full sm:w-1/4 flex flex-row justify-between items-center pb-4 space-x-4">
            <div className="flex items-center">
              <CustomImage src={LizCoinIcon} className="h-10" />
              <div className="flex flex-col ml-2">
                <CustomText color="title" align="left" size="sm" bold="bold">
                  Liz Coin Price
                </CustomText>
                <CustomText align="left" size="lg" bold="bold">
                  ${lizPrice.toLocaleString()}
                </CustomText>
              </div>
            </div>
            <div className="flex items-center pl-10  space-x-1">
              <CustomImage src={lizRate > 0 ? ArrowH : ArrowHD}></CustomImage>
              <div className="flex flex-col">
                <CustomText
                  className={`${
                    lizRate > 0 ? "text-green-500" : "text-red-600"
                  }`}
                  size="sm"
                >
                  {lizRate > 0 ? "+" : "-"}{" "}
                  {`${Math.abs(lizRate).toLocaleString()}`}% in
                </CustomText>
                <CustomText color="title" size="sm">
                  24 hours
                </CustomText>
              </div>
            </div>
          </div>
          <div className="py-4">
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <RewardsContainer
                  title="LIZ Earned Daily"
                  amount={dailyEarned}
                  unitPrice={lizPrice}
                  total={false}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <RewardsContainer
                  title="Total LIZ Claimed"
                  amount={reward.totalClaimed / config.decimal}
                  unitPrice={lizPrice}
                  total={false}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <RewardsContainer
                  title="User Weight"
                  amount={reward.stakedWeight}
                  unitPrice={`Ethlizards ${ethLizAmt} | Genesis Ethlizards ${genesisAmt}`}
                  total={true}
                />
              </Grid>
            </Grid>
          </div>
          {isPhoneMode ? (
            <div className="flex justify-center  w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover p-4">
              <Grid container>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="border-b border-white border-opacity-5"
                >
                  <CustomText size="xl" color="white" align="center">
                    {"UnClaimed Rewards"}
                  </CustomText>
                  <CustomText
                    size="lg"
                    color="white"
                    className="pt-8"
                    align="center"
                  >
                    {unClaimedReward.toLocaleString()} $LIZ
                  </CustomText>
                  <CustomText
                    size="sm"
                    className="pt-2 pb-8"
                    align="center"
                    color="title"
                  >
                    ${(unClaimedReward * lizPrice).toLocaleString()}
                  </CustomText>
                  <button
                    onClick={claim}
                    className="w-full border-solid border rounded-md border-btncolor bg-btncolor py-2"
                  >
                    <CustomText
                      align="center"
                      className="text-baseft"
                      bold="bold"
                    >
                      Claim Rewards
                    </CustomText>
                  </button>
                  <div className="pb-8"></div>
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-row pt-4 space-x-2">
                    <CustomImage src={BalanceIcon}></CustomImage>
                    <CustomText
                      color="title"
                      align="left"
                      size="lg"
                      bold="bold"
                    >
                      Your balance
                    </CustomText>
                  </div>
                  <CustomText
                    color="white"
                    align="left"
                    className="pt-6 text-4xl"
                    bold="bold"
                  >
                    ${(balance * lizPrice).toLocaleString()}
                  </CustomText>
                  <CustomText
                    color="title"
                    align="left"
                    size="xl"
                    className="pt-2"
                  >
                    {balance} $LIZ
                  </CustomText>
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LineCharts
                    showHideChart={showHideChart}
                    width={width}
                    height={height}
                    data={lizHistory}
                  ></LineCharts>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div className="flex justify-between  w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover p-4">
              <Grid container>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <div className="flex flex-row pl-6 pt-4 space-x-2">
                    <CustomImage src={BalanceIcon}></CustomImage>
                    <CustomText
                      color="title"
                      align="left"
                      size="lg"
                      bold="bold"
                    >
                      Your balance
                    </CustomText>
                  </div>
                  <CustomText
                    color="white"
                    align="left"
                    className="pl-6 pt-6 text-4xl"
                    bold="bold"
                  >
                    ${(balance * lizPrice).toLocaleString()}
                  </CustomText>
                  <CustomText
                    color="title"
                    align="left"
                    size="xl"
                    className="pl-6 pt-4"
                  >
                    {balance.toLocaleString()} $LIZ
                  </CustomText>
                </Grid>
                <Grid
                  item
                  lg={5}
                  md={5}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LineCharts
                    showHideChart={showHideChart}
                    width={width}
                    height={height}
                    data={lizHistory}
                  ></LineCharts>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="">
                  <Grid container justifyContent={"space-around"}>
                    <Grid
                      item
                      lg={2}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        paddingLeft: "20px",
                      }}
                    >
                      <CustomImage
                        src={VLine}
                        className="flex flex-end"
                      ></CustomImage>
                    </Grid>
                    <Grid
                      item
                      lg={10}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        size="xl"
                        color="white"
                        align="center"
                        bold="bold"
                      >
                        {"UnClaimed Rewards"}
                      </CustomText>
                      <CustomText
                        size="lg"
                        color="white"
                        className="pt-8"
                        align="center"
                        bold="bold"
                      >
                        {unClaimedReward.toLocaleString()} $LIZ
                      </CustomText>
                      <CustomText
                        size="sm"
                        className="pt-2 pb-8"
                        align="center"
                        color="title"
                      >
                        ${(unClaimedReward * lizPrice).toLocaleString()}
                      </CustomText>
                      <button
                        onClick={claim}
                        className="w-1/2 border-solid border rounded-md border-btncolor bg-btncolor py-2"
                      >
                        <CustomText
                          align="center"
                          className="text-baseft"
                          bold="bold"
                        >
                          Claim Rewards
                        </CustomText>
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}

          <div>
            <Grid container spacing={2} paddingTop={4}>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <CustomText size="xl" color="white" align="center" bold="bold">
                  {"Total Staked Weight"}
                </CustomText>
                <CustomText
                  size="lg"
                  color="white"
                  className="pt-2"
                  align="center"
                  bold="bold"
                >
                  {rewardsPerWeight
                    ? rewardsPerWeight.totalWeight.toLocaleString()
                    : 0}
                </CustomText>
                <CustomText
                  size="sm"
                  className="pt-2"
                  align="center"
                  color="title"
                >
                  {"All lizards staked"}
                </CustomText>
              </Grid>
              {isPhoneMode ? null : (
                <Grid
                  item
                  lg={2}
                  md={2}
                  sm={0}
                  xs={0}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CustomImage src={VSLine}></CustomImage>
                </Grid>
              )}

              <Grid item lg={5} md={5} sm={12} xs={12}>
                <CustomText size="xl" color="white" align="center" bold="bold">
                  {"Rate Per Weight"}
                </CustomText>
                <CustomText
                  size="lg"
                  color="white"
                  className="pt-2"
                  align="center"
                  bold="bold"
                >
                  {rewardsPerWeight && rewardsPerWeight.totalWeight != 0
                    ? (
                        rewardsPerWeight.rate /
                        rewardsPerWeight.totalWeight /
                        10 ** 18
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 9,
                        maximumFractionDigits: 9,
                      })
                    : 0}
                </CustomText>
                <CustomText
                  size="sm"
                  className="pt-2"
                  align="center"
                  color="title"
                >
                  {"liz p/s"}
                </CustomText>
              </Grid>
            </Grid>
          </div>
          <Loader statusTitle={title} isLoading={loading} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 pb-36">
          <div className="py-16">
            <CustomText size="3xl" align="center" className="pt-20" bold="bold">
              Reward is not available.
            </CustomText>
          </div>
          <button
            // onClick={airdrop}
            className="w-1/2 sm:w-1/6 border-solid border rounded-md border-btncolor bg-btncolor py-3"
          >
            <Link to="/home">
              <CustomText align="center" className="text-baseft" bold="bold">
                View Dashboard
              </CustomText>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
