import { hierarchy, HierarchyRectangularNode, partition, select, selectAll } from "d3";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
  const handleClickRect = useCallback(
    (event: any, target: HierarchyRectangularNode<unknown>) => {
      const { x0, x1, y0, y1 } = target;

      part.each((d) => {
        d.x0 = (d.x0 - x0) * (height / (x1 - x0));
        d.x1 = (d.x1 - x0) * (height / (x1 - x0));
        d.y0 = d.y0 - y0;
        d.y1 = d.y1 - y1;
      });

      selectAll(".icicleTreeCells")
        .transition()
        .duration(500)
        .attr("transform", (d: any) => {
          return `translate(${d.y0 * (1 / (target.height + 1))},${d.x0})`;
        });

      selectAll(".icicleTreeRects")
        .transition()
        .duration(500)
        .attr("width", (d) => width / (target.height + 1) - 1.5)
        .attr("height", (d: any) => d.x1 - d.x0 - 1.5);
    },
    [data]
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
      .on("click", handleClickRect);
    cell
      .append("rect")
      .attr("width", (d) => (d.y1 - d.y0 - 5) / root.height)
      .attr("height", (d) => d.x1 - d.x0 - 2)
      .attr("class", "icicleTreeRects")
      .style("fill", (d) => (d.children ? "#36393f" : "#575a5f"))
      .style("cursor", "pointer");
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

  return <svg width={width} height={height} ref={svgRef} />;
};

export default IcicleChart;
