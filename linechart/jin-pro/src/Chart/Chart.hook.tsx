import React, { useMemo, useEffect, useRef, useState } from "react";
import { scaleLinear, line, curveCardinal, ScaleLinear, Line } from "d3";

const l = 50;
const data = Array.from({ length: l }, (x) => Math.round(Math.random() * 100));

export const useGetChartDatas = (): ChartDataContextType => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [{ width, height }, setSize] = useState({
    width: 0,
    height: 0,
  });
  const tempData = data;

  const xScale: ScaleLinear<number, number, never> = useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length - 1])
        .range([10, width - 10]),
    [data, width]
  );

  const yScale: ScaleLinear<number, number, never> = useMemo(
    () =>
      scaleLinear()
        .domain([0, Math.max(...data)])
        .range([height - 10, 10]),
    [height, data]
  );

  const lineGenerator: Line<[number, number]> = useMemo(
    () =>
      line()
        .x((d, index) => xScale(index))
        .y((d) => yScale(d[0]))
        .curve(curveCardinal),
    [xScale, yScale]
  );

  useEffect(() => {
    if (!wrapperRef?.current) return;
    const { width, height } = wrapperRef.current?.getBoundingClientRect()!;
    setSize({ width, height });
  }, [wrapperRef]);

  return { svgRef, wrapperRef, xScale, yScale, lineGenerator, tempData };
};

export type ChartDataContextType = {
  svgRef: React.RefObject<SVGSVGElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  lineGenerator: Line<[number, number]>;
  tempData: number[];
};
export const ChartDataContext =
  React.createContext<ChartDataContextType | null>(null);
