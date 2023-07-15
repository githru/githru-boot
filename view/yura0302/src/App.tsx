// @ts-nocheck
import React, { useRef, useState } from 'react';
import * as d3 from 'd3';

const App = () => {
  const svgRef = useRef();

  const width = 640;
  const height = 400;
  const margin = 20;

  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width])
    .nice();

  const xAxis = d3.axisBottom(x).tickFormat((d) => d3.timeFormat('%b %d')(d));
  svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

  const svg=d3.select

  return (
    <div>
      <div> 왜 안될까</div>
    </div>
  );
};

export default App;
