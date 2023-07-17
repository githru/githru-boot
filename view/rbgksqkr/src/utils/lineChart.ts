import * as d3 from "d3";

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
interface ILineData {
    d: any;
    v: number;
}
export const getNewElement = (
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

export const getXAccessor = (values: ILineData[], width: number) => {
    const parseDate: any = d3.timeParse("%Y-%m-%d");
    const data = values.map(({ d, v }) => ({
        d: parseDate(d),
        v,
    }));
    const xDomain = d3.extent(data, (data) => data.d) as [number, number];
    return d3
        .scaleUtc()
        .domain(xDomain)
        .range([margin.left, width - margin.right]);
};

export const getYAccessor = (data: ILineData[], height: number) => {
    const yMax = d3.max(data, (data) => data.v) as number;
    return d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([height - margin.bottom, margin.top]);
};

export const drawPath = (
    documentElement: any,
    data: ILineData[],
    d3Type: any
) => {
    documentElement
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", (data: ILineData) => d3Type(data));
};
