import { select } from "d3";
import { useContext } from "react";
import { ChartDataContext } from "../../Chart/Chart.hook";

export const Graph: React.FC = () => {
  const value = useContext(ChartDataContext);
  if (value === null) return null;
  const { svgRef, tempData, lineGenerator, xScale, yScale } = value;
  const svg = select(svgRef.current);
  const svgContent = svg.select(".content");
  svgContent
    .selectAll(".myLine")
    .data([tempData])
    .join("path")
    .attr("class", "myLine")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", (d) => lineGenerator(d.map((data) => [data, data])));

  svgContent
    .selectAll(".myDot")
    .data(tempData)
    .join("circle")
    .attr("class", "myDot")
    .attr("stroke", "black")
    .attr("r", 4)
    .attr("fill", "orange")
    .attr("cx", (v, index) => xScale(index))
    .attr("cy", yScale);

  return <g className="content"></g>;
};
