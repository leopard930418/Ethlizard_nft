import React, { useEffect } from "react";
import CustomText from "views/components/CustomText";
import { Link } from "react-router-dom";
import Arrow from "assets/images/arrow.svg";
import CustomImage from "views/components/CustomImage";
import { Grid } from "@mui/material";

export default function RewardsContainer({
  title = "",
  amount = 0,
  unitPrice = 0,
  total = false,
}) {
  return (
    <div className=" h-40 w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover p-8">
      <CustomText size="xl" color="white" align="center" bold="bold">
        {title}
      </CustomText>
      <CustomText
        size="lg"
        color="white"
        className="pt-2"
        align="center"
        bold="bold"
      >
        {amount.toLocaleString()} {total ? "" : "$LIZ"}
      </CustomText>
      <CustomText size="sm" className="pt-2" align="center" color="title">
        {total ?  <>{unitPrice}</> : <>${(amount * unitPrice).toLocaleString()}</>}
      </CustomText>
    </div>
  );
}
