import { ReactNode } from "react";
import { Graph, XAxis, YAxis } from "../Component";
import { ChartDataContext, useGetChartDatas } from "./Chart.hook";

type Props = {
  Graph: React.FC;
  XAxis: React.FC;
  YAxis: React.FC;
} & React.FC<{ children: ReactNode }>;

export const Chart: Props = ({ children }) => {
  const value = useGetChartDatas();
  const { wrapperRef, svgRef } = value;
  return (
    <ChartDataContext.Provider value={value}>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>{children}</svg>
      </div>
    </ChartDataContext.Provider>
  );
};

Chart.Graph = Graph;
Chart.XAxis = XAxis;
Chart.YAxis = YAxis;
