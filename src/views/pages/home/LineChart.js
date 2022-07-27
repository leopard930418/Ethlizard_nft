import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line } from "recharts";

export default function LineCharts({
  showHideChart = true,
  width: propsWidth = 1,
  height = 80,
  data = [],
}) {
  const chartContainer = useRef(null);
  const [width, setWidth] = useState(0);

  const initWidth = () => {
    if (chartContainer.current) {
      setWidth((chartContainer?.current?.offsetWidth ?? 0) - 40);
    }
  };

  useEffect(() => {
    initWidth();
    // eslint-disble-next-line
  }, [chartContainer.current]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      initWidth();
    });
  }, []);

  return (
    <div className="py-2 pl-6 flex-1" ref={chartContainer}>
      {showHideChart ? (
        <LineChart width={width} height={height} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="20%" stopColor="#09EDE4" stopOpacity={1} />
              <stop offset="70%" stopColor="#19A0FA" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dot={false}
            dataKey="price"
            stroke="url(#colorUv)"
            strokeWidth={3}
            fill="none"
            isAnimationActive={true}
            animationDuration={0}
            unit="M"
            strokeLinecap="round"
          />
        </LineChart>
      ) : null}
    </div>
  );
}
