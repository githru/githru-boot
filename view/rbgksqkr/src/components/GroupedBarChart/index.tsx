import { IGroupedData } from "../../types/bar";
import AxisBottom from "./AxisBottom";
import { scaleBand } from "d3";

interface Props {
    data: IGroupedData[];
}

const GroupedBarChart = ({ data }: Props) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width]);

    return (
        <div>
            <h1>Grouped Bar Chart</h1>
            <svg
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}></g>
                <AxisBottom
                    scale={scaleX}
                    transform={`translate(0, ${height})`}
                />
            </svg>
        </div>
    );
};

export default GroupedBarChart;
