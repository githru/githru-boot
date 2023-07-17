import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface WeatherLineProps {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  data: { date: Date; average: number }[];
}

const WeatherLine: React.FC<WeatherLineProps> = ({
  data,
  width,
  height,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const gx = useRef(null);
  const gy = useRef(null);

  const x = d3.scaleUtc(
    d3.extent(data, (d) => d.date),
    [marginLeft, width - marginRight]
  );

  console.log(data);
  const y = d3.scaleLinear(
    d3.extent(data, (d) => d.average),
    [height - marginBottom, marginTop]
  );

  console.log(d3.extent(data, (d) => d.date));
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.average));

  useEffect(() => {
    d3.select(gx.current).call(d3.axisBottom(x));
  }, [gx, x]);
  useEffect(() => {
    d3.select(gy.current).call(d3.axisLeft(y));
  }, [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
    </svg>
  );
};

export default WeatherLine;
