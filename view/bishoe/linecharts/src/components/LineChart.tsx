import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import ObjectData from "../datafile.json";
import { ChartData, TimeValue } from "../data/data";

const LineChart = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [chartData, setChartData] = useState<ChartData>(ObjectData);
  const [data, setData] = useState<TimeValue[]>(chartData["강도"]);
  const [currentCrimeType, setCurrentCrimeType] =
    useState<keyof ChartData>("강도");

  const crimeTypes: (keyof ChartData)[] = ["강도", "살인", "절도"];
  const crimeTypeColors: { [key in keyof ChartData]: string } = {
    강도: "blue",
    살인: "red",
    절도: "green",
  };

  const changeData = (crimeType: keyof ChartData) => {
    setCurrentCrimeType(crimeType);
    setData(chartData[crimeType]);
  };

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).selectAll("svg").remove();
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 200 - margin.top - margin.bottom;
      const x = d3
        .scalePoint()
        .domain(data.map((d) => d.time))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .range([height, 0]);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const line = d3
        .line<TimeValue>()
        .curve(d3.curveMonotoneX)
        .x((d) => x(d.time)!)
        .y((d) => y(d.value)!);

      svg
        .append("path")
        .datum(data)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", crimeTypeColors[currentCrimeType])
        .attr("stroke-width", 1.5)
        .attr("d", line);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      const maxValue = d3.max(data, (d) => d.value);
      const maxPoint: TimeValue | undefined = data.find(
        (d) => d.value === maxValue
      );

      if (maxPoint) {
        svg
          .append("circle")
          .attr("cx", x(maxPoint.time))
          .attr("cy", y(maxPoint.value))
          .attr("r", 3)
          .attr("fill", "red");
      }
    }
  }, [data, currentCrimeType]);

  return (
    <section>
      <div ref={ref}></div>
      {crimeTypes.map((type) => (
        <button
          key={type}
          onClick={() => changeData(type)}
          style={{
            backgroundColor:
              currentCrimeType === type ? crimeTypeColors[type] : "transparent",
            color: currentCrimeType === type ? "white" : "black",
            padding: "10px 20px",
            border: currentCrimeType === type ? "none" : "1px solid",
            borderRadius: "5px",
            fontSize: "1em",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </section>
  );
};

export default LineChart;
