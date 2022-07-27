import React, { useState } from "react";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import LineChart from "./LineChart";
import ArrowH from "assets/images/arrow_h.svg";
import ArrowHD from "assets/images/arrow_hd.svg";
import { Grid } from "@mui/material";

export default function PriceCard({
  className = "",
  icon = "",
  priceTitle = "",
  price = 0,
  plus = false,
  chartData = [],
  description1 = "",
  description2 = "",
  showHideIcon = true,
  showHideChart = true,
  width = 400,
  height = 70,
  data = [],
  ...props
}) {
  return (
    <div
      className={`  h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover pb-2 ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center pl-4 pt-4">
          <CustomImage src={icon} className="h-10" />
          <Grid item marginLeft={2}>
            <CustomText color="title" align="left" size="xs" bold="bold">
              {priceTitle}
            </CustomText>
            <CustomText align="left" size="lg" bold="bold">
              {price}
            </CustomText>
          </Grid>
        </div>
        {description1 ? (
          <div className="flex items-center pt-4 pr-4 space-x-1">
            <CustomImage src={plus ? ArrowH: ArrowHD}></CustomImage>
            <Grid item>
              <CustomText  size="sm" className={`${plus? "text-green-500":"text-red-600"}`}>
                {plus? "+":"-"}{description1}{"% in"}
              </CustomText>
              {description2 ? (
                <CustomText color="title" size="sm">
                  {description2}
                </CustomText>
              ) : null}
            </Grid>
          </div>
        ) : null}
      </div>
      <div>
        <LineChart
          showHideChart={showHideChart}
          width={width}
          height={height}
          data={data}
        />
      </div>
    </div>
  );
}
