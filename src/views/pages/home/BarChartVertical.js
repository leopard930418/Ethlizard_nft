import React from "react";
import CustomText from "views/components/CustomText";

export default function BarChartVertical({ title = "", value = "" }) {
  const upValue = 100 - parseInt(value);
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-24 rounded-md bg-green-400 mb-2">
        <div
          className="w-full rounded-md relative bottom-0 bg-gradient-to-b from-blue-700 to-fuchsia-500"
          style={{ height: `${upValue}%` }}
        ></div>
        <div
          className="w-full rounded-md relative bottom-0 bg-gradient-to-b from-green-300 to-green-600"
          style={{ height: `${value}%` }}
        ></div>
      </div>
      <div>
        <CustomText size="sm">{title}</CustomText>
      </div>
      <div>
        <CustomText size="sm">{value}%</CustomText>
      </div>
    </div>
  );
}
