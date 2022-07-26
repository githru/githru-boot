import React from "react";
import "./App.css";
import LineChart from "./components/Linechart";
import { lineData } from "./data/line";

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <LineChart height={400} values={lineData} />
            </div>
        </div>
    );
}

export default App;
