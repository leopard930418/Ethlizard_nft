import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import BurnIcon from "assets/images/burnIcon.svg";
import { Grid } from "@mui/material";
import NftSelectedCard from "./nftSelectedCard";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { burnLizards } from "functions/Utility";
import { createMerkleProof } from "functions/Utility";

export default function NftOperationCard({ ...props }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isPhoneMode = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const burn = async () => {
    if (props.burnLizards.length == 0) {
      toast.warning("No items selected");
    } else {
      try {
        handleClose();
        var pairs = [];
        for (var lizard of props.burnLizards) {
          pairs.push({ key: lizard.tokenID, value: lizard.burnFor });
        }
        const proof = createMerkleProof(pairs, 2);
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
              title: "Burning now...",
            }),
          });
          await burnLizards(props.burnLizards, proof.merkleProof, dispatch);
          dispatch({
            type: "SET_DATA",
            payload: (prev = {}) => ({
              ...(prev ?? {}),
              loading: false,
            }),
          });
          toast.success("Burn Successful.");
        } else {
          toast.error("Invalid Merkle Proof!");
        }
      } catch (e) {
        toast.error("Burn failed.");
        dispatch({
          type: "SET_DATA",
          payload: (prev = {}) => ({
            ...(prev ?? {}),
            loading: false,
          }),
        });
        console.log(e);
      }
    }
  };

  return (
    <div
      className={` ${
        isPhoneMode
          ? ""
          : "h-full w-full border rounded-md border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover mt-4 mb-4"
      }`}
      // className="sm:h-full w-full border rounded-md border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover mt-4 mb-4"
    >
      <div className="flex flex-row items-center space-x-2 w-full pl-4 py-4">
        <CustomText className="text-baseft" bold="bold" color="white">
          {props.selectedCount}
        </CustomText>
        <CustomText className="text-baseft" color="white">
          items selected
        </CustomText>
      </div>
      {props.selectedCount > 0 ? (
        <>
          <div className="px-4 py-4">
            {props.burnLizards.map((item, index) => {
              return (
                <NftSelectedCard
                  data={item}
                  key={index}
                  cancelLizard={() => props.cancelLizard(item)}
                />
              );
            })}
          </div>
          <div className="flex items-center pt-2 px-8 pb-8">
            <CustomImage src={BurnIcon}></CustomImage>
            <Grid item>
              <CustomText
                align="left"
                color="white"
                transparent
                className="w-full px-8"
                size="sm"
              >
                Total burn claim value
              </CustomText>
              <CustomText
                align="left"
                color="white"
                className="w-full pl-8 text-baseft"
                bold="bold"
              >
                {props.totalBurn} {"LIZ"}{" "}
              </CustomText>
            </Grid>
          </div>
        </>
      ) : (
        <div className="px-4 py-20">
          <CustomText size="lg" color="white" align="center" bold="bold">
            {" "}
            No items selected
          </CustomText>
          <CustomText size="sm" color="white" align="center">
            {" "}
            Choose your Lizards you wish to Burn{" "}
          </CustomText>
        </div>
      )}

      <div className="pt-6">
        <div className="px-4 py-8">
          <CustomText
            align="left"
            color="white"
            transparent={true}
            className="w-full pb-8"
            size="xs"
          >
            Are you really sure you want to burn your lizard? This is
            irreversible. I Implore you, don't do it bruh!
          </CustomText>
          <button
            onClick={handleOpen}
            className="w-full border-solid border rounded-md border-btncolor bg-btncolor py-3"
          >
            <CustomText align="center" size="sm" bold="bold">
              Burn
            </CustomText>
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed flex w-full sm:w-4/12  h-auto flex-col top-1/3 sm:left-1/3 border rounded-xl border-blue_gray border-opacity-20 bg-background ">
          <CustomText
            align="center"
            size="2xl"
            className="pt-8 pb-4"
            bold="bold"
          >
            Burn {props.selectedCount} items?
          </CustomText>
          <CustomImage src={BurnIcon} className="h-10 my-2"></CustomImage>

          <CustomText
            align="center"
            color="white"
            transparent={true}
            className="w-full p-8"
            size="sm"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            diusmod tempor incididunt ut labore.
          </CustomText>
          <div className="flex flex-row justify-center space-x-4 pb-16">
            <button
              className=" w-1/3  rounded-xl  bg-blue-600 py-1"
              onClick={burn}
            >
              <CustomText align="center" size="lg">
                Burn
              </CustomText>
            </button>
            <button
              className=" w-1/3 border-solid border-2 rounded-xl border-blue-600  py-1"
              onClick={handleClose}
            >
              <CustomText align="center" size="lg">
                Cancel
              </CustomText>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
