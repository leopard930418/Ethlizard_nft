import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CustomText from "views/components/CustomText";
import CustomImage from "views/components/CustomImage";
// import StakedTotalInfo from "assets/images/StakedTotalInfo.svg";
import StakedIcon from "assets/images/stakedIcon.png";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  getStakedEthLizardsAmount,
  getStakedGenLizardsAmount,
} from "functions/Utility";
export default function StakedTotalInfoCard({ stakingStatus = false }) {
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);
  const [stakedLizards, setStakedLizards] = useState(0);
  const [stakedGenesis, setStakedGenesis] = useState(0);

  const initData = async () => {
    setStakedLizards(await getStakedEthLizardsAmount());
    setStakedGenesis(await getStakedGenLizardsAmount());
  };
  useEffect(() => {
    if (correctNet && web3Object) initData();
  }, [walletAddress, correctNet, web3Object]);
  return (
    <div
      className={`flex items-start  h-full w-full  rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover`}
    >
      <Grid container>
        <Grid item container lg={12} md={12} sm={12} xs={12}>
          <div className="flex items-center pl-4 pt-4 pb-4 space-x-4">
            <CustomImage src={StakedIcon} className="h-10"></CustomImage>
            <CustomText size="xs" align="left" color="title" bold="bold">
              {" "}
              Total Ethlizards Staked
            </CustomText>
          </div>
        </Grid>
        {stakingStatus ? (
          <>
            <Grid item lg={12} md={12} sm={12} xs={12} className="p-4">
              <div className="flex">
                <div className="w-1/2">
                  <CustomText size="xs" align="left" color="white" transparent>
                    Ethlizards
                  </CustomText>
                  <CustomText align="left" size="lg" color="white" bold="bold">
                    {stakedLizards.toLocaleString()}/5,050
                  </CustomText>
                </div>
                <div className="w-1/2">
                  <CustomText size="xs" align="left" color="white" transparent>
                    Genesis Ethlizards
                  </CustomText>
                  <CustomText align="left" size="lg" color="white" bold="bold">
                    {stakedGenesis}/100
                  </CustomText>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="px-4 pt-8 pb-4"
            >
              <Grid
                item
                container
                justifyContent={"space-between"}
                className="pb-4"
              >
                <CustomText size="xs" align="left" color="white" transparent>
                  Ethlizards
                </CustomText>
                <CustomText size="xs" align="left" color="white" transparent>
                  {((stakedLizards / 5050) * 100).toLocaleString()}%
                </CustomText>
              </Grid>
              <ProgressBar
                maxCompleted={5050}
                completed={stakedLizards}
                height={"15px"}
                bgColor={"#6489EE"}
                isLabelVisible={false}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className="p-4">
              <Grid
                item
                container
                justifyContent={"space-between"}
                className="pb-4"
              >
                <CustomText size="xs" align="left" color="white" transparent>
                  Genesis Ethlizards
                </CustomText>
                <CustomText size="xs" align="left" color="white" transparent>
                  {stakedGenesis}%
                </CustomText>
              </Grid>
              <ProgressBar
                maxCompleted={100}
                completed={stakedGenesis}
                height={"15px"}
                bgColor={"#19A0FA"}
                isLabelVisible={false}
              />
            </Grid>
          </>
        ) : (
          <Grid item lg={12} md={12} sm={12} xs={12} className="px-12 py-24">
            <CustomText align="center" size="xl">
              Staking is not currently enabled.
            </CustomText>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
