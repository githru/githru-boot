import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { select } from 'd3';

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([5, 20, 25, 30, 40]);

  const increaseData = () => {
    setData(data.map((value) => value + 5));
  };

  const decreaseData = () => {
    setData(data.map((value) => value - 5));
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
          enter => enter.append("circle"),  
          update => update.attr("class", "updated"),
          exit => exit.remove()
      )
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red")
  }, [data])
  return (
    <div className="App">
      <svg ref={svgRef}>
        <circle/>
      </svg>
      <button onClick={increaseData}>+5</button>
      <button onClick={decreaseData}>-5</button>
    </div>
  );
}

export default App;
