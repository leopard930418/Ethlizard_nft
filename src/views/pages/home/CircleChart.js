import React from "react";
import DonutChart from "react-donut-chart";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomText from "views/components/CustomText";
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex items-center bg-white h-8 rounded-sm px-4  z-[99999999999]">
        <p className="label">{`${payload[0].payload.label} : ${payload[0].value.toLocaleString()} USD`}</p>
      </div>
    );
  }

  return null;
};
export default function CircleChart({
  data = [],

  innerRadius = 90,
  outerRadius = 150,
  width = 400,
  height = 400,
  totalValue = "",
  isRewardSchedule = false,
  totalEmitted = 1000,
  totalSupply = 9000,
  color = ["#71C78D", "#00BBDC", "#ffffff","#F2A22C", "#4291F8"],
  isTotalchart = false,
}) {
  return (
    <div style={{ position: "relative", overflowX: "hidden" }}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={540}
          label={false}
          stroke="none"
          color={color}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>
        {isTotalchart ? null : <Tooltip  className="z-50" content={<CustomTooltip />}></Tooltip>}
      </PieChart>
      {!isRewardSchedule ? (
        <>
          <div style={{ position: "absolute", left: "50%", top: "45%" }}>
            <div
              style={{
                marginLeft: "-50%",
                marginRight: "-50%",
                color: "white",
              }}
            >
              <CustomText align="left" color="white" transparent size="xs">
                Total Estimated Value
              </CustomText>
            </div>
          </div>
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <div
              style={{
                marginLeft: "-50%",
                marginRight: "-50%",
                color: "white",
                // textAlign: "center"
              }}
            >
              <CustomText align="left" color="white" size="lg" bold="bold">
                {"$"}
                {totalValue.toLocaleString()}
                {" USD"}
              </CustomText>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: "50%", top: "35%" }}>
            <div
              style={{
                marginLeft: "-50%",
                marginRight: "-50%",
                color: "white",
              }}
            >
              <CustomText align="left" color="white" size="base" bold="bold">
                {totalEmitted.toLocaleString()}
                {"M $LIZ"}
              </CustomText>
            </div>
          </div>
          <div style={{ position: "absolute", left: "50%", top: "48%" }}>
            <div
              style={{
                marginLeft: "-50%",
                marginRight: "-50%",
                color: "white",
                opacity: "70%",
                // textAlign: "center"
              }}
            >
              {"of"}
            </div>
          </div>
          <div style={{ position: "absolute", left: "50%", top: "60%" }}>
            <div
              style={{
                marginLeft: "-50%",
                marginRight: "-50%",
                color: "white",
                // textAlign: "center"
              }}
            >
              <CustomText align="left" color="white" size="base" bold="bold">
                {totalSupply.toLocaleString()}
                {"M $LIZ"}
              </CustomText>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
