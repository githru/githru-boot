import * as d3 from "d3";
import { weatherData } from "../types/weatherData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { totalData } from "../types/totalData";

interface WeatherLineProps {
  data: totalData;
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

const LineGraph = (props: WeatherLineProps) => {
  const {
    data,
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  } = props;
  const [shownData, setShownData] = useState<weatherData[]>([]);
  const [min, max] = useMemo(() => {
    const jejuAverage = data.jejuData.map((d: weatherData) => d.average);
    const seoulAverage = data.seoulData.map((d: weatherData) => d.average);
    const daejeonAverage = data.daejeonData.map((d: weatherData) => d.average);
    return [
      Math.min(...jejuAverage, ...seoulAverage, ...daejeonAverage),
      Math.max(...jejuAverage, ...seoulAverage, ...daejeonAverage),
    ];
  }, [data.jejuData, data.seoulData, data.daejeonData]);

  const x = useMemo(
    () =>
      d3.scaleUtc(
        [new Date("2022-01-01"), new Date("2022-12-31")],
        [marginLeft, width - marginRight]
      ),
    [marginLeft, width, marginRight]
  );

  const y = useMemo(
    () => d3.scaleLinear([min, max], [height - marginBottom, marginTop]),
    [min, max, height, marginBottom, marginTop]
  );

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { name } = event.target as HTMLButtonElement;
      setShownData(data[name as keyof totalData]);
    },
    [data]
  );

  useEffect(() => {
    const svg = d3.select(".svg");
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));

    return () => {
      svg.selectAll("g").remove();
    };
  }, [x, y, height, marginBottom, marginLeft]);

  const line: d3.Line<{ date: Date; average: number }> = d3.line(
    (d: weatherData) => x(d.date),
    (d: weatherData) => y(d.average)
  );

  const d = line(shownData);
  return (
    <>
      <h1>2022년 평균 기온 그래프</h1>
      <svg className="svg" width={width} height={height}>
        {d ? (
          <path fill="none" stroke="currentColor" strokeWidth="1.5" d={d} />
        ) : (
          <h1>데이터를 선택해 주세요</h1>
        )}
      </svg>
      <div>
        <button name="seoulData" onClick={handleButtonClick}>
          서울
        </button>
        <button name="daejeonData" onClick={handleButtonClick}>
          대전
        </button>
        <button name="gwangjuData" onClick={handleButtonClick}>
          광주
        </button>
        <button name="jejuData" onClick={handleButtonClick}>
          제주
        </button>
      </div>
    </>
  );
};

export default LineGraph;
