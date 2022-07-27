import React from "react";
import CustomText from "views/components/CustomText";

export default function BarChartHorizon({ amount = "", total = "" }) {
  const ratio = parseFloat((parseFloat(amount) / parseFloat(total)) * 100);
  return (
    <div className="flex flex-col items-center">
      <div className="w-60 h-10 rounded-md bg-gradient-to-b from-blue-700 to-fuchsia-500 mb-2">
        <div
          className="h-full rounded-md relative bottom-0 bg-gradient-to-b from-green-300 to-green-600"
          style={{ width: `${ratio}%` }}
        ></div>
      </div>
      <div>
        <CustomText size="sm">
          {amount} of {total}
        </CustomText>
      </div>
    </div>
  );
}
