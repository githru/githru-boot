import React from "react";
import { Data } from "../sampleData";
import { scaleBand } from "d3";
import AxisBottom from "./AxisBottom";

interface BarChartProps {
    data: Data[];
}

const BarChart = ({ data }: BarChartProps) => {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width]);
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
                </g>
            </svg>
        </div>
    );
};

export default BarChart;
