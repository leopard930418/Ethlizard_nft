import React, { useState } from "react";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import CheckedIcon from "assets/images/checkedIcon.svg";
import PreCheckIcon from "assets/images/preCheckIcon.svg";
// import CrownIcon from "assets/images/crownIcon.svg";
import GenesisIcon from "assets/images/genesisIcon.png";

import { Grid, Tooltip } from "@mui/material";

export default function NftCard({
  nftId = "4065",
  hideCheck = true,
  isGenesis = false,
  isSelected = false,
  burnFor = 0,
  ...props
}) {
  return (
    <div className="relative  h-full w-full rounded-md border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover mt-4 mb-4">
      <div className="">
        <CustomImage
          src={
            isGenesis
              ? `/image/Genesis_Images/${nftId - 10000}.jpg`
              : `/image/Eth_Images/${nftId}.jpg`
          }
          className="w-full px-1 py-1 object-cover aspect-square"
        ></CustomImage>
        {hideCheck ? null : (
          <>
            {isSelected ? (
              <CustomImage
                src={CheckedIcon}
                className="absolute top-3 right-3 h-10 px-1 py-1"
              ></CustomImage>
            ) : (
              <CustomImage
                src={PreCheckIcon}
                className="absolute top-3 right-3 h-10 px-1 py-1"
              ></CustomImage>
            )}
          </>
        )}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center pl-4 py-2 space-x-2">
              <CustomText
                align="left"
                color="white"
                transparent={true}
                className="w-full"
                size="xs"
              >
                Unstaked
              </CustomText>
            </div>

            <CustomText
              align="left"
              className="w-full pl-4 pb-2"
              size="xs"
              bold="bold"
            >
              {isGenesis
                ? `Genesis ${nftId - 10000} /100`
                : `Ethlizards # ${nftId}`}
            </CustomText>
          </div>
          {isGenesis ? (
            <Tooltip title="Genesis Ethlizard" placement="bottom">
              <div>
                <CustomImage
                  src={GenesisIcon}
                  className="h-10 px-1 py-1 mr-3 mt-3"
                ></CustomImage>
              </div>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <CustomText
        align="left"
        color="white"
        transparent={true}
        className="w-full pl-4 pb-2"
        size="xs"
      >
        {"Burn for"}
      </CustomText>
      <CustomText
        align="left"
        color="white"
        className="w-full pl-4"
        size="xs"
        bold="bold"
      >
        {burnFor} LIZ
      </CustomText>
    </div>
  );
}
