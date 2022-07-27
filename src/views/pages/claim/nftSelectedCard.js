import React from "react";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import closeIcon from "assets/images/closeIcon.svg";
import border from "assets/images/border.svg";
import { Grid } from "@mui/material";

export default function NftSelectedCard({ nftId = "4065",burnFor="123123", ...props }) {
  return (
    <div className="">
      <Grid container className="flex items-center">
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <CustomImage
            src={
              props.data.isGenesis
                ? `/image/Genesis_Images/${props.data.tokenID - 10000}.jpg`
                : `/image/Eth_Images/${props.data.tokenID}.jpg`
            }
            className="w-full px-1 py-1 object-cover aspect-square"
          ></CustomImage>
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <CustomText align="left" className="w-full pl-4" size="sm">
          {props.data.isGenesis ? `Genesis #${props.data.tokenID - 10000}` : `Ethlizards #${props.data.tokenID}`}
          </CustomText>
          <CustomText align="left" className="w-full pl-4" size="sm" bold = "bold">
            Burn for {props.data.burnFor} LIZ
          </CustomText>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <CustomImage
            src={closeIcon}
            className="w-full px-1 py-1"
            onClick={props.cancelLizard}
          ></CustomImage>
        </Grid>
      </Grid>
      <CustomImage src={border} className="w-full px-1 py-1"></CustomImage>
    </div>
  );
}
