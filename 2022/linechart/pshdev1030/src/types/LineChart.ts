import { Line, ScaleLinear, ScaleTime } from "d3";
import { DataTypes } from "./datas";

export interface ChartAreaPropsType {
  dateArray: Date[];
  tempArray: number[];
  lineGenerator: Line<[number, number]> | undefined;
}

interface MarginType {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface LineChartPropsType {
  margin?: MarginType;
  datas: DataTypes[];
}

export interface ContainerInfo {
  width: number | undefined;
  height: number | undefined;
}

export interface XAxisPropsType {
  margin?: MarginType;
  containerInfo: ContainerInfo;
  xScale: ScaleTime<number, number, never> | undefined;
  tickFormat: (date: Date) => string;
  lineColor?: string;
  labelOffset?: number;
}

export interface YAxisPropsType {
  margin?: MarginType;
  containerInfo: ContainerInfo;
  yScale: ScaleLinear<number, number, never> | undefined;
  lineColor?: string;
  labelOffset?: number;
}
