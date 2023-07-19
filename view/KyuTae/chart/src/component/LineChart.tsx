import React from "react";
import * as d3 from "d3";
import {SamSung_data} from "../data/StockData"

const LineChart = () =>{
    const width:number = 928;
    const height:number = 500;
    const marginTop:number = 20;
    const marginRight:number = 30;
    const marginBottom:number = 30;
    const marginLeft:number = 40;

    const data = SamSung_data.map(ele=>({
        date:new Date(ele.date),
        price:ele.price
    }))

    const x = d3.scaleTime(d3.extent(data, d => d.data), [marginLeft,width-marginRight])
    const y = d3.scaleLinear([0, d3.max(data, d => d.price)], [height - marginBottom, marginTop]);
    const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.price));


const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));


svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));

svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(data));


    return (
        <div>{svg}</div>
    )
}

export default LineChart;