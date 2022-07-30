import IcicleChart from "components/IcicleChart";
import data from "data/exam1";
import React from "react";

function App() {
  return (
    <div className="App">
      <IcicleChart data={data} width={500} height={500} />
    </div>
  );
}

export default App;
