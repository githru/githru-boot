import React, { useRef, useEffect, useState, useMemo } from "react";
import "./App";
import * as d3 from "d3";
import WeatherLine from "./Graph/WeatherLine";

function App() {
  const [showData, setShowData] = useState({ showJeju: false });
  const [jejuData, setJejuData] = useState<{ date: Date; average: number }[]>(
    []
  );
  const svgRef = useRef(null);
  const width = useMemo(() => 640, []);
  const height = useMemo(() => 400, []);
  const marginTop = useMemo(() => 20, []);
  const marginRight = useMemo(() => 20, []);
  const marginBottom = useMemo(() => 30, []);
  const marginLeft = useMemo(() => 40, []);
  const [x, setX] = useState<d3.ScaleTime<number, number, never> | null>(null);
  const [y, setY] = useState<d3.ScaleLinear<number, number, never> | null>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      const csv = await d3.csv("/weather.csv", (row) => {
        if (row.date && row.average)
          return { date: new Date(row.date), average: +row.average };
        else return { date: new Date(), average: 0 };
      });
      setJejuData(csv);
    };
    getData();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowData((state) => ({ ...state, showJeju: true }))}
      >
        제주
      </button>
      {jejuData && (
        <WeatherLine
          data={jejuData}
          width={width}
          height={height}
          marginTop={marginTop}
          marginRight={marginRight}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
        />
      )}
    </>
  );
}
export default App;
