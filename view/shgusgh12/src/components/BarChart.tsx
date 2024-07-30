import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { month, value } from "../data";
import { formatData } from "../utils/formatData";
const BarChart = () => {
  const chartData = formatData(month, value);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = 800 - margin.left - margin.right;
    const innerHeight = 500 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 6000])
      .nice()
      .range([innerHeight, 0]);

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").call(d3.axisLeft(yScale));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.month)!)
      .attr("y", (d) => yScale(d.value)!)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", "steelblue");
  }, [chartData]);

  return <svg ref={svgRef} width="800" height="500"></svg>;
};

export default BarChart;
