import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import ChartCard from "./ChartCard";
import EtherIcon from "assets/images/EtherIcon.png";
import LizCoinIcon from "assets/images/lizCoinIcon.png";
import UniqueHolderIcon from "assets/images/UniqueHolder.png";
import FloorPriceIcon from "assets/images/FloorPriceIcon.png";
import GenesisIcon from "assets/images/genesisIcon.png";
import RewardsImage from "assets/images/burn.png";
import StakingImage from "assets/images/rewards.png";
import BurnImage from "assets/images/staking.png";
import StakingContainer from "./StakingContainer";
import StakedTotalInfoCard from "./StakedTotalInfoCard";
import RewardScheduleCard from "./RewardScheduleCard";
import PriceCardAll from "./PriceCardAll";
import { config } from "constant";
import { modifyScale, getPriceRate } from "functions/Utility";

export default function HomeComponent() {
  const [ethPrice, setEthPrice] = useState(1);
  const [ethRate, setEthRate] = useState(0);
  const [ethHistory, setEthHistory] = useState({});
  const [lizPrice, setLizPrice] = useState(0);
  const [lizRate, setLizRate] = useState(0);
  const [lizHistory, setLizHistory] = useState({});
  const [marketCap, setMarketCap] = useState(0);
  const [uniqueHolders, setUniqueHolders] = useState(0);
  const [genesisHolders, setGenesisHolders] = useState(0);

  const getEthHistory = async () => {
    fetch(config.ethereumHistory).then((response) => {
      response.json().then((jsonData) => {
        const prices = jsonData.prices;
        const rate = getPriceRate(prices);
        var history = [];
        for (var i = 0; i < prices.length; i += 20) {
          history.push({ price: prices[i][1] });
        }
        setEthHistory(modifyScale(history));
        setEthRate(rate);
        setEthPrice(prices[prices.length - 1][1]);
      });
    });
  };

  const getLizHistory = async () => {
    fetch(config.lizcoinHistory).then((response) => {
      response.json().then((jsonData) => {
        const marketCaps = jsonData.market_caps;
        const prices = jsonData.prices;
        const rate = getPriceRate(prices);
        const history = [];
        for (var i = 0; i < prices.length; i += 20) {
          history.push({ price: prices[i][1] });
        }

        setLizHistory(modifyScale(history));
        setLizRate(rate);
        setLizPrice(prices[prices.length - 1][1]);
        setMarketCap(marketCaps[marketCaps.length - 1][1]);
      });
    });
  };

  const getEthlizardInfo = async () => {
    fetch(config.ethlizardAPI).then((response) => {
      response.json().then((jsonData) => {
        setUniqueHolders(jsonData.stats.num_owners);
      });
    });
  };

  const getGenesisInfo = async () => {
    fetch(config.genesisAPI).then((response) => {
      response.json().then((jsonData) => {
        setGenesisHolders(jsonData.stats.num_owners);
      });
    });
  };

  const initData = async () => {
    await getEthHistory();
    await getLizHistory();
    await getEthlizardInfo();
    await getGenesisInfo();
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      initData();
    }
    return () => (isSubscribed = false);
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="px-1 pt-12 pb-20">
      <Grid container spacing={2}>
        {width >= 497 ? (
          <>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Staking"
                description="Stake your Ethlizards and earn Liz Coin rewards."
                link="Staking"
                imagesrc={StakingImage}
                urlPage="/Staking"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Rewards"
                description="Claim your Liz Coin rewards from staking activities."
                link="Rewards"
                imagesrc={RewardsImage}
                urlPage="/rewards"

              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Burn Claim"
                description="Burn your Lizards forever in exchange for Liz Coin."
                link="Burn Claim"
                imagesrc={BurnImage}
                urlPage="/Claim"

              />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <ChartCard EPrice={ethPrice} />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div className="space-y-4">
                <PriceCard
                  icon={EtherIcon}
                  priceTitle="Ethereum price"
                  price={"$" + ethPrice.toLocaleString()}
                  description1={Math.abs(ethRate).toLocaleString()}
                  description2="24 hours"
                  plus={ethRate > 0}
                  data={ethHistory}
                />
                <PriceCard
                  icon={LizCoinIcon}
                  priceTitle="ILV Price"
                  price={"$" + lizPrice.toLocaleString()}
                  description1={Math.abs(lizRate).toLocaleString()}
                  plus={lizRate > 0}
                  description2="24 hours"
                  data={lizHistory}
                />
                <PriceCard
                  icon={LizCoinIcon}
                  priceTitle="Illuvium Market Capitalization"
                  price={"$" + marketCap.toLocaleString()}
                  description1=""
                  description2=""
                  showHideChart={false}
                />
              </div>
            </Grid>
          </>
        ) : (
          <>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div className="space-y-4">
                <PriceCard
                  icon={EtherIcon}
                  priceTitle="Ethereum price"
                  price={"$" + ethPrice.toLocaleString()}
                  description1=""
                  description2=""
                  showHideChart={false}
                />
                <PriceCard
                  icon={LizCoinIcon}
                  priceTitle="Lizcoin price"
                  price={"$" + lizPrice.toLocaleString()}
                  description1=""
                  description2=""
                  showHideChart={false}
                />
                <PriceCard
                  icon={LizCoinIcon}
                  priceTitle="Lizcoin Market Capitalization"
                  price={"$" + marketCap.toLocaleString()}
                  description1=""
                  description2=""
                  showHideChart={false}
                />
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Staking"
                description="Stake your Ethlizards and earn Liz Coin rewards."
                link="Staking"
                imagesrc={StakingImage}
                urlPage="/Staking"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Rewards"
                description="Claim your Liz Coin rewards from staking activities."
                link="Rewards"
                imagesrc={RewardsImage}
                urlPage="/rewards"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StakingContainer
                title="Burn Claim"
                description="Burn your Lizards forever in exchange for Liz Coin."
                link="Burn Claim"
                imagesrc={BurnImage}
                urlPage="/Claim"
              />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <ChartCard EPrice={ethPrice} />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} className="pt-3">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <StakedTotalInfoCard stakingStatus={config.stakingStatus}/>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <RewardScheduleCard rewardStatus={config.rewardStatus} />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <div className="space-y-4">
            <PriceCard
              icon={UniqueHolderIcon}
              priceTitle="Unique Holders"
              price={uniqueHolders.toLocaleString()}
              description1=""
              description2=""
              showHideChart={false}
            />
            <PriceCard
              icon={GenesisIcon}
              priceTitle="Genesis Holders"
              price={genesisHolders.toLocaleString()}
              description1=""
              description2=""
              showHideChart={false}
            />
            <PriceCardAll icon={FloorPriceIcon} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
