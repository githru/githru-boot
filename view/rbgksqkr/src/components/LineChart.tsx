import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { lineData } from "../sampleData";

const getNewElement = (
    target: HTMLDivElement | null,
    width: number,
    height: number
) => {
    return d3
        .select(target)
        .call((g) => g.select("svg").remove())
        .append("svg")
        .attr("viewBox", `0,0,${width},${height}`);
};

const LineChart = () => {
    const ref = useRef<HTMLDivElement>(null);
    const width = 300;
    const height = 300;
    const [values, setValues] = useState(lineData);

    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const currentElement = ref.current;

        const documentElement = getNewElement(currentElement, width, height);

        const parseDate: any = d3.timeParse("%Y-%m-%d");
        const data = values.map(({ d, v }) => ({
            d: parseDate(d),
            v,
        }));

        const xDomain = d3.extent(data, (data) => data.d) as [number, number];
        const x = d3
            .scaleUtc()
            .domain(xDomain)
            .range([margin.left, width - margin.right]);

        const yMax = d3.max(data, (data) => data.v) as number;
        const y = d3
            .scaleLinear()
            .domain([0, yMax])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = (g: any) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            );
        documentElement.append("g").call(xAxis);

        const yAxis: any = (g: any) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));
        documentElement
            .append<SVGGElement>("g")
            .call(yAxis)
            .call((g) => g.select(".domain").remove());

        const d3Type: Function = d3
            .line()
            .x((value: any) => x(value.d))
            .y((value: any) => y(value.v));

        documentElement
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", (data) => d3Type(data));
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
