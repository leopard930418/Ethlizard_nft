import React from "react";
import SuccessIcon from "assets/images/successIcon.svg";

import ToastcloseIcon from "assets/images/toastcloseIcon.svg";
import CustomImage from "./CustomImage";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function CustomToast({ closeToast }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center bg-green-400">
        <div className="flex flex-row pl-4 space-x-2">
          <CustomImage src={SuccessIcon} className=""></CustomImage>
          <h2 className=""> Success </h2>
        </div>
        <div className="pr-4">
          <CustomImage src={ToastcloseIcon}></CustomImage>
        </div>
      </div>
      <div className="bg-white">
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          diusmod tempor incididunt ut labore.{" "}
        </p>
      </div>
    </div>
  );
}
