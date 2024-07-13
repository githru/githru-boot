import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { ExampleDataType } from "./types";

const HEIGHT = 500;
const MARGIN = 50; 
const BAR_THICKNESS = 0.2;

export default function BarChart({ data }: {data:ExampleDataType}) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(ref.current);

    //scale defined
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.day))
      .range([MARGIN, data.length*100-MARGIN])
      .padding(BAR_THICKNESS);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value+1)!])
      .range([HEIGHT, MARGIN]);

    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, d3.max(data, (d) => d.value+1)!])
      .range(["#D6EAF8", "#154360"]);

    //animation
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (d) => xScale(d.day)!)
      .attr("y", - HEIGHT)
      .attr("width", xScale.bandwidth())
      .transition()
      .duration(800)
      .attr("height", (d) => HEIGHT - yScale(d.value))
      .attr("fill", (d) => colorScale(d.value));

    //middle label
    svg
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.day)! + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 20)
      .text((d) => d.value)
      .attr("text-anchor", "middle");

    // Add x-axis
    svg
    .append("g")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(xScale));
    
    // Add y-axis
    svg.append("g")
    .attr("transform", `translate(${MARGIN}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [data]);


  return (
    <svg
      ref={ref}
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  );
}


