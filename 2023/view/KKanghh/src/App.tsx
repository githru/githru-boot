import React, { useEffect, useState, useCallback } from "react";
import "./App";
import * as d3 from "d3";
import { totalData } from "./types/totalData";
import LineGraph from "./Graph/LineGraph";

function App() {
  const [data, setData] = useState<totalData>({
    jejuData: [],
    seoulData: [],
    daejeonData: [],
    gwangjuData: [],
  });

  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const fetchData = useCallback(async () => {
    const jejuData = await d3.csv("/jejuWeather.csv", (row) => {
      if (row.date && row.average)
        return { date: new Date(row.date), average: +row.average };
    });
    const seoulData = await d3.csv("/seoulWeather.csv", (row) => {
      if (row.date && row.average)
        return { date: new Date(row.date), average: +row.average };
    });
    const daejeonData = await d3.csv("/daejeonWeather.csv", (row) => {
      if (row.date && row.average)
        return { date: new Date(row.date), average: +row.average };
    });
    const gwangjuData = await d3.csv("/gwangjuWeather.csv", (row) => {
      if (row.date && row.average)
        return { date: new Date(row.date), average: +row.average };
    });
    setData({ jejuData, seoulData, daejeonData, gwangjuData });
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      {data && (
        <LineGraph
          data={data}
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
