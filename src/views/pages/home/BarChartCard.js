import { Grid } from "@mui/material";
import React from "react";
import CustomText from "views/components/CustomText";
import BarChartHorizon from "./BarChartHorizon";
import BarChartVertical from "./BarChartVertical";

export default function BarChartCard() {
  return (
    <div
      className={`flex items-start  h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover`}
    >
      <Grid container>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <div className="flex justify-evenly mb-8 pt-8">
            <BarChartVertical title="Etherlizards" value="75"/>
            <BarChartVertical title="Genesis" value="50" />
          </div>
          <div>
            <BarChartHorizon amount={15000} total={70000}/>
          </div>
        </Grid>
        <Grid item lg={7} md={7} sm={12} xs={12} className="p-4">
          <div className="flex">
            <div className="w-1/2 space-y-4">
              <CustomText color="title" align="left" size="sm">
                Total Ethlizards Staked
              </CustomText>
              <div className="h-20 space-y-4">
                <div className="flex items-center space-x-8 ml-12">
                  <CustomText size="sm">Ethlizards</CustomText>
                </div>
                <div className="flex items-center space-x-8 ml-12">
                  <CustomText size="sm">Genesis Ethlizards</CustomText>
                </div>
              </div>
            </div>
            <div className="w-1/2 space-y-4 pl-16">
              <CustomText color="title" align="left" size="sm">
                Balance
              </CustomText>
              <div className="space-y-4">
                <CustomText align="left" size="sm">3950 / 5050</CustomText>
                <CustomText align="left" size="sm">77 / 100</CustomText>
              </div>
            </div>
          </div>
          <div className="flex border-solid border-b-2 border-white mr-4">
            <div className="w-1/2 space-y-2">
              <CustomText color="title" align="left" size="sm">
                Rewards Schedule
              </CustomText>
              <div className="h-20 space-y-4">
                <div className="flex items-center space-x-8 ml-12">
                  <CustomText align="left" size="sm">Start</CustomText>
                </div>
                <div className="flex items-center space-x-7 ml-12">
                  <CustomText align="left" size="sm">End</CustomText>
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-16 pt-8 ml-2">
              <div className="space-y-4">
                <CustomText align="left" size="sm">1st Aug 2023</CustomText>
                <CustomText align="left" size="sm">1st Aug 2028</CustomText>
              </div>
            </div>
          </div>
          <div className="flex space-x-28 pt-4 ml-2">
            <div className="w-1/2">
              <CustomText align="left" size="sm">Total Emitted</CustomText>
            </div>
            <div className="w-1/2">
              <CustomText align="left" size="sm">2541014 LIZ</CustomText>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
