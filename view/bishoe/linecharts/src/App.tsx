import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import ObjectData from "./datafile.json";
import { CriminalData } from "./data/data";

function App() {
  const [data, setData] = useState<CriminalData>(ObjectData);
  console.log("data", data);
  return <>hi</>;
}

export default App;
