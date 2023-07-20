import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { SamSung_data } from "../data/StockData";

const width: number = 928;
const height: number = 500;
const marginTop: number = 20;
const marginRight: number = 30;
const marginBottom: number = 50;
const marginLeft: number = 50;

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const new_SamSung_data = SamSung_data.map((ele) => ({
      date: new Date(ele.date).toISOString().slice(5,10),
      price: ele.price,
    }));
    console.log(new_SamSung_data)
    const xScale: d3.ScaleBand<string> = d3
      .scaleBand()
      .domain(new_SamSung_data.map((d) => d.date))
      .range([marginLeft, width - marginRight])
      .padding(0.2);

    const yScale: d3.ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([0, d3.max(new_SamSung_data, (d) => d.price) as number])
      .range([height - marginBottom, marginTop]);

    const BarSvg = d3.select(svgRef.current);

    BarSvg.attr("width", width);
    BarSvg.attr("height", height);

    BarSvg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale));

    BarSvg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale));

    BarSvg
      .selectAll("rect")
      .data(new_SamSung_data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.date) as number)
      .attr("y", (d) => yScale(d.price))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - marginBottom - yScale(d.price))
      .attr("fill", "steelblue");
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
    />
  );
};

export default BarChart;
