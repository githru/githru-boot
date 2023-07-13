import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { lineData } from "./sampleData";

function App() {
    const ref = useRef<SVGSVGElement>(null);
    const width = 300;
    const height = 300;
    const [data, setData] = useState([lineData]);

    const calculateDate = () => {
        const formatTime = d3.timeParse("%Y-%m-%d");
        const date = formatTime(data[0][0].d);
        console.log(date);
    };

    const removeSvg = () => {
        d3.select(ref.current).call((g) => g.select("circle").remove());
    };

    useEffect(() => {
        const currentElement = ref.current;
        const svg = d3.select(currentElement);
        svg.append("circle")
            .attr("r", 5)
            .attr("cx", width / 5)
            .attr("cy", height / 2)
            .attr("fill", "red");
    }, [data]);

    return (
        <>
            <h1> Line Chart </h1>
            <button onClick={calculateDate}>날짜 계산</button>
            <button onClick={removeSvg}>지우기</button>
            <svg
                className="container"
                ref={ref}
                width={width}
                height={height}
            ></svg>
        </>
    );
}

export default App;
