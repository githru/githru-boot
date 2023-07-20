import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { SamSung_data } from "../data/StockData";
import { DataPoint } from "../Types";

const LineChart: React.FC = () => {
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

    const x: d3.ScaleTime<number, number> = d3
      .scaleTime()
      .domain(d3.extent(new_SamSung_data, (d) => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);
    
    const y: d3.ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([0, d3.max(new_SamSung_data, (d) => d.price) as number])
      .range([height - marginBottom, marginTop]);

    const line: d3.Line<DataPoint> = d3
      .line<DataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    const LineSvg = d3.select(svgRef.current);

    LineSvg.attr("width", width);
    LineSvg.attr("height", height);

    LineSvg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    LineSvg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )

    LineSvg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(new_SamSung_data));
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
    />
  );
};

export default LineChart;
