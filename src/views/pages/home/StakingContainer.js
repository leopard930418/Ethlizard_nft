import React from "react";
import CustomText from "views/components/CustomText";
import { Link } from "react-router-dom";
import Arrow from "assets/images/arrow.svg";
import CustomImage from "views/components/CustomImage";
import { Grid } from "@mui/material";
import Loader from "views/layout/Loader";

export default function StakingContainer({
  title = "",
  link = "",
  description = "",
  imagesrc="",
  urlPage="",
}) {
  return (
    <div className="rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 h-40 w-full bg-center bg-no-repeat bg-cover p-6">
      <Grid container>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <CustomText size="lg" color="white" align="left" className="font-black">
            {title}
          </CustomText>
          <CustomText
            size="sm"
            color="white"
            transparent={true}
            className="pt-2"
            align="left"
          >
            {description}
          </CustomText>
          <CustomText size="sm" className="pt-2" bold="bold" align="left">
            <Grid item container justifyContent="flex-start">
              <Link to={urlPage} className="mr-2 underline">
                {link}
              </Link>
              <CustomImage src={Arrow}></CustomImage>
            </Grid>
          </CustomText>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <CustomImage src={imagesrc}></CustomImage>
        </Grid>
      </Grid>
    </div>
  );
}
