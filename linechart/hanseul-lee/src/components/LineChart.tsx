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
  const yScale = d3.scaleLinear().domain([0, 40]).range([height, 0]).nice();
  const yAxis = d3.axisLeft(yScale);
  svg.append('g').call(yAxis);

  // x,y축 그리드
  svg
    .append('g')
    .attr('class', 'grid')
    .call(d3.axisBottom(xScale).tickSize(height).tickFormat(''));
  svg
    .append('g')
    .attr('class', 'grid')
    .call(d3.axisRight(yScale).tickSize(width).tickFormat(''));

  const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.temp))
    .curve(d3.curveBasis);

  // 마우스 움직임에 따라 값 나타내기
  const focusLine = svg
    .append('g')
    .append('rect')
    .attr('width', 1)
    .attr('height', height)
    .style('opacity', 0);
  const focusCircle = svg
    .append('g')
    .append('circle')
    .style('fill', 'steelblue')
    .attr('stroke', 'steelblue')
    .attr('r', 4)
    .style('opacity', 0);
  const focusText = svg.append('g').append('text').style('opacity', 0);

  const handleMouseOver = (): void => {
    focusLine.style('opacity', 1);
    focusCircle.style('opacity', 1);
    focusText.style('opacity', 1);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    const x0 = xScale.invert(d3.pointer(e)[0]);
    const bisect = d3.bisector(d => d.date).left;
    const i = bisect(data, x0, 1);
    if (!data[i]) return;
    const { date: selectedDate, temp: selectedTemp } = data[i];
    const hour = selectedDate.getHours();
    const message = `${Math.round(selectedTemp)}℃ (${hour}:00)`;

    focusCircle
      .attr('cx', xScale(selectedDate))
      .attr('cy', yScale(selectedTemp));
    focusLine.attr('x', xScale(selectedDate));
    focusText
      .html(message)
      .attr('class', 'focusText')
      .attr('x', xScale(selectedDate) - 30)
      .attr('y', yScale(selectedTemp) - 40);
  };

  const handleMouseOut = (): void => {
    focusLine.style('opacity', 0);
    focusCircle.style('opacity', 0);
    focusText.style('opacity', 0);
  };

  svg
    .append('rect')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', handleMouseOver)
    .on('mousemove', handleMouseMove)
    .on('mouseout', handleMouseOut);

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
      <h1 className="title">{title}</h1>
      <h2 className="city">{city}</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
