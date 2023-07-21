import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ChartData {
  currency: string;
  values: { date: Date; value: number }[];
}

const App = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [allData, setAllData] = useState<ChartData[]>([]);

  const data = `통화,2022-01-31,2022-02-28,2022-03-31,2022-04-29,2022-05-31,2022-06-30,2022-07-29,2022-08-31,2022-09-30,2022-10-31,2022-11-30,2022-12-30
USD,1202.4,1202.7,1210.8,1269.4,1245.8,1292.9,1304,1347.5,1434.8,1419.3,1331.5,1267.3
JPY,1042.8,1041.52,992.74,970.16,975.61,946.45,970.53,970.65,993.25,961.19,959.54,953.18
EUR,1340.07,1342.09,1351.13,1332.74,1342.29,1350.05,1329.3,1350.26,1408.83,1413.34,1374.31,1351.2
CNH,189.34,190.41,190.02,192.03,186.4,192.75,193.35,194.84,199.66,195.94,184.64,181.44
HKD,154.35,154.03,154.69,161.78,158.73,164.77,166.12,171.68,182.78,180.83,170.48,162.55`;

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
      <h1>2022 통화 그래프 </h1>
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

export default App;
