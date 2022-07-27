import React, { useEffect, useState } from "react";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import LineChart from "./LineChart";
import ArrowH from "assets/images/arrow_h.svg";
import ArrowHD from "assets/images/arrow_hd.svg";
import { Grid } from "@mui/material";
import { config } from "constant";
import { getFloorRate } from "functions/Utility";
import { modifyScale } from "functions/Utility";

export default function PriceCardAll({ icon = "" }) {
  const [ethLizardFloorPrice, setEthLizardFloorPrice] = useState(0);
  const [genesisFloorPrice, setGenesisFloorPrice] = useState(0);
  const [ethLRate, setEthLRate] = useState(0);
  const [genLRate, setGenLRate] = useState(0);
  const [ethLHistory, setEthLHistory] = useState({});
  const [genLHistory, setGenLHistory] = useState({});

  const getEthLFloor = async () => {
    fetch(config.ethlizardAPI).then((response) => {
      response.json().then((jsonData) => {
        setEthLizardFloorPrice(jsonData.stats.floor_price);
      });
    });
  };
  const getEthLInfo = async () => {
    fetch(config.ethlizFloorHistoryAPI).then((response) => {
      response.json().then((jsonData) => {
        var history = [];
        for (var i = 0; i < jsonData.length; i++) {
          history.push({ price: jsonData[i].floorP });
        }
        history.push({ price: ethLizardFloorPrice });
        setEthLRate(getFloorRate(history));
        setEthLHistory(modifyScale(history));
      });
    });
  };

  const getGenLFloor = async () => {
    fetch(config.genesisAPI).then((response) => {
      response.json().then((jsonData) => {
        setGenesisFloorPrice(jsonData.stats.floor_price);
      });
    });
  };
  const getGenLInfo = async () => {
    fetch(config.genlizFloorHistoryAPI).then((response) => {
      response.json().then((jsonData) => {
        var history = [];
        for (var i = 0; i < jsonData.length; i++) {
          history.push({ price: jsonData[i].floorP });
        }
        history.push({ price: genesisFloorPrice });
        setGenLRate(getFloorRate(history));
        setGenLHistory(modifyScale(history));
      });
    });
  };

  const initData = async () => {
    await getEthLFloor();
    await getGenLFloor();
  };

  useEffect(() => {
    getEthLInfo();
  }, [ethLizardFloorPrice]);

  useEffect(() => {
    getGenLInfo();
  }, [genesisFloorPrice]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <div
      className={`  h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover pb-2`}
    >
      <div className="flex  justify-between">
        <div className="flex items-center pl-4 pt-4">
          <CustomImage src={icon} className="h-10" />
          <CustomText
            color="title"
            bold="bold"
            align="left"
            size="xs"
            className="ml-4"
          >
            Floor Price
          </CustomText>
        </div>
      </div>
      <div className="pt-4">
        <Grid container alignItems={"center"}>
          <Grid item lg={4} md={4} sm={4} xs={4} className="pl-4">
            <CustomText color="white" align="left" size="xs" transparent>
              Ethlizards
            </CustomText>
            <CustomText align="left" size="lg" color="white" bold="bold">
              {ethLizardFloorPrice} ETH
            </CustomText>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <LineChart showHideChart={true} data={ethLHistory} height={30} />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <div className="flex items-center justify-end pr-4 space-x-1">
              <CustomImage src={ethLRate > 0 ? ArrowH : ArrowHD}></CustomImage>
              <Grid item>
                <CustomText className={`${ethLRate > 0 ? "text-green-500":"text-red-600"}`} size="sm">
                  {ethLRate > 0 ? "+" : "-"}
                  {Math.abs(ethLRate).toLocaleString()}% in
                </CustomText>
                <CustomText color="title" size="sm">
                  24 hours
                </CustomText>
              </Grid>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4} className="pl-4 py-4">
            <CustomText color="white" align="left" size="xs" transparent>
              Genesis Ethlizards
            </CustomText>
            <CustomText align="left" size="lg" color="white" bold="bold">
              {genesisFloorPrice} ETH
            </CustomText>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <LineChart showHideChart={true} data={genLHistory} height={30} />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <div className="flex justify-end items-center pr-4 space-x-1">
              <CustomImage src={genLRate > 0 ? ArrowH : ArrowHD}></CustomImage>
              <Grid item>
                <CustomText className={`${genLRate? "text-green-500":"text-red-600"}`} size="sm">
                  {genLRate > 0 ? "+" : "-"}
                  {Math.abs(genLRate).toLocaleString()}% in
                </CustomText>
                <CustomText color="title" size="sm">
                  24 hours
                </CustomText>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
