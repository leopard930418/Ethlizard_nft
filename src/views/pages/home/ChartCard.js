import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CustomImage from "views/components/CustomImage";
import EtherIcon from "assets/images/donut_eth.svg";
import WEtherIcon from "assets/images/donut_weth.svg";
import EhterInvestIcon from "assets/images/donut_invest_eth.svg";
import USDIcon from "assets/images/donut_usd.svg";
import CustomText from "views/components/CustomText";
import CircleChart from "./CircleChart";
import { getVETHBalance, getVWETHBalance, getVUSDBalance, getTotalInvestedEther, getTotalInvestedUSDC } from "functions/Utility";

export default function ChartCard({
  EPrice = 1,
}) {
  const [vaultETH, setVaultETH] = useState(0);
  const [vaultWETH, setVaultWETH] = useState(0);
  const [vaultUSD, setVaultUSD] = useState(0);
  const [investETH, setInvestETH] = useState(0);
  const [investUSDC, setInvestUSDC] = useState(0);
  const councilData = useSelector((state) => state?.data.cData ?? {});

  const initData = async () => {
    setVaultETH(await getVETHBalance());
    setVaultUSD(await getVUSDBalance());
    setVaultWETH(await getVWETHBalance());
  };

  const initInvestData = async () => {
    setInvestETH(await getTotalInvestedEther(councilData))
    setInvestUSDC(await getTotalInvestedUSDC(councilData))
  };

  useEffect(() => {
    if (councilData.length > 0) {
      initInvestData();
    }
  }, [councilData]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <div
      className={`flex items-start  h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5  bg-no-repeat bg-cover`}
    >
      <Grid container>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          // className="flex justify-center items-center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircleChart data={[
            {
              label: "Invested USD",
              value: investUSDC
            },
            {
              label: "Invested ETH",
              value: parseInt(investETH * EPrice)
            },
            {
              label: "Vault USD",
              value: vaultUSD
            },
            {
              label: "Vault WETH",
              value: parseInt(vaultWETH * EPrice)
            },
            {
              label: "Vault ETH",
              value: parseInt(vaultETH * EPrice)
            }
          ]} totalValue={(vaultETH + vaultWETH + investETH) * EPrice + investUSDC + vaultUSD} isRewardSchedul={false} />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="p-4"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div className="flex">
            <div className="space-y-2">
              <div className="ml-8">
                <CustomText  align="left" size="xs" bold="bold" className="text-fontdisccolor">
                  Lizard Vault Assets
                </CustomText>
              </div>
              <div className="h-32 space-y-3">
                <div className="flex items-center space-x-4">
                  <CustomImage src={EtherIcon} className="h-4" />
                  <Grid item>
                    <CustomText size="xs" align="left" color="white" transparent>
                      Ether
                    </CustomText>
                    <CustomText align="left" color ="white" size="lg" bold="bold">
                      {vaultETH.toLocaleString()} ETH
                    </CustomText>
                  </Grid>
                </div>
                <div className="flex items-center space-x-4">
                  <CustomImage src={WEtherIcon} className="h-4" />
                  <Grid item>
                    <CustomText size="xs" align="left" color="white" transparent>
                      Wrapped Ether
                    </CustomText>
                    <CustomText align="left" color ="white" size="lg" bold="bold">
                      {vaultWETH.toLocaleString()} WETH
                    </CustomText>
                  </Grid>
                </div>
                <div className="flex items-center space-x-4">
                  <CustomImage src={WEtherIcon} className="h-4 brightness-[700]" />
                  <Grid item>
                    <CustomText size="xs" align="left" color="white" transparent>
                      USD Stables
                    </CustomText>
                    <CustomText align="left" color ="white" size="lg" bold="bold">
                      ${vaultUSD.toLocaleString()} USD
                    </CustomText>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="space-y-2">
              <div className="ml-8 mt-8">
                <CustomText  align="left" size="xs" bold="bold" className="text-fontdisccolor">
                  Invested
                </CustomText>
              </div>
              <div className="h-24 space-y-3">
                <div className="flex items-center space-x-4">
                  <CustomImage src={EhterInvestIcon} className="h-4" />
                  <Grid item>
                    <CustomText size="xs" align="left" color="white" transparent>
                      Ether
                    </CustomText>
                    <CustomText align="left" color ="white" size="lg" bold="bold">
                      {investETH.toLocaleString()} ETH
                    </CustomText>
                  </Grid>
                </div>
                <div className="flex items-center space-x-4">
                  <CustomImage src={USDIcon} className="h-4" />
                  <Grid item>
                    <CustomText size="xs" align="left" color="white" transparent>
                      USD Stables
                    </CustomText>
                    <CustomText align="left" color ="white" size="lg" bold="bold">
                      ${investUSDC.toLocaleString()} USD
                    </CustomText>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
