import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Props } from '../types/interface';
import changeVal from '../util/changeVal';
import parseDate from '../util/parseDate';

export default function LineChart({ _height, type, data, color }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const currentElement = divRef.current;

	// dimensions
	const margin = useMemo(() => ({ top: 10, right: 30, bottom: 30, left: 60 }), []);
	const dimensions = useMemo(
		() => ({
			width: 800,
			height: _height - margin.top - margin.bottom,
		}),
		[_height, margin.top, margin.bottom]
	);

	// create xAxis and yAxis
	const xDomain = d3.extent(data, (d) => (typeof d.date === 'string' ? parseDate(d.date) : d.date)) as unknown as [
		number,
		number
	];
	const x = d3
		.scaleTime()
		.domain(xDomain)
		.range([margin.left, dimensions.width - margin.right]);
	const xAxis = useCallback(
		(g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
			g.attr('transform', `translate(0,${dimensions.height - margin.bottom})`).call(
				d3
					.axisBottom(x)
					.ticks(dimensions.width / 80)
					.tickSizeOuter(0)
			),
		[dimensions.width, dimensions.height, margin.bottom, x]
	);
	const yMax = d3.max(data, (d) => +d.value) as unknown as number;
	const y = d3
		.scaleLinear()
		.domain([0, yMax])
		.nice()
		.range([dimensions.height - margin.bottom, margin.top]);
	const yAxis = useCallback(
		(g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
			g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y)),
		[margin.left, y]
	);

	// draw axis
	const d3Type = useCallback(
		() =>
			d3
				.line()
				.x((value) => x(value[0]))
				.y((value) => y(value[1]))(changeVal(data, { type })),
		[data, type, x, y]
	);

	// graph
	const createGraph = useCallback(async () => {
		// create init
		const documentElement = d3
			.select(currentElement)
			.call((g) => g.select('svg').remove())
			.append('svg')
			.attr('width', dimensions.width + margin.left + margin.right)
			.attr('height', dimensions.height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// draw axis
		documentElement.append<SVGGElement>('g').call(xAxis);
		documentElement
			.append<SVGGElement>('g')
			.call(yAxis)
			.call((g) => g.select('.domain').remove());

		// draw line
		documentElement
			.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', color)
			.attr('stroke-width', 1.5)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('d', d3Type);

		return documentElement;
	}, [currentElement, dimensions, margin, xAxis, yAxis, data, color, d3Type]);

	useEffect(() => {
		createGraph();
	}, [createGraph]);

	return (
		<div
			ref={divRef}
			style={{
				width: '100%',
				height: _height,
			}}
		/>
	);
}
