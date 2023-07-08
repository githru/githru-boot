import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
    return (
        <div>
            <h2>1개의 데이터</h2>
            <p>
                <Link to="/line-chart/1" style={{ color: "white", textDecoration: "none" }}>
                    라인차트 #1
                </Link>
            </p>
            <p>
                <Link to="/line-chart/2" style={{ color: "white", textDecoration: "none" }}>
                    라인차트 #2
                </Link>
            </p>
        </div>
    );
}
