import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

function App() {
    const svgRef = useRef(null);

    useEffect(() => {
        const createGraph = async () => {
            const parseTime = d3.timeParse('%Y.%m.%d');
            const data = await d3.csv('./COVID19.csv');
            data.forEach(value => {
                value.date = parseTime(value?.date?.replace(/\s/g, '') as unknown as string) as unknown as string;
                value.value = value.value;
            });
            const margin = { top: 100, right: 20, bottom: 100, left: 70 },
                width = 960 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;
            const svg = d3
                .select(svgRef.current)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            const x = d3
                .scaleTime()
                .domain(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    d3.extent(data, d => d.date),
                )
                .range([0, width]);
            const y = d3
                .scaleLinear()
                .domain(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    d3.extent(data, d => Number(d.value)),
                )
                .range([height, 0]);
            svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
            svg.append('g').call(d3.axisLeft(y));
            const valueLine = d3
                .line()
                .x(d => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return x(d.date);
                })
                .y(d => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return y(d.value);
                });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            svg.append('path').data([data]).attr('class', 'line').attr('fill', 'none').attr('stroke', 'royalblue').attr('stroke-width', 1.5).attr('d', valueLine);
        };

        createGraph();
    }, []);

    return (
        <>
            <h2 style={{ padding: '5rem 0 0 2rem' }}>COVID Line chart</h2>
            <svg ref={svgRef}></svg>
        </>
    );
}

export default App;
