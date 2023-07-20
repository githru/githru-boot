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
  const svgRef = useRef(null);
  let [minDate, maxDate] = d3.extent(data, (d) => d.date);
  let [minValue, maxValue] = d3.extent(data, (d) => d.average);

  minDate = minDate ?? new Date("2022-01-01");
  maxDate = maxDate ?? new Date("2022-12-31");
  minValue = minValue ?? -30;
  maxValue = maxValue ?? 50;
  const x = d3.scaleUtc([minDate, maxDate], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(
    [minValue, maxValue],
    [height - marginBottom, marginTop]
  );
  const line: d3.Line<{ date: Date; average: number }> = d3.line(
    (d) => x(d.date),
    (d) => y(d.average)
  );
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));
  }, [x, y, height, marginBottom, marginLeft]);

  const d = line(data);
  if (d !== null) {
    return (
      <svg ref={svgRef} width={width} height={height}>
        <path fill="none" stroke="currentColor" strokeWidth="1.5" d={d} />
      </svg>
    );
  } else return <h1></h1>;
};

export default WeatherLine;
