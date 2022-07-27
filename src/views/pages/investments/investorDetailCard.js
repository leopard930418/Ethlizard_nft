import React from "react";
import Moment from "moment";
import CustomImage from "views/components/CustomImage";
import CustomText from "views/components/CustomText";

export default function InvestorDetailCard({
  data={},
  onClick=() =>{},
}){
  const statusInfo = {
    1: "Approved",
    2: "Allocated",
    3: "Vested",
    4: "Unlocked",
    5: "Sold",
    6: "Closed",
  };
  return (
    <div className=" h-full w-full rounded-xl border border-blue_gray border-opacity-20 bg-white bg-opacity-5 bg-center bg-no-repeat bg-cover mt-4 mb-4">
      <div className="flex justify-start pt-4 pb-4 border-b border-blue_gray border-opacity-20 ">
        <div className="flex justify-center w-20 ">
          <CustomImage src={`/image/invest/${data.invest.image}.png`} className="h-8" />
        </div>
        <div className="flex justify-start items-center">
          <CustomText size="sm" color="white" bold="bold">{data.invest.investor}</CustomText>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-col justify-center pt-4 pb-4 pl-4 space-y-2">
          <CustomText align="left" color="white" bold="bold" size="sm">Council</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Amount</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Investment Date</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Vesting Date</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Allocation</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Round</CustomText>
          <CustomText align="left" color="white" bold="bold" size="sm">Status</CustomText>
        </div>
        <div className="w-2/2 flex flex-col justify-center pt-4 pb-4 pl-4 space-y-2">
          <CustomText align="left  underline decoration-1" color="white" bold="bold" onClick={onClick}>{data.council[0].name}</CustomText>
          <CustomText align="left" color="white" transparent size="sm">
            {data.invest.amount} {data.invest.is_usd ? " USD" : " ETH"}
          </CustomText>
          <CustomText align="left" color="white" transparent size="sm">
          {Moment(data.invest.invest_date).format("D MMM yyyy")}
          </CustomText>
          <CustomText align="left" color="white" transparent size="sm">
          {Moment(data.invest.vesting_date).format("D MMM yyyy")}
          </CustomText>
          <CustomText align="left" color="white" transparent size="sm">
          {data.invest.allocation.toLocaleString()}
          </CustomText>
          <CustomText align="left" color="white" transparent size="sm">
          {data.invest.round}
          </CustomText>
          <CustomText align="left" color="white" transparent size="sm">
          {statusInfo[data.invest.status]}
          </CustomText>
        </div>
      </div>
    </div>
  );
}
