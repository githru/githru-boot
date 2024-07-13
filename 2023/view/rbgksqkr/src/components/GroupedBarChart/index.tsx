import { IGroupedData } from "../../types/bar";
import { scaleBand, scaleLinear, select, axisBottom, axisLeft } from "d3";
import { useEffect, useRef } from "react";
import GroupedBars from "./GroupedBars";

interface Props {
    data: IGroupedData[];
}

const GroupedBarChart = ({ data }: Props) => {
    const axisBottomRef = useRef<SVGGElement>(null);
    const axisLeftRef = useRef<SVGGElement>(null);

    const margin = { top: 10, right: 0, bottom: 20, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const values = data.map(({ values }) => values).flat();
    const sublabels = Object.keys(data[0].values);

    // label 사이에 간격 생성
    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .padding(0.2);

    // 같은 label 내의 데이터 사이에 간격 생성
    const subscaleX = scaleBand()
        .domain(sublabels)
        .range([0, scaleX.bandwidth()])
        .padding(0.05);

    const scaleY = scaleLinear()
        .domain([0, Math.max(...values)])
        .range([height, 0]);

    useEffect(() => {
        if (axisBottomRef.current) {
            select(axisBottomRef.current).call(axisBottom(scaleX));
        }

        if (axisLeftRef.current) {
            select(axisLeftRef.current).call(axisLeft(scaleY));
        }
    }, [scaleX, scaleY]);

    return (
        <div>
            <h1>Grouped Bar Chart</h1>
            <svg
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g
                        ref={axisBottomRef}
                        transform={`translate(0, ${height})`}
                    />
                    <g ref={axisLeftRef} />
                    {data.map(({ label, values }, groupIndex) => (
                        <g
                            key={`${groupIndex}`}
                            transform={`translate(${scaleX(label)}, 0)`}
                        >
                            {values.map((value, barIndex) => (
                                <GroupedBars
                                    key={`rect-${barIndex}`}
                                    x={subscaleX(String(barIndex)) || 0}
                                    y={scaleY(value)}
                                    width={subscaleX.bandwidth()}
                                    height={height - scaleY(value)}
                                    color="#A5A5A5"
                                />
                            ))}
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default GroupedBarChart;
