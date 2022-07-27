import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomText from "views/components/CustomText";
import { Box, Grid } from "@mui/material";
import NftSelectedCard from "./nftSelectedCard";
import SelectBar from "views/components/SelectBar";
import { toast, ToastContainer } from "react-toastify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-toastify/dist/ReactToastify.css";
import { stakeLizards } from "functions/Utility";
import { useDispatch } from "react-redux";
import { unStakeLizards } from "functions/Utility";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomToast from "views/components/CustomToast";
import { getWeightInfo } from "functions/Utility";
import { getStakingWeight } from "functions/Utility";
import { createMerkleProof } from "functions/Utility";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default function NftOperationCard({ ...props }) {
  const isPhoneMode = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const [duration, setDuration] = useState(30);
  const [value, setValue] = useState(0);
  const [days, setDays] = useState(30);
  const [weightList, setWeightList] = useState([]);
  const [stakeWeight, setStakeWeight] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetDuration = (dur) => {
    setDuration(dur);
    setDays(dur);
  };

  const readWeightInfo = async () => {
    setWeightList(await getWeightInfo());
  };

  const stake = async () => {
    if (props.stakingLizards.length == 0) {
      toast.warning("No items selected");
    } else {
      try {
        var pairs = [{ key: days, value: weightList[days].Weight }];
        const proof = createMerkleProof(pairs, 3);
        if (proof.result) {
          dispatch({
            type: "SET_DATA",
            payload: (prev = {}) => ({
              ...(prev ?? {}),
              loading: true,
            }),
          });
          dispatch({
            type: "SET_DATA",
            payload: (prev = {}) => ({
              ...(prev ?? {}),
              title: "Staking now...",
            }),
          });
          await stakeLizards(
            props.stakingLizards,
            days,
            weightList[days].Weight,
            proof.merkleProof[0],
            dispatch
          );
          dispatch({
            type: "SET_DATA",
            payload: (prev = {}) => ({
              ...(prev ?? {}),
              loading: false,
            }),
          });
          toast.success("Staking Successful.");
        } else {
          toast.error("Invalid Merkle Proof!");
        }
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            loading: false,
          }),
        });
        toast.error("Staking failed.");
      }
    }
  };

  const unStake = async () => {
    if (props.unstakingLizards.length == 0) {
      toast.warning("No items selected");
    } else {
      try {
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            loading: true,
          }),
        });
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            title: "Unstaking now...",
          }),
        });
        await unStakeLizards(props.unstakingLizards, dispatch);
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            loading: false,
          }),
        });
        toast.success("UnStaking Successful.");
      } catch (e) {
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            loading: false,
          }),
        });
        toast.error("UnStaking failed.");
      }
    }
  };

  useEffect(() => {
    if (weightList.length > 0) {
      setStakeWeight(
        getStakingWeight(props.stakingLizards, weightList[days].Weight)
      );
    } else {
      setStakeWeight(0);
    }
  }, [days, props.stakingLizards.length]);

  useEffect(() => {
    readWeightInfo();
  }, []);

  const label1Tab = (
    <div className="flex flex-row space-x-4">
      <CustomText color="white" size="sm" transparent={value ? true : false}>
        Unstaked
      </CustomText>
      <CustomText color="white" size="sm" transparent>
        {props.stakingLizards.length}
      </CustomText>
    </div>
  );
  const label2Tab = (
    <div className="flex flex-row space-x-4">
      <CustomText color="white" size="sm" transparent={value ? false : true}>
        Staking
      </CustomText>
      <CustomText color="white" size="sm" transparent>
        {props.unstakingLizards.length}
      </CustomText>
    </div>
  );
  return (
    <div
      className={` ${
        isPhoneMode
          ? ""
          : "h-full w-full border rounded-md border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover mt-4 mb-4"
      }`}
    >
      <div className="flex flex-row items-center space-x-2 w-full pl-4 py-4">
        <CustomText className="text-baseft" bold="bold" color="white">
          {props.selectedCount}
        </CustomText>
        <CustomText className="text-baseft" bold="bold" color="white">
          items selected
        </CustomText>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        className="border-b border-blue_gray border-opacity-10 px-4"
      >
        <Tab label={label1Tab} />
        <Tab label={label2Tab} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {props.stakingLizards.length > 0 ? (
          <div className="px-4 py-4">
            {props.stakingLizards.map((item, index) => {
              return (
                <NftSelectedCard
                  data={item}
                  key={index}
                  cancelLizard={() => props.cancelLizard(item)}
                />
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-20">
            <CustomText size="lg" color="white" align="center" bold="bold">
              {" "}
              No items selected
            </CustomText>
            <CustomText size="sm" color="white" trasparent align="center">
              {" "}
              Choose your unstaked items to stake{" "}
            </CustomText>
          </div>
        )}
        <div className="pt-2">
          <CustomText
            align="left"
            color="white"
            size="sm"
            className="w-full pl-4"
            bold="bold"
          >
            Current stake weight {props.weight}
          </CustomText>
          <CustomText
            align="left"
            color="white"
            transparent
            className="w-full pl-4 pt-2"
            size="xs"
          >
            This is your current staked weighting.
          </CustomText>
        </div>
        <div className="pt-6">
          <CustomText
            align="left"
            color="white"
            size="sm"
            className="w-full pl-4"
            bold="bold"
          >
            Duration
          </CustomText>
          <div className="flex flex-row flex-wrap items-center justify-start px-4 pt-4">
            <button
              onClick={() => {
                resetDuration(30);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 30 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                1 Month
              </CustomText>
            </button>
            <button
              onClick={() => {
                resetDuration(90);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 90 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                3 Months
              </CustomText>
            </button>
            <button
              onClick={() => {
                resetDuration(180);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 180 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                6 Months
              </CustomText>
            </button>
            <button
              onClick={() => {
                resetDuration(360);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 360 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                12 Months
              </CustomText>
            </button>
            <button
              onClick={() => {
                resetDuration(730);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 730 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                24 Months
              </CustomText>
            </button>
            <button
              onClick={() => {
                resetDuration(0);
              }}
              className={`flex flex-row border-solid border rounded-3xl border-title border-opacity-20  mr-3 mb-4 px-2 space-x-4 ${
                duration == 0 ? "bg-btncolor" : "bg-white bg-opacity-5"
              }`}
            >
              <CustomText color="white" size="sm" bold="bold">
                Custom
              </CustomText>
            </button>
          </div>
          {duration == 0 ? (
            <div className="px-4 pt-8">
              <SelectBar changeDays={(value) => setDays(value)} />
            </div>
          ) : null}
          <div className="px-4 pt-8">
            <div className="flex flex-row space-x-4">
              <CustomText align="left" color="white" size="xs">
                Stake weight
              </CustomText>
              <CustomText color="title" size="xs">
                {stakeWeight}
              </CustomText>
            </div>
          </div>

          <div className="px-4 py-8">
            <CustomText
              align="left"
              color="white"
              transparent
              className="w-full pb-8"
              size="xs"
            >
              Select your Lizards that you wish to stake. Genesis Ethlizards
              earn a 2 x Bonus on any weights staked. The minimum stake duration
              is 1 month with a maximum lock time of 2 years. Lizards will
              retain their weights at the end of their individual unlock
              periods.
            </CustomText>
            <button
              onClick={stake}
              className="w-full border-solid border rounded-md border-btncolor bg-btncolor py-3"
            >
              <CustomText align="center" size="sm" bold="bold">
                Stake
              </CustomText>
            </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.unstakingLizards.length > 0 ? (
          <div className="px-4 py-4">
            {props.unstakingLizards.map((item, index) => {
              return (
                <NftSelectedCard
                  data={item}
                  key={index}
                  cancelLizard={() => props.cancelLizard(item)}
                />
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-20">
            <CustomText size="lg" color="white" align="center" bold="bold">
              {" "}
              No items selected
            </CustomText>
            <CustomText size="sm" color="white" align="center">
              {" "}
              Choose your staked items to unstake{" "}
            </CustomText>
          </div>
        )}
        <div className="pt-2 px-4">
          <CustomText
            align="left"
            color="white"
            size="sm"
            bold="bold"
            className="w-full"
          >
            Current stake weight {props.weight}
          </CustomText>
          <CustomText
            align="left"
            color="white"
            transparent
            size="xs"
            className="w-full py-2"
          >
            Select any lizards that are unlocked and staking to unstake directly
            to your wallet.
          </CustomText>
          <button
            onClick={unStake}
            className="w-full border-solid border rounded-md border-btncolor bg-btncolor py-3"
          >
            <CustomText align="center" size="sm" bold="bold">
              Unstake
            </CustomText>
          </button>
        </div>
      </TabPanel>
    </div>
  );
}
