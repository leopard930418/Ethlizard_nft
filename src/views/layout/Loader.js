import loading from "assets/images/loading.gif";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";
import React, { useState } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import PropTypes from "prop-types";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
export default function Loader({
  statusTitle = "Loading now...",
  progress = 100,
  isLoading = false,
  ...props
}) {
  return (
    <>
      {isLoading ? (
        <div
          className="fixed flex flex-col justify-center items-center bg-[#201c3d] h-screen top-0 left-0 right-0 z-50"
          style={{ opacity: "0.8" }}
        >
          <CustomImage
            src={loading}
            style={{ maxWidth: 40, justifyContent: "center" }}
            className="h-40"
          ></CustomImage>
          <CustomText size="xl" align="center">
            {statusTitle}
          </CustomText>
        </div>
      ) : null}
    </>
  );
}
