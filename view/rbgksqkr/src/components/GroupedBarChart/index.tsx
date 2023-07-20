import { IGroupedData } from "../../types/bar";

interface Props {
    data: IGroupedData[];
}

const GroupedBarChart = ({ data }: Props) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    return (
        <div>
            <h1>Grouped Bar Chart</h1>
            <svg
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}></g>
            </svg>
        </div>
    );
};

export default GroupedBarChart;
