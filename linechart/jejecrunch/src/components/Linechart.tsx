import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { LineChartData } from '../types/interface';

interface LineChartProps {
	height: number;
	values: LineChartData[];
}

function LineChart(props: LineChartProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const [graphHeight, setGraphHeight] = useState(0);

	useEffect(() => {
		const currentElement = divRef.current;

		// dimensions
		const margin = { top: 10, right: 30, bottom: 30, left: 60 };
		setGraphHeight(props.height);

		const width = 600;
		const height = graphHeight - margin.top - margin.bottom;

		// graph
		const createGraph = async () => {
			// setting init
			const documentElement = d3
				.select(currentElement)
				.call((g) => g.select('svg').remove())
				.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', `translate(${margin.left},${margin.top})`);

			// read and set data
			const parseDate: any = d3.timeParse('%Y-%m-%d');

			const data = props.values.map(({ d, v }) => ({
				date: parseDate(d),
				value: v,
			}));

			// setting axios
			const d3Type: Function = d3
				.line()
				.x((value: any) => x(value.date))
				.y((value: any) => y(value.value));
			// x
			const xDomain = d3.extent(data, (d) => d.date) as unknown as [number, number];
			const x = d3
				.scaleUtc()
				.domain(xDomain)
				.range([margin.left, width - margin.right]);
			// y
			const yMax = d3.max(data, (d) => d.value) as unknown as number;
			const y = d3
				.scaleLinear()
				.domain([0, yMax])
				.nice()
				.range([height - margin.bottom, margin.top]);

			const xAxis = (g: any) =>
				g.attr('transform', `translate(0,${height - margin.bottom})`).call(
					d3
						.axisBottom(x)
						.ticks(width / 80)
						.tickSizeOuter(0)
				);

			documentElement.append<SVGGElement>('g').call(xAxis);

			const yAxis: any = (g: any) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

			documentElement
				.append<SVGGElement>('g')
				.call(yAxis)
				.call((g) => g.select('.domain').remove());

			// draw line
			documentElement
				.append('path')
				.datum(data)
				.attr('fill', 'none')
				.attr('stroke', '#a3a345')
				.attr('stroke-width', 1.5)
				.attr('stroke-linejoin', 'round')
				.attr('stroke-linecap', 'round')
				.attr('d', (data) => d3Type(data));
		};

		createGraph();
	}, [props.values, graphHeight, props]);

	return (
		<>
			<h3> Line Chart #1</h3>
			<div
				ref={divRef}
				style={{
					width: '100%',
					height: graphHeight,
				}}
			/>
		</>
	);
}

export default LineChart;
