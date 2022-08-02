import React from "react";
import { Chart } from "./Chart";

function App() {
  return (
    <div className="App">
      <Chart>
        <Chart.Graph />
        <Chart.XAxis />
        <Chart.YAxis />
      </Chart>
    </div>
  );
}

export default App;
