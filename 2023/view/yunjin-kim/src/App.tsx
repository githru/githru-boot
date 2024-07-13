import {
  scaleLinear,
  line,
  select,
  extent,
  axisBottom,
  axisLeft,
  scaleTime,
} from "d3";
import { useRef, useEffect, useState } from "react";
import { data1, data2, data3 } from "./data";

export interface DataPoint {
  date: Date;
  close: number;
}

export const App = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  return (
    <>
      <button onClick={() => setData(data1)}>data1</button>
      <button onClick={() => setData(data2)}>data2</button>
      <button onClick={() => setData(data3)}>data3</button>
      <LinePlot width={640} height={800} data={data} />
    </>
  );
};

interface AreaChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const LinePlot = ({
  data,
  width = 640,
  height = 800,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: AreaChartProps) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(ref.current);

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const xExtent = extent(data, (d) => d.date) as [Date, Date];
    const xDomain = xExtent[0]
      ? xExtent
      : [new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()];
    const xScale = scaleTime().domain(xDomain).range([0, innerWidth]);

    const yExtent = extent(data, (d) => d.close) as number[];
    const yDomain = yExtent[1] ? yExtent : [0, 3000];
    const yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(axisBottom(xScale));

    g.append("g").call(axisLeft(yScale));

    const lineGenerator = line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.close));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};
