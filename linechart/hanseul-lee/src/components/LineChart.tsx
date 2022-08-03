// @ts-nocheck
import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const csvURL =
    'https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv';
  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  const city = 'San Francisco';
  const title = '🌞🌈💧🌂⛅Weekly Weather (03.21 ~ 03.28)';

  const svgRef = useRef();

  const [data, setData] = useState([]);

  const svg = d3
    .select(svgRef.current)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // x축
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width])
    .nice();
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d => d3.timeFormat('%a %d')(d));
  svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

  // y축
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.temp)])
    .range([height, 0])
    .nice();
  const yAxis = d3.axisLeft(yScale);
  svg.append('g').call(yAxis);

  // x,y축 그리드
  svg
    .append('g')
    .attr('class', 'grid')
    .style('color', 'gray')
    .call(d3.axisBottom(xScale).tickSize(height).tickFormat(''));
  svg
    .append('g')
    .attr('class', 'grid')
    .style('color', 'gray')
    .call(d3.axisRight(yScale).tickSize(width).tickFormat(''));

  const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.temp))
    .curve(d3.curveBasis);

  svg
    .datum(data)
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);

  useEffect(() => {
    d3.csv(csvURL, d => ({
      city: d.city,
      date: new Date(d.timestamp),
      temp: +d.temperature,
    })).then(data => {
      const cityData = data.filter(d => d.city === city);
      setData(cityData);
    });
  }, []);

  return (
    <div>
      <h4 className="title">{title}</h4>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
