import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import CustomText from "views/components/CustomText";
import Grid3Icon from "assets/images/grid3.svg";
import Grid2Icon from "assets/images/grid2.svg";
import ColIcon from "assets/images/colIcon.svg";
import NftCard from "./nftCard";
import CustomImage from "views/components/CustomImage";
import { Grid } from "@mui/material";
import NftOperationCard from "./nftOperationCard";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getLizardsData } from "functions/Utility";
import { getReward } from "functions/Utility";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "react-scroll-to-top";
import MySVG from "assets/images/up_arrow.svg";
import { Link } from "react-router-dom";
import { config } from "constant";

const drawerBleeding = 56;
export default function StakingComponent() {
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);
  const storeLizards = useSelector(
    (state) => state?.data?.stakingLizards ?? []
  );

  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [gridCount, setGridCount] = useState(true);
  const [buttonActive, setButtonActive] = useState(3);
  const [totalLizards, setTotalLizards] = useState([]);
  const [unstakedLizards, setUnstakedLizards] = useState([]);
  const [unlockedLizards, setUnlockedLizards] = useState([]);
  const [lockedLizards, setLockedLizards] = useState([]);
  const [unstakingLizards, setUnstakingLizards] = useState([]);
  const [stakingLizards, setStakingLizards] = useState([]);
  const [lizards, setLizards] = useState([]);
  const [currentWeight, setCurrentWeight] = useState(0);

  const dispatch = useDispatch();
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const clickTab = (num) => {
    setButtonActive(num);
    if (num == 0) setLizards(unstakedLizards);
    else if (num == 1) setLizards(unlockedLizards);
    else if (num == 2) setLizards(lockedLizards);
    else setLizards(totalLizards);
  };

  const selectCard = (index) => {
    if (lizards[index].status == 2) {
      toast.info("Can't select locked lizards!");
      return;
    }

    if (lizards[index].isSelected) {
      const tokenID = lizards[index].tokenID;
      if (lizards[index].status == 0) {
        setStakingLizards(
          stakingLizards.filter((item) => item.tokenID != tokenID)
        );
      } else {
        setUnstakingLizards(
          unstakingLizards.filter((item) => item.tokenID != tokenID)
        );
      }
    } else {
      if (lizards[index].status == 0) {
        setStakingLizards((oldLizards) => [
          ...(oldLizards ?? []),
          lizards[index],
        ]);
      } else {
        setUnstakingLizards((oldLizards) => [
          ...(oldLizards ?? []),
          lizards[index],
        ]);
      }
    }

    var temp = lizards;
    temp[index].isSelected = !temp[index].isSelected;
    setLizards(temp);
  };

  const cancelLizard = (lizard) => {
    var index = lizards
      .map(function (item) {
        return item.tokenID;
      })
      .indexOf(lizard.tokenID);
    selectCard(index);
  };

  const updateCurrentWeight = async () => {
    const reward = await getReward(walletAddress);
    setCurrentWeight(reward.stakedWeight);
  };

  useEffect(() => {
    if (config.stakingStatus) {
      let isSubscribed = true;
      if (isSubscribed) {
        if (correctNet && web3Object && storeLizards == -1) {
          initData(true);
        }
      }
      return () => (isSubscribed = false);
    }
  }, [storeLizards, web3Object]);

  const initData = async (reload) => {
    let data = [];
    if (reload) {
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          loading: true,
        }),
      });
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          title: "Loading now...",
        }),
      });
      data = await getLizardsData(walletAddress, dispatch);
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          loading: false,
        }),
      });
    } else {
      data = storeLizards;
    }
    setTotalLizards(data);
    setUnstakingLizards([]);
    setStakingLizards([]);
    updateCurrentWeight();
    setLizards(data);
    setUnstakedLizards(data.filter((a) => +a.status == 0));
    setUnlockedLizards(data.filter((a) => +a.status == 1));
    setLockedLizards(data.filter((a) => +a.status == 2));
    setButtonActive(3);
  };

  useEffect(() => {
    if (config.stakingStatus) {
      let isSubscribed = true;
      if (isSubscribed) {
        if (correctNet && web3Object) {
          if (isEmpty(storeLizards)) {
            initData(true);
          } else {
            initData(false);
          }
        }
      }
      return () => (isSubscribed = false);
    }
  }, [walletAddress, correctNet, web3Object]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    adaptiveHeight: false,
  };
  return (
    <div className=" pt-12 pb-20">
      {config.stakingStatus ? (
        <>
          <ScrollToTop
            smooth
            component={<CustomImage src={MySVG} />}
          ></ScrollToTop>
          <div className="mb-10">
            <CustomText
              color="white"
              align="left"
              className="text-2xl sm:text-tit pb-4"
              bold="bold"
            >
              Staking
            </CustomText>
            <CustomText
              color="white"
              transparent
              align="left"
              className="text-baseft w-full sm:w-2/3"
            >
              Stake your Ethlizards and earn Liz Coin. The longer you lock your
              lizards the higher the weight of your earnings in Liz Coin. Don't
              worry! You will be issued a non-transferrable 'Liz Pass' token
              into your wallet to allow you to flex your 'Stake' Status on
              discord.
            </CustomText>
          </div>
          <div className="flex flex-row items-center bg-background bg-opacity-30 rounded-md sticky top-16 z-2">
            <div className=" w-full md:w-2/3">
              {/* <ScrollContainer className="flex flex-row items-center flex-nowrap overflow-scroll space-x-4"> */}
              <Slider
                {...settings}
                className="flex flex-row items-center space-x-4"
              >
                <div className="flex mr-5">
                  <button
                    onClick={() => clickTab(3)}
                    className={`flex flex-row border-solid border rounded-3xl border-blue_gray border-opacity-20  px-4 py-2 space-x-4 ${
                      buttonActive == 3
                        ? "bg-btncolor"
                        : "bg-white bg-opacity-5"
                    }`}
                    style={{ display: "flex" }}
                  >
                    <CustomText
                      className="whitespace-nowrap"
                      size="sm"
                      bold="bold"
                    >
                      All
                    </CustomText>
                    <CustomText color="white" transparent size="sm">
                      {totalLizards.length}
                    </CustomText>
                  </button>
                </div>
                <div className="flex mr-5">
                  <button
                    onClick={() => clickTab(0)}
                    className={`flex flex-row border-solid border rounded-3xl border-blue_gray border-opacity-20  px-4 py-2 space-x-4 ${
                      buttonActive == 0
                        ? "bg-btncolor"
                        : "bg-white bg-opacity-5"
                    }`}
                  >
                    <CustomText
                      className="whitespace-nowrap"
                      size="sm"
                      bold="bold"
                    >
                      Unstaked
                    </CustomText>
                    <CustomText color="white" transparent size="sm">
                      {unstakedLizards.length}
                    </CustomText>
                  </button>
                </div>
                <div className="flex mr-5">
                  <button
                    onClick={() => clickTab(1)}
                    className={`flex flex-row border-solid border rounded-3xl border-blue_gray border-opacity-20  px-4 py-2 space-x-4 ${
                      buttonActive == 1
                        ? "bg-btncolor"
                        : "bg-white bg-opacity-5"
                    }`}
                  >
                    <CustomText
                      className="whitespace-nowrap"
                      size="sm"
                      bold="bold"
                    >
                      Unlocked & Staking
                    </CustomText>
                    <CustomText color="white" transparent size="sm">
                      {unlockedLizards.length}
                    </CustomText>
                  </button>
                </div>{" "}
                <div className="flex mr-5">
                  <button
                    onClick={() => clickTab(2)}
                    className={`flex flex-row border-solid border rounded-3xl border-blue_gray border-opacity-20  px-4 py-2 space-x-4 ${
                      buttonActive == 2
                        ? "bg-btncolor"
                        : "bg-white bg-opacity-5"
                    }`}
                  >
                    <CustomText
                      className="whitespace-nowrap"
                      size="sm"
                      bold="bold"
                    >
                      Locked & Staking
                    </CustomText>
                    <CustomText color="white" transparent size="sm">
                      {lockedLizards.length}
                    </CustomText>
                  </button>
                </div>
                {/* </ScrollContainer> */}
              </Slider>
            </div>
            {width > 900 ? (
              <div className="w-1/3 flex flex-row justify-end">
                <button
                  onClick={() => setGridCount(true)}
                  className={`flex flex-row border-solid border rounded-sm  border-gray-600 px-3 py-3 space-x-4  ${
                    gridCount == true ? "bg-btncolor" : "bg-white bg-opacity-5"
                  }`}
                >
                  <CustomImage src={Grid3Icon}></CustomImage>
                </button>
                <button
                  onClick={() => setGridCount(false)}
                  className={`flex flex-row border-solid border rounded-sm  border-gray-600 px-3 py-3 space-x-4  ${
                    gridCount == false ? "bg-btncolor" : "bg-white bg-opacity-5"
                  }`}
                >
                  <CustomImage src={Grid2Icon}></CustomImage>
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-row pt-4 z-0">
            <Grid container spacing={4}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Grid container spacing={2}>
                  {lizards.map((item, index) => {
                    return (
                      <Grid
                        item
                        lg={gridCount == true ? 4 : 6}
                        md={gridCount == true ? 4 : 6}
                        sm={6}
                        xs={6}
                        onClick={() => selectCard(index)}
                        key={index}
                      >
                        <NftCard
                          nftId={item.tokenID}
                          lizStatus={item.status}
                          isGenesis={item.isGenesis}
                          isSelected={item.isSelected}
                          unlockdays={item.unlockDays}
                          hideCheck={
                            stakingLizards.length == 0 &&
                            unstakingLizards.length == 0
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {width > 497 ? (
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <NftOperationCard
                    selectedCount={
                      stakingLizards.length + unstakingLizards.length
                    }
                    stakingLizards={stakingLizards}
                    unstakingLizards={unstakingLizards}
                    weight={currentWeight}
                    cancelLizard={(lizard) => cancelLizard(lizard)}
                  />
                  {/* <div className="border-2 border-gray-800 h-full w-full rounded-xl bg-container bg-center bg-no-repeat bg-cover pb-2"></div> */}
                </Grid>
              ) : (
                <>
                  <div
                    style={{ width: "inherit" }}
                    className="fixed flex flex-row items-center justify-start bg-background bottom-0 opacity-80 h-15  space-x-4"
                  >
                    <div className="pl-8">
                      <CustomImage src={ColIcon} className="h-3"></CustomImage>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <CustomText onClick={toggleDrawer(true)}>
                        {stakingLizards.length + unstakingLizards.length}
                      </CustomText>
                      <CustomText onClick={toggleDrawer(true)}>
                        items selected
                      </CustomText>
                    </div>
                  </div>
                  <SwipeableDrawer
                    className="Swipeable_menu"
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                      keepMounted: true,
                    }}
                  >
                    {" "}
                    <div className="h-screen bg-background">
                      <div className="fixed w-full flex flex-row items-center justify-start bg-background top-0  z-50 h-15  space-x-4">
                        <div className="pl-8">
                          <CustomImage
                            src={ColIcon}
                            className="h-3 rotate-180"
                          ></CustomImage>
                        </div>
                        <div className="flex flex-row space-x-2">
                          <CustomText onClick={toggleDrawer(false)}>
                            {stakingLizards.length + unstakingLizards.length}
                          </CustomText>
                          <CustomText
                            // onClick={() => setOpen(!open)}
                            onClick={toggleDrawer(false)}
                          >
                            items selected
                          </CustomText>
                        </div>
                      </div>
                      <div className="bg-background">
                        <NftOperationCard
                          selectedCount={
                            stakingLizards.length + unstakingLizards.length
                          }
                          stakingLizards={stakingLizards}
                          unstakingLizards={unstakingLizards}
                          weight={currentWeight}
                          cancelLizard={(lizard) => cancelLizard(lizard)}
                        />
                      </div>
                    </div>
                  </SwipeableDrawer>
                </>
              )}
            </Grid>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 pb-36">
          <div className="py-16">
            <CustomText size="3xl" align="center" className="pt-20" bold="bold">
              Staking is not available.
            </CustomText>
          </div>
          <button className="w-1/2 sm:w-1/6 border-solid border rounded-md border-btncolor bg-btncolor py-3">
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
