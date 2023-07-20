import React from "react";
import { Data } from "../sampleData";
import { scaleBand, scaleLinear } from "d3";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";

interface BarChartProps {
    data: Data[];
}

const BarChart = ({ data }: BarChartProps) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width]);

    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]);

    return (
        <div>
            <h1>BarChart</h1>
            <svg
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom
                        scale={scaleX}
                        transform={`translate(0, ${height})`}
                    />
                    <AxisLeft scale={scaleY} />
                </g>
            </svg>
        </div>
    );
};

export default BarChart;
