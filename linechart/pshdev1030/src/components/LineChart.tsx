import { useEffect, useMemo, useRef, useState } from "react";
import { css } from "@emotion/react";
import { extent, timeFormat, scaleLinear, scaleTime, select, line } from "d3";
import {
  LineChartPropsType,
  ContainerInfo,
  XAxisPropsType,
  YAxisPropsType,
  ChartAreaPropsType,
} from "../types/LineChart";

const initialMargin = { top: 0, bottom: 0, left: 0, right: 0 };

export const LineChart = ({
  datas,
  margin = initialMargin,
}: LineChartPropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [containerInfo, setContainerInfo] = useState<ContainerInfo>({
    width: undefined,
    height: undefined,
  });

  const { width, height } = containerInfo;

  const tempArray = useMemo(() => datas.map((data) => data.main.temp), [datas]);
  const dateArray = useMemo(
    () => datas.map((data) => new Date(data.dt_txt)),
    [datas]
  );

  const xScale = useMemo(() => {
    if (!width || !height) return;
    const xDomain = extent(dateArray) as Date[];
    return scaleTime()
      .domain(xDomain)
      .range([margin.left, width - margin.right])
      .nice();
  }, [width, height, dateArray]);

  const yScale = useMemo(() => {
    if (!width || !height) return;
    const yDomain = extent(tempArray) as number[];
    return scaleLinear()
      .domain([yDomain[0], yDomain[1]])
      .range([height - margin.top, margin.bottom])
      .nice();
  }, [width, height, tempArray]);

  const tickFormat = timeFormat("%m/%d/%H:%M:%S");

  const lineGenerator =
    xScale &&
    yScale &&
    line()
      // @ts-ignore
      .x((d) => xScale(d.date))
      // @ts-ignore
      .y((d) => yScale(d.temp));

  useEffect(() => {
    const { width: containerWidth, height: containerHeight } =
      containerRef.current?.getBoundingClientRect()!;
    const svg = select(svgRef.current);

    svg.attr("width", containerWidth).attr("height", containerHeight);

    setContainerInfo({
      width: containerWidth - margin.left - margin.right,
      height: containerHeight - margin.top - margin.bottom,
    });
  }, []);

  return (
    <div
      css={css`
        width: 1300px;
        height: 800px;
        box-sizing: border-box;
        & > svg {
          display: block;
          margin: auto;
        }
      `}
      ref={containerRef}
    >
      <svg ref={svgRef}>
        <ChartArea
          tempArray={tempArray}
          dateArray={dateArray}
          lineGenerator={lineGenerator}
        />
        <XAxisBottom
          containerInfo={containerInfo}
          xScale={xScale}
          tickFormat={tickFormat}
          margin={margin}
          labelOffset={20}
        />
        <YAxisLeft
          containerInfo={containerInfo}
          yScale={yScale}
          margin={margin}
          labelOffset={20}
        />
      </svg>
    </div>
  );
};

// const Legend = () => {
//   return <div>Legend</div>;
// };

const ChartArea = ({
  tempArray,
  dateArray,
  lineGenerator,
}: ChartAreaPropsType) => {
  if (!lineGenerator) return null;

  const dataArray = Array.from({ length: tempArray.length }, (_, i) => ({
    temp: tempArray[i],
    date: dateArray[i],
  }));

  return (
    <g>
      <path
        // @ts-ignore
        d={lineGenerator(dataArray)}
        fill="none"
        strokeWidth="2px"
        stroke="black"
      ></path>
    </g>
  );
};

const XAxisBottom = ({
  containerInfo,
  xScale,
  tickFormat,
  lineColor = "grey",
  margin = initialMargin,
  labelOffset = 0,
}: XAxisPropsType) => {
  const { height } = containerInfo;

  if (!height || !xScale) return null;

  return (
    <g>
      {xScale.ticks().map((tickValue) => (
        <g
          css={css`
            text-anchor: middle;
            dominant-baseline: central;
          `}
          key={tickValue.getTime()}
          transform={`translate(${xScale(tickValue)},0)`}
        >
          <line
            y1={margin.bottom}
            y2={height - margin.top}
            stroke={lineColor}
          />
          <text dy={height - margin.bottom + labelOffset}>{`${tickFormat(
            tickValue
          )}`}</text>
        </g>
      ))}
    </g>
  );
};

const YAxisLeft = ({
  containerInfo,
  yScale,
  lineColor = "grey",
  margin = initialMargin,
  labelOffset = 0,
}: YAxisPropsType) => {
  const { width } = containerInfo;

  if (!width || !yScale) return null;

  return (
    <g>
      {yScale.ticks().map((tickValue) => (
        <g
          css={css`
            text-anchor: middle;
            dominant-baseline: central;
          `}
          key={tickValue}
          transform={`translate(0,${yScale(tickValue)})`}
        >
          <line x1={margin.left} x2={width - margin.right} stroke={lineColor} />
          <text dx={margin.left - labelOffset}>{tickValue}</text>
        </g>
      ))}
    </g>
  );
};
