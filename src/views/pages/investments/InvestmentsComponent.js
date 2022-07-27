import React, { useEffect, useState } from "react";
import CustomText from "views/components/CustomText";
import CustomImage from "views/components/CustomImage";
import Moment from "moment";
import InvestorDetailCard from "./investorDetailCard";
import CloseIcon from "assets/images/closeIcon.svg";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import VerticalCollapse from "views/components/VerticalCollapse";

const statusInfo = {
  1: "Approved",
  2: "Allocated",
  3: "Vested",
  4: "Unlocked",
  5: "Sold",
  6: "Closed",
};
export default function InvestmentsComponent() {
  const [isConcilMenuShow, setIsConcilMenuShow] = useState(false);
  const [isConcilMenuShowMob, setIsConcilMenuShowMob] = useState(false);
  const handleClickOpen = (index) => {
    setIsConcilMenuShowMob(true);
    setCurrentCouncil(investData[index].council[0]);
  };
  const handleClose = () => {
    setIsConcilMenuShowMob(false);
  };
  const investData = useSelector((state) => state?.data?.cData ?? {});
  const [currentCouncil, setCurrentCouncil] = useState({});

  const openCoucilModal = (index) => {
    setIsConcilMenuShow(!isConcilMenuShow);
    setCurrentCouncil(investData[index].council[0]);
  };

  return (
    <div className="mt-12  pb-20">
      <VerticalCollapse isOpen={isConcilMenuShow}>
        <div className="bg-councilbg w-full h-screen z-50">
          <div className="flex justify-end pr-4 py-3">
            <CustomImage
              src={CloseIcon}
              className="h-8"
              onClick={() => {
                setIsConcilMenuShow(!isConcilMenuShow);
              }}
            ></CustomImage>
          </div>
          <div className="px-8 py-4">
            <CustomText color="white" align="left" size="xl">
              {currentCouncil.name}
            </CustomText>
            <div className="py-4">
              <CustomText align="left" transparent={true} size="lg">
                {currentCouncil.desc},{" "}
              </CustomText>
            </div>
            <div className="flex flex-row items-center border-b border-blue_gray border-opacity-10 py-4">
              <div className="w-1/2">
                <CustomText color="white" align="left" size="lg">
                  Member Name
                </CustomText>
              </div>
              <div className="w-1/2">
                <CustomText color="white" align="left" size="lg">
                  Position
                </CustomText>
              </div>
            </div>
            {currentCouncil?.members?.map((item, index) => {
              return (
                <div
                  className="flex flex-row items-center border-b border-blue_gray border-opacity-10 py-4"
                  key={index}
                >
                  <div className="w-1/2">
                    <CustomText
                      color="white"
                      transparent={true}
                      align="left"
                      size="lg"
                    >
                      {item.name}
                    </CustomText>
                  </div>
                  <div className="w-1/2">
                    <CustomText color="white" transparent={true} align="left">
                      {item.position}
                    </CustomText>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </VerticalCollapse>
      <CustomText
        color="white"
        align="left"
        className="text-2xl sm:text-tit pb-4"
        bold="bold"
      >
        Vault Investments
      </CustomText>
      <CustomText
        color="white"
        align="left"
        className="text-baseft w-full sm:w-2/3"
        transparent
      >
        Details of Ethlizard DAO Investments made by the Ethlizard council. These investments are reflected in the Dashboard as their corresponding invested Amounts.
      </CustomText>
      <table className="table-auto text-white w-full mt-8  leading-8 hidden sm:table">
        <thead>
          <tr className="text-bold text-sm">
            <th className="text-left">Investor</th>
            <th className="text-left">Council</th>
            <th className="text-right">Amount</th>
            <th>Investment Date</th>
            <th>Vesting Date</th>
            <th className="text-right">Allocation</th>
            <th className="text-left pl-14">Round</th>
            <th className="text-left pl-16">Status</th>
          </tr>
        </thead>

        <tbody className="text-center text-sm ">
          {investData.length > 0 &&
            investData.map((item, index) => {
              return (
                <tr className="" key={index}>
                  <td className="w-52">
                    <div className="flex flex-row items-center h-16">
                      <div className="w-12">
                        <CustomImage
                          src={`/image/invest/${item.invest.image}.png`}
                          className="h-8 mx-auto"
                        />
                      </div>
                      <div className="ml-2 ">
                        <CustomText size="sm" transparent>
                          {item.invest.investor}
                        </CustomText>
                      </div>
                    </div>
                  </td>
                  <td className="w-24">
                    <div
                      className="flex items-center underline decoration-1 h-16"
                      onClick={() => openCoucilModal(index)}
                    >
                      <CustomText
                        size="sm"
                        bold="bold"
                        align="left"
                        className="cursor-pointer"
                      >
                        {item.council[0].name}
                      </CustomText>
                    </div>
                  </td>
                  <td className="w-24">
                    <div className="flex justify-end items-center h-16">
                      <CustomText size="sm" transparent align="right">
                        {item.invest.amount}{" "}
                        {item.invest.is_usd ? " USD" : " ETH"}
                      </CustomText>
                    </div>
                  </td>
                  <td className="w-56">
                    <div className="flex justify-center items-center h-16">
                      <CustomText size="sm" transparent>
                        {Moment(item.invest.invest_date).format("D MMM yyyy")}
                      </CustomText>
                    </div>
                  </td>
                  <td className="w-24">
                    <div className="flex justify-center items-center h-16">
                      <CustomText size="sm" transparent>
                        {Moment(item.invest.vesting_date).format("D MMM yyyy")}
                      </CustomText>
                    </div>
                  </td>
                  <td className="w-32">
                    <div className="flex justify-end items-center text-right h-16">
                      <CustomText size="sm" align="right" transparent>
                        {item.invest.allocation.toLocaleString()}
                      </CustomText>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-start items-center pl-14 h-16">
                      <CustomText size="sm" align="left" transparent>
                        {item.invest.round}
                      </CustomText>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-start items-center pl-16 h-16">
                      <CustomText size="sm" align="left" transparent>
                        {statusInfo[item.invest.status]}
                      </CustomText>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex flex-col sm:hidden">
        {investData.length > 0 &&
          investData.map((item, index) => {
            return (
              <InvestorDetailCard
                data={item}
                onClick={() => {
                  handleClickOpen(index);
                }}
                key={index}
              />
            );
          })}
      </div>
      <Dialog
        fullScreen
        open={isConcilMenuShowMob}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        {isConcilMenuShowMob ? (
          <div className=" bg-councilbg h-screen">
            <div className="flex justify-end pr-4 py-3">
              <CustomImage
                src={CloseIcon}
                className="h-8"
                onClick={() => {
                  setIsConcilMenuShowMob(!isConcilMenuShowMob);
                }}
              ></CustomImage>
            </div>
            <div className="px-8 py-4">
              <CustomText color="white" align="left" size="xl">
                {currentCouncil.name}
              </CustomText>
              <div className="py-4">
                <CustomText align="left" transparent={true} size="lg">
                  {currentCouncil.desc},{" "}
                </CustomText>
              </div>
              <div className="flex flex-row items-center border-b border-blue_gray border-opacity-10 py-4">
                <div className="w-1/2">
                  <CustomText color="white" align="left" size="lg">
                    Member Name
                  </CustomText>
                </div>
                <div className="w-1/2">
                  <CustomText color="white" align="left" size="lg">
                    Position
                  </CustomText>
                </div>
              </div>
              {currentCouncil.members.map((item, index) => {
                return (
                  <div
                    className="flex flex-row items-center border-b border-blue_gray border-opacity-10 py-4"
                    key={index}
                  >
                    <div className="w-1/2">
                      <CustomText
                        color="white"
                        transparent={true}
                        align="left"
                        size="lg"
                      >
                        {item.name}
                      </CustomText>
                    </div>
                    <div className="w-1/2">
                      <CustomText color="white" transparent={true} align="left">
                        {item.position}
                      </CustomText>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
