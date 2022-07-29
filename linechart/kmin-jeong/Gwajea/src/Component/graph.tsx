import * as d3 from 'd3';
import { useRef, useEffect,useState } from 'react';

const Graph = async () => {
  const data = await d3.csv("./heart.csv");
  
  return <div></div>;
};

export default Graph