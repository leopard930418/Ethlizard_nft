import React from "react";
import Slider from "rsuite/Slider"

export default function SelectBar({...props}) {

  const changeStatus = (value) => {
    document.getElementsByClassName("rs-tooltip")[0].innerText = `${value} days`
    props.changeDays(value)
  }
  return (
    <Slider
        progress
        min={30}
        max={730}
        defaultValue={30}
        onChange={value => changeStatus(value)}
    />
  );
}
