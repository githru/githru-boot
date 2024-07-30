"use client";

import { useEffect, useRef } from "react";
import {
  select,
  line,
  scaleTime,
  scaleLinear,
  extent,
  max,
  scaleUtc,
} from "d3";

const splittedDate = ({ date, time }) => {
  const splittedDate = date.split("-").map((d) => Number(d));
  const splittedTime = time.split(":").map((d) => Number(d));
  return new Date(
    Date.UTC(
      splittedDate[0],
      splittedDate[1] - 1,
      splittedDate[2],
      splittedTime[0],
      splittedTime[1],
      0
    )
  );
};

export default function LineChart({ data }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);

    const x = scaleUtc(
      extent(
        data.map((d) => splittedDate({ date: d.baseDate, time: d.tiTime }))
      ),
      [0, 500]
    );
    const y = scaleLinear(
      [0, max(data.map((d) => Number(d.tilevel)))],
      [0, 500]
    );

    const myline = line()
      .x((value) => {
        return x(splittedDate({ date: value.baseDate, time: value.tiTime }));
      })
      .y((value) => {
        return y(Number(value?.tilevel));
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
