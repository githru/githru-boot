import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

function App() {
    const svgRef = useRef(null);

    useEffect(() => {
        const setData = async () => {
            let parseTime = d3.timeParse('%Y.%m.%d') ?? null;
            let data = await d3.csv('./COVID19.csv');
            data.forEach(value => {
                value.date = parseTime(value?.date?.replace(/\s/g, '') as unknown as string) as unknown as string;
                value.value = value.value;
            });
            let margin = { top: 100, right: 20, bottom: 100, left: 70 },
                width = 960 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;
            let svg = d3
                .select(svgRef.current)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            let x = d3
                .scaleTime()
                .domain(
                    // @ts-ignore
                    d3.extent(data, d => {
                        return d.date;
                    }),
                )
                .range([0, width]);
            let y = d3
                .scaleLinear()
                .domain(
                    // @ts-ignore
                    d3.extent(data, d => Number(d.value)),
                )
                .range([height, 0]);
            svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
            svg.append('g').call(d3.axisLeft(y));
            let valueLine = d3
                .line()
                .x(d => {
                    // @ts-ignore
                    return x(d.date);
                })
                .y(d => {
                    // @ts-ignore
                    return y(d.value);
                });

            // @ts-ignore
            svg.append('path').data([data]).attr('class', 'line').attr('fill', 'none').attr('stroke', 'royalblue').attr('stroke-width', 1.5).attr('d', valueLine);
        };
        setData();
    }, []);

    return (
        <>
            <h2 style={{ padding: '5rem 0 0 2rem' }}>COVLID Line chart</h2>
            <svg ref={svgRef}></svg>
        </>
    );
}

export default App;
