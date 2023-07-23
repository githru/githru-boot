import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { ColumnType, ExampleDataType } from "./types";

const HEIGHT = 500;
const MARGIN = 50; 
const WIDTH = 700;

export default function LineChart({ data }: {data:ExampleDataType}) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(ref.current);

    //scale defined
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.day))
      .range([MARGIN, WIDTH - MARGIN])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([HEIGHT - MARGIN, MARGIN]);

    // Define the line
    const valueline = d3
      .line<ColumnType>()
      .x((d) => xScale(d.day)!)
      .y((d) => yScale(d.value));

    // Add the new line
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg
      .append("g")
      .attr("transform", `translate(${MARGIN},0)`)
      .call(d3.axisLeft(yScale));

  }, [data]);

  return (
    <svg
      ref={ref}
      style={{
        height: HEIGHT,
        width: WIDTH,
      }}
    />
  );
}
