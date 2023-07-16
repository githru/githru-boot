import React, { useRef, useEffect, useState } from "react";
import "./App";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([24, 30, 45, 70, 26]);
  const svgRef = useRef(null);
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    const svg = d3.select(svgRef.current); // selection 객체
    const x = d3
      .scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <>
      <svg width={width} height={height} ref={svgRef}></svg>
    </>
  );
}
export default App;
