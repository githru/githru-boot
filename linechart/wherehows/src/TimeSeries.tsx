import React from "react";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { ValueFn } from "d3";

interface Data {
  date: Date;
  value: number;
}

const csvURL =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";

const TimeSeries = ({ width, height }) => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    data && data.length > 0 ? drawChart() : getURLData();
  }, [data]);

  const getURLData = async () => {
    const res = await d3
      .csv(csvURL)
      .then((res) =>
        res.map((d) => ({
          date: d3.timeParse("%Y-%m-%d")(d.date as string) as Date,
          value: parseFloat(d.value as string),
        }))
      );
    setData(res);
  };

  const drawChart = () => {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    // svg 생성
    const svg = d3
      .select("#time-series")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x축 스케일 생성
    var x = d3
      .scaleTime()
      .domain(d3.extent(data as Data[], (d) => d.date) as [Date, Date])
      .range([0, width]);

    // x축 스케일 적용
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // y축 스케일 생성
    var y = d3
      .scaleLinear()
      .domain([0, d3.max(data as Data[], (d) => d.value)] as [number, number])
      .range([height, 0]);

    // y축 스케일 적용
    svg.append("g").call(d3.axisLeft(y));

    // 라인 생성
    const line = d3
      .line<Data>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    // 그래프 표현
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line as ValueFn<SVGPathElement, Data[], string>);
  };

  return <div id="time-series" />;
};

export default TimeSeries;
