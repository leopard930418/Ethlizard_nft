import React from "react";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import CheckedIcon from "assets/images/checkedIcon.svg";
import LockedIcon from "assets/images/lockedIcon.svg";
import UnlockIcon from "assets/images/unlockIcon.svg";
import PreCheckIcon from "assets/images/preCheckIcon.svg";
import GenesisIcon from "assets/images/genesisIcon.png";
import { Tooltip } from "@mui/material";

export default function NftCard({
  nftId = "4065",
  hideCheck = true,
  lizStatus = 1,
  isGenesis = false,
  unlockdays = 10,
  isSelected = false,
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
        {lizStatus == 2 || hideCheck ? null : (
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
              {lizStatus == 0 ? null : lizStatus == 2 ? (
                <CustomImage src={LockedIcon} className="h-4"></CustomImage>
              ) : (
                <CustomImage src={UnlockIcon} className="h-4"></CustomImage>
              )}

              <CustomText
                align="left"
                color="white"
                transparent={true}
                className="w-full"
                size="xs"
              >
                {lizStatus == 0 ? "Unstaked" : "Staking"}
              </CustomText>
            </div>

            <CustomText
              align="left"
              size="xs"
              bold="bold"
              color="white"
              className="w-full pl-4 pb-2"
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
                // className="absolute top-64 right-3 h-10 px-1 py-1"
                className="h-10 mr-3 mt-3"
              ></CustomImage></div>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <CustomText
        align="left"
        color="white"
        transparent={true}
        className="w-full pl-4 pt-4"
        size="xs"
      >
        {lizStatus == 0
          ? "Available to stake"
          : lizStatus == 2
          ? `Unlock in ${unlockdays} days`
          : "Available to unstake"}
      </CustomText>
    </div>
  );
}
