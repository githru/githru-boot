import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { SamSung_data } from "../data/StockData";
import { DataPoint } from "../Types";

const BarChart: React.FC = () => {
  const width: number = 928;
  const height: number = 500;
  const marginTop: number = 20;
  const marginRight: number = 30;
  const marginBottom: number = 30;
  const marginLeft: number = 40;
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const new_SamSung_data = SamSung_data.map((ele) => ({
      date: new Date(ele.date),
      price: ele.price,
    }));

    const x: d3.ScaleBand<string> = d3
      .scaleBand()
      .domain(new_SamSung_data.map((d) => d.date.toISOString()))
      .range([marginLeft, width - marginRight]);

    const y: d3.ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([0, d3.max(new_SamSung_data, (d) => d.price) as number])
      .range([height - marginBottom, marginTop]);

    const BarSvg = d3.select(svgRef.current);

    BarSvg.attr("width", width);
    BarSvg.attr("height", height);
    BarSvg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(x));
    BarSvg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(d3.axisLeft(y));
    BarSvg
      .selectAll("rect")
      .data(new_SamSung_data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.date.toISOString()) as number)
      .attr("y", (d) => y(d.price))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - marginBottom - y(d.price))
      .attr("fill", "steelblue");
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

export default BarChart;
