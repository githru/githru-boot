import React, { useState } from "react";
import * as d3 from "d3";
import data from "../data/line.csv";

export default function LineChart() {
    const [err, setErr] = useState();
    d3.csv(data)
        .then((d) => {
            console.log(d);
        })
        .catch((e) => setErr(e));
    return (
        <>
            <h2>Line chart</h2>
        </>
    );
}
