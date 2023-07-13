import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { lineData } from "./sampleData";

function App() {
    const ref = useRef<HTMLDivElement>(null);
    const width = 300;
    const height = 300;
    const [data, setData] = useState(lineData);

    const parseDate = (date: string) => {
        const formatTime = d3.timeParse("%Y-%m-%d");
        return formatTime(date);
    };

    const removeSvg = () => {
        d3.select(ref.current).call((g) => g.select("circle").remove());
    };

    useEffect(() => {
        const currentElement = ref.current;
        const svg = d3.select(currentElement);
        svg.append("svg")
            .append("circle")
            .attr("r", 5)
            .attr("cx", 30)
            .attr("cy", 50)
            .attr("fill", "red");
    }, [data]);

    return (
        <>
            <h1> Line Chart </h1>
            <button onClick={removeSvg}>지우기</button>
            <div
                className="container"
                style={{ width: width, height: height }}
                ref={ref}
            ></div>
        </>
    );
}

export default App;
