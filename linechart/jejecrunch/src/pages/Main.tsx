import React from "react";
import { Link } from "react-router-dom";

export function Main() {
    return (
        <div>
            <p>
                <Link to="/line-chart/1" style={{ color: "white", textDecoration: "none" }}>
                    라인차트 연습 #1
                </Link>
            </p>
            <p>
                <Link to="/line-chart/2" style={{ color: "white", textDecoration: "none" }}>
                    라인차트 연습 #2
                </Link>
            </p>
        </div>
    );
}
