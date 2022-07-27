import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "moment";
import { Grid } from "@mui/material";
import CustomText from "views/components/CustomText";
import CustomImage from "views/components/CustomImage";
import RewardSchedule from "assets/images/RewardSchedule.png";
import CircleChart from "./CircleChart";
import {
  rewardsPeriod,
  getTotalEmitted,
  getTotalSupplyOfLiz,
} from "functions/Utility";

export default function RewardScheduleCard({
  data = [],
  width = 200,
  height = 200,
  rewardStatus = false,
}) {
  const [period, setPeriod] = useState({});
  const [totalEmitted, setTotalEmitted] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [chartData, setChartData] = useState([]);
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);

  const initData = async () => {
    setPeriod(await rewardsPeriod());
    setTotalSupply(await getTotalSupplyOfLiz());
    setTotalEmitted(await getTotalEmitted());
  };

  useEffect(() => {
    setChartData([
      {
        value: totalSupply - totalEmitted,
      },
      {
        value: totalEmitted,
      },
    ]);
  }, [totalEmitted]);

  useEffect(() => {
    if (correctNet && web3Object) initData();
  }, [correctNet, web3Object]);

  return (
    <div
      className={`flex items-start  h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover`}
    >
      <Grid container>
        <Grid item container lg={12} md={12} sm={12} xs={12}>
          <div className="flex items-center pl-4 pt-4 pb-2 space-x-4">
            <CustomImage src={RewardSchedule}></CustomImage>
            <CustomText size="xs" align="left" color="title" bold="bold">
              {" "}
              Rewards Schedule
            </CustomText>
          </div>
        </Grid>
        {rewardStatus ? (
          <>
            <Grid item lg={12} md={12} sm={12} xs={12} className="p-4">
              <div className="flex">
                <div className="w-1/2 pb-2">
                  <CustomText size="xs" align="left" color="white" transparent>
                    Start
                  </CustomText>
                  <CustomText align="left" size="lg" color="white" bold="bold">
                    {Moment(period.start).format("D-MMM-yyyy")}
                  </CustomText>
                </div>
                <div className="w-1/2 pb-2">
                  <CustomText size="xs" align="left" color="white" transparent>
                    End
                  </CustomText>
                  <CustomText align="left" size="lg" color="white" bold="bold">
                    {Moment(period.end).format("D-MMM-yyyy")}
                  </CustomText>
                </div>
              </div>
              <div className="flex">
                <CustomText size="xs" align="left" color="white" transparent>
                  Total Emitted To Date {totalEmitted.toLocaleString()} $LIZ
                </CustomText>
              </div>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="flex justify-center items-center"
            >
              <CircleChart
                width={width}
                height={height}
                innerRadius={80}
                outerRadius={100}
                data={chartData}
                isRewardSchedule={true}
                totalEmitted={totalEmitted / 10 ** 6}
                totalSupply={totalSupply / 10 ** 6}
                color={["#2D304D", "#4291F8"]}
                isTotalchart={true}
              />
            </Grid>
          </>
        ) : (
          <div className="">
            <Grid item lg={12} md={12} sm={12} xs={12} className="px-12 py-24">
              <CustomText align="center" size="xl">
                Rewards are not currently active.
              </CustomText>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}
