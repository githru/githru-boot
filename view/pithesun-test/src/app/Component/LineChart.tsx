"use client";

import { useEffect, useRef } from "react";
import { ITideInfoBeach } from "@/api/api";

import {
  select,
  line,
  scaleTime,
  scaleLinear,
  extent,
  max,
  timeParse,
} from "d3";

const dateTimeParse = timeParse("%Y-%m-%d %H:%M");
interface ILineChart {
  data: ITideInfoBeach[];
}

export default function LineChart({ data }: ILineChart) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);

    const domain = extent(
      data.map((d) => {
        return dateTimeParse(`${d.baseDate} ${d.tiTime}`) || new Date();
      })
    ) as Date[];

    const x = scaleTime().domain(domain).range([0, 500]);
    const y = scaleLinear()
      .domain([0, max(data.map((value) => Number(value.tilevel))) as number])
      .range([0, 500]);

    const myline = line<ITideInfoBeach>()
      .x((value) => {
        return x(
          dateTimeParse(`${value.baseDate} ${value.tiTime}`) || new Date()
        );
      })
      .y((value) => {
        return y(Number(value.tilevel));
      });

    svg
      .attr("width", 500)
      .attr("height", 500)
      .attr("viewBox", [0, 0, 500, 500])
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myline(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  if (!data) return <></>;

  return (
    <>
      <svg ref={svgRef}>
        <path d="" fill="none" stroke="blue"></path>
      </svg>
    </>
  );
}
