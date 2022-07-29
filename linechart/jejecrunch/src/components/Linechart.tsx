import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Props } from '../types/interface';
import changeVal from '../util/changeVal';

function LineChart({ _height, values }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const [graphHeight, setGraphHeight] = useState(0);

	useEffect(() => {
		const currentElement = divRef.current;

		// dimensions
		const margin = { top: 10, right: 30, bottom: 30, left: 60 };
		setGraphHeight(_height);

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
			const parseDate = d3.timeParse('%Y-%m-%d');

			const data: { date: Date | null; value: number }[] = values.map(({ d, v }) => ({
				date: parseDate(d),
				value: v,
			}));

			// x
			const xDomain = d3.extent(
				data || [
					{ date: null, value: 0 },
					{ date: null, value: 0 },
				],
				(d) => d.date
			) as unknown as [number, number];
			const x = d3
				.scaleUtc()
				.domain(xDomain)
				.range([margin.left, width - margin.right]);
			// y
			const yMax = d3.max(
				data || [
					{ date: null, value: 0 },
					{ date: null, value: 0 },
				],
				(d) => d.value
			) as unknown as number;
			const y = d3
				.scaleLinear()
				.domain([0, yMax])
				.nice()
				.range([height - margin.bottom, margin.top]);

			const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
				g.attr('transform', `translate(0,${height - margin.bottom})`).call(
					d3
						.axisBottom(x)
						.ticks(width / 80)
						.tickSizeOuter(0)
				);

			documentElement.append<SVGGElement>('g').call(xAxis);

			const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
				g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

			documentElement
				.append<SVGGElement>('g')
				.call(yAxis)
				.call((g) => g.select('.domain').remove());

			// setting axios
			const d3Type = d3
				.line()
				.x((value) => x(value[0]))
				.y((value) => y(value[1]));
			// draw line
			documentElement
				.append('path')
				.datum(data)
				.attr('fill', 'none')
				.attr('stroke', '#a3a345')
				.attr('stroke-width', 1.5)
				.attr('stroke-linejoin', 'round')
				.attr('stroke-linecap', 'round')
				.attr('d', d3Type(changeVal(data)));
		};

		createGraph();
	}, [values, graphHeight, _height]);

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
