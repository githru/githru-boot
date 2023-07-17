import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { lineData } from "../sampleData";
import {
    getNewElement,
    getXAccessor,
    getYAccessor,
    drawPath,
} from "../utils/lineChart";

interface ILineData {
    d: any;
    v: number;
}
const LineChart = () => {
    const ref = useRef<HTMLDivElement>(null);
    const width = 300;
    const height = 300;
    const [values, setValues] = useState<ILineData[]>(lineData);

    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const currentElement = ref.current;
        const documentElement = getNewElement(currentElement, width, height);

        const parseDate: any = d3.timeParse("%Y-%m-%d");
        const data = values.map(({ d, v }) => ({
            d: parseDate(d),
            v,
        }));

        const x = getXAccessor(values, width);
        const y = getYAccessor(values, height);
        const d3Type: Function = d3
            .line()
            .x((value: any) => x(value.d))
            .y((value: any) => y(value.v));

        const getXAxis = (g: any) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            );
        const getYAxis = (g: any) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));

        const xAxis = getXAxis;
        const yAxis = getYAxis;
        documentElement.append("g").call(xAxis);
        documentElement
            .append<SVGGElement>("g")
            .call(yAxis)
            .call((g) => g.select(".domain").remove());

        drawPath(documentElement, data, d3Type);
    }, [values]);

    return (
        <>
            <h1>Line Chart</h1>
            <div
                className="container"
                style={{ width: "70%", height: height }}
                ref={ref}
            ></div>
        </>
    );
};

export default LineChart;
