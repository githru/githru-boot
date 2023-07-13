import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

function App() {
    const ref = useRef<SVGSVGElement>(null);
    const width = 300;
    const height = 300;
    const [data, setData] = useState([40, 80, 150, 160, 230, 260]);

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
