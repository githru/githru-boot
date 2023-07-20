import { ScaleBand, ScaleLinear } from "d3";

export interface BarChartProps {
    data: Data[];
}

export interface Data {
    label: string;
    value: number;
}

export interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

export interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

export interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

export interface IGroupedData {
    label: string;
    values: number[];
}
