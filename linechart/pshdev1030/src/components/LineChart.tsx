import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { scaleTime, select } from "d3";
import {
  LineChartPropsType,
  ContainerInfo,
  AxisPropsType,
} from "../types/LineChart";

export const LineChart = ({}: LineChartPropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [containerInfo, setContainerInfo] = useState<ContainerInfo>({
    width: null,
    height: null,
  });

  const xScale = scaleTime().domain([]).range();
  const yScale = scaleTime().domain([]).range();

  useEffect(() => {
    const { width, height } = containerRef.current?.getBoundingClientRect()!;
    const svg = select(svgRef.current);
    svg.attr("width", width).attr("height", height);
    setContainerInfo({ width, height });
  }, []);

  return (
    <div
      css={css`
        height: 100%;
        box-sizing: border-box;
        & > svg {
          display: block;
          margin: auto;
        }
      `}
      ref={containerRef}
    >
      <Legend />
      <svg ref={svgRef}>
        <ChartArea />
        <XAxis containerInfo={containerInfo} />
        <YAxis containerInfo={containerInfo} />
      </svg>
    </div>
  );
};

const Legend = () => {
  return <div>Legend</div>;
};

const ChartArea = () => {
  useEffect(() => {}, []);
  return <g></g>;
};

const XAxis = ({ containerInfo }: AxisPropsType) => {
  const { height } = containerInfo;
  const axisRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!height) return;
    const axis = select(axisRef.current);
    axis.attr("transform", `translate(0,${height})`);
  }, [height]);

  return <g ref={axisRef}></g>;
};

const YAxis = ({ containerInfo }: AxisPropsType) => {
  const { width } = containerInfo;
  const axisRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!width) return;
    const axis = select(axisRef.current);
    axis.attr("transform", `translate(${width},0)`);
  }, [width]);

  return <g ref={axisRef}></g>;
};
