import React, { useState, useEffect } from "react";
import CustomText from "views/components/CustomText";
import Grid3Icon from "assets/images/grid3.svg";
import Grid2Icon from "assets/images/grid2.svg";
import ColIcon from "assets/images/colIcon.svg";
import NftCard from "./nftCard";
import CustomImage from "views/components/CustomImage";
import { Grid, SwipeableDrawer } from "@mui/material";
import NftOperationCard from "./nftOperationCard";
import { getUnStakedLizardsWithBurn } from "functions/Utility";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import ScrollToTop from "react-scroll-to-top";
import MySVG from "assets/images/up_arrow.svg";
import { Link } from "react-router-dom";
import { config } from "constant";

const drawerBleeding = 56;
export default function ClaimComponent() {
  const [gridCount, setGridCount] = useState(true);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const storeLizards = useSelector((state) => state?.data?.burnLizards ?? []);
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);

  const [lizards, setLizards] = useState([]);
  const [burnLizards, setBurnLizards] = useState([]);
  const [totalBurn, setTotalBurn] = useState(0);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const selectCard = (index) => {
    if (lizards[index].isSelected) {
      const tokenID = lizards[index].tokenID;
      setTotalBurn(totalBurn - lizards[index].burnFor);
      setBurnLizards(burnLizards.filter((item) => item.tokenID != tokenID));
    } else {
      setTotalBurn(totalBurn + lizards[index].burnFor);
      setBurnLizards((oldLizards) => [...(oldLizards ?? []), lizards[index]]);
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

  useEffect(() => {
    if (config.burnStatus) {
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
      const data = await getUnStakedLizardsWithBurn(walletAddress, dispatch);
      setLizards(data);
      setBurnLizards([]);
      setTotalBurn(0);
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          loading: false,
        }),
      });
    } else {
      setLizards(storeLizards);
    }
  };

  useEffect(() => {
    if (config.burnLizards) {
      let isSubscribed = true;
      if (isSubscribed) {
        if (correctNet && web3Object) {
          if (isEmpty(storeLizards)) {
            initData(true);
          } else {
            initData(false);
          }
        } else {
        }
      }
      return () => (isSubscribed = false);
    }
  }, [walletAddress, web3Object, correctNet]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="pt-12 pb-20">
      {config.burnStatus ? (
        <>
          <ScrollToTop
            smooth
            component={<CustomImage src={MySVG} />}
          ></ScrollToTop>
          <div className="mb-10">
            <CustomText
              color="white"
              align="left"
              className="text-2xl sm:text-tit pb-2"
              bold="bold"
            >
              Burn Claim
            </CustomText>
            <CustomText
              color="white"
              transparent
              align="left"
              className="text-baseft w-full sm:w-2/3"
            >
              You can burn any EthLizard in your wallet at any time in order to
              immediately claim LizCoin. This action is irreversible and burns
              your lizard forever. DO NOT Burn if you are unsure what this does.
            </CustomText>
          </div>
          <div className="flex flex-row items-center justify-between pb-4">
            <div className="flex flex-row items-center space-x-2">
              <CustomText color="white" className="text-baseft">
                {lizards.length}
              </CustomText>
              <CustomText color="title" size="sm">
                {" "}
                unstaked items in your wallet
              </CustomText>
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
          <div className="flex flex-row ">
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
                        key={index}
                        onClick={() => selectCard(index)}
                      >
                        <NftCard
                          nftId={item.tokenID}
                          isGenesis={item.isGenesis}
                          isSelected={item.isSelected}
                          burnFor={item.burnFor}
                          hideCheck={burnLizards.length == 0}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {width > 497 ? (
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <NftOperationCard
                    selectedCount={burnLizards.length}
                    burnLizards={burnLizards}
                    totalBurn={totalBurn}
                    cancelLizard={(lizard) => cancelLizard(lizard)}
                  />
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
                        {burnLizards.length}
                      </CustomText>
                      <CustomText onClick={toggleDrawer(true)}>
                        items selected
                      </CustomText>
                    </div>
                  </div>
                  <SwipeableDrawer
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
                    <div className="h-screen">
                      <div className="fixed w-full flex flex-row items-center justify-start bg-background top-0  h-15  space-x-4">
                        <div className="pl-8">
                          <CustomImage
                            src={ColIcon}
                            className="h-3 rotate-180"
                          ></CustomImage>
                        </div>
                        <div className="flex flex-row space-x-2">
                          <CustomText onClick={toggleDrawer(true)}>
                            {burnLizards.length}
                          </CustomText>
                          <CustomText onClick={toggleDrawer(true)}>
                            items selected
                          </CustomText>
                        </div>
                      </div>
                      <div className="bg-background">
                        <NftOperationCard
                          selectedCount={burnLizards.length}
                          burnLizards={burnLizards}
                          totalBurn={totalBurn}
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
              Burnning is not available.
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
