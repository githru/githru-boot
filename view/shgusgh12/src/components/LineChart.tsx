import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { month, value } from "../data";
import { formatData } from "../utils/formatData";
const LineChart = () => {
  const chartData = formatData(month, value);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = 800 - margin.left - margin.right;
    const innerHeight = 500 - margin.top - margin.bottom;

    const xScale = d3
      .scalePoint()
      .domain(chartData.map((d) => d.month))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear().domain([0, 6000]).range([innerHeight, 0]);

    const lineGenerator = d3
      .line<{ month: string; value: number }>()
      .x((d) => xScale(d.month)!)
      .y((d) => yScale(d.value));

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").call(d3.axisLeft(yScale));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("d", lineGenerator);
  }, [chartData]);

  return <svg ref={svgRef} width="800" height="500"></svg>;
};

export default LineChart;
