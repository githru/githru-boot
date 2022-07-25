import { hierarchy, partition, select, selectAll } from "d3";
import { useEffect, useMemo, useRef } from "react";
import Data from "types/Data";

interface Props {
  width: number;
  height: number;
  data: Data;
}

const IcicleChart = (props: Props) => {
  const { width, height, data } = props;
  const svgRef = useRef(null);
  const root = useMemo(
    () =>
      hierarchy(data)
        .sum((d) => (d.children ? 0 : d.value))
        .sort((a, b) => b.height - a.height),
    [data]
  );
  const part = useMemo(
    () => partition().size([height, (root.height + 1) * width])(root),
    [root, width, height]
  );

  useEffect(() => {
    const svg = select(svgRef.current);
    const blockWidth = width / root.height;
    const cell = svg
      .selectAll("g")
      .data(part.descendants())
      .join("g")
      .attr("class", "icicleTreeCells")
      .attr("transform", (d) => `translate(${d.y0 / root.height - blockWidth},${d.x0})`)
      .attr("id", (d) => d.x0)
      .on("click", (e) => {
        select(e.currentTarget).transition().duration(500).attr("transform", "translate(0, 0)");
      });
    cell
      .append("rect")
      .attr("width", (d) => (d.y1 - d.y0 - 5) / root.height)
      .attr("height", (d) => d.x1 - d.x0 - 2)
      .attr("class", "icicleTreeRects")
      .style("fill", (d) => (d.children ? "#36393f" : "#575a5f"))
      .style("cursor", "pointer")
      .on("click", (e) => {
        select(e.currentTarget).transition().duration(500).attr("height", height);
      });
    cell
      .append("text")
      .attr("class", "icicleTreeTexts")
      .attr("pointer-events", "none")
      .attr("x", 4)
      .attr("y", 13)
      .style("fill", "white")
      .style("font-size", 12)
      .append("tspan")
      .text((d) => {
        const data = d.data as Data;
        return `${data.name}${d.children ? "/ " : " "} ${data.value}`;
      });
  }, [width, height, data]);

  return <svg width={props.width} height={props.height} ref={svgRef} />;
};

export default IcicleChart;
