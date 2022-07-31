import React from "react";

const l = 50;
const data = Array.from({ length: l }, (x) => Math.round(Math.random() * 100));

export const useGetChartDatas = () => {
  const tempData = data;

  return tempData;
};

export const ChartDataContext = React.createContext(data);
