import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { HeightProps } from '../types/interface';
import changeVal from '../util/changeVal';

const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv';

function LineChart2({ _height }: HeightProps) {
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
			await d3.csv(url).then((val) => {
				const parseDate = d3.timeParse('%Y-%m-%d');
				const data: { date: Date | null; value: number }[] = val.map(({ date, value }) => ({
					date: date ? parseDate(date) : new Date(),
					value: Number(value),
				}));

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
				// setting axios
				const d3Type = d3
					.line()
					.x((value) => x(value[0]))
					.y((value) => y(value[1]));

				documentElement
					.append<SVGGElement>('g')
					.call(yAxis)
					.call((g) => g.select('.domain').remove());

				// draw line
				documentElement
					.append('path')
					.datum(data)
					.attr('fill', 'none')
					.attr('stroke', '#ff7639')
					.attr('stroke-width', 1.5)
					.attr('stroke-linejoin', 'round')
					.attr('stroke-linecap', 'round')
					.attr('d', d3Type(changeVal(data)));
			});
		};

		createGraph();
	}, [graphHeight, _height]);

	return (
		<>
			<h3> Line Chart #2</h3>
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

export default LineChart2;
