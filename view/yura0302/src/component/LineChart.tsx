import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { data } from '../data/data';

interface ChartData {
  currency: string;
  values: { date: Date; value: number }[];
}

const LineChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [allData, setAllData] = useState<ChartData[]>([]);

  useEffect(() => {
    const parseData = d3.csvParse(data);
    const formatData: ChartData[] = parseData.map((d) => ({
      currency: d.통화,
      values: Object.keys(d)
        .filter((key) => key !== '통화')
        .map((key) => ({ date: new Date(key), value: +d[key] })),
    }));
    setAllData(formatData);
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    const svg = d3.select(svgRef.current);

    // 차트 영역, 여백 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // x축 범위
    const xScale = d3
      .scalePoint<number>()
      .domain(chartData[0]?.values.map((d) => d.date.getMonth() + 1))
      .range([0, width]);

    // y축 범위
    const yScale = d3.scaleLinear().domain([0, 1500]).range([height, 0]);

    // 라인 생성
    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date.getMonth() + 1) as number)
      .y((d) => yScale(d.value));

    // svg 초기화
    svg.selectAll('*').remove();

    // svg 요소 생성
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // x축 그리기
    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(xScale.domain())
          .tickFormat((month) => {
            const monthNames = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];
            return monthNames[month - 1];
          }),
      );

    // y축 그리기
    chart.append('g').call(d3.axisLeft(yScale));

    //라인 그리기
    chart
      .selectAll('.line')
      .data(chartData)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', 'steelblue')
      .attr('d', (d) => line(d.values) as string);
  }, [chartData]);

  const handleButtonClick = (currency: string) => {
    const selectedData = allData.find((d) => d.currency === currency);
    if (selectedData) {
      setChartData([selectedData]);
    }
  };

  const handleAllButtonClick = () => {
    setChartData(allData);
  };

  return (
    <div>
      <h1>2022 통화 라인 그래프 </h1>
      <div>
        <svg ref={svgRef} width={600} height={400} />
        <button onClick={() => handleButtonClick('USD')}>USD</button>
        <button onClick={() => handleButtonClick('JPY')}>JPY</button>
        <button onClick={() => handleButtonClick('EUR')}>EUR</button>
        <button onClick={() => handleButtonClick('CNH')}>CNH</button>
        <button onClick={() => handleButtonClick('HKD')}>HKD</button>
        <button onClick={() => handleAllButtonClick()}>ALL</button>
      </div>
    </div>
  );
};

export default LineChart;
