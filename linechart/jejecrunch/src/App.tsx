import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LineChart2 from "./components/LineChart2";
import LineChart from "./components/Linechart";
import { lineData } from "./data/line";
import { Main } from "./pages/Main";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <div className="App">
                    <div className="App-header"></div>

                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/line-chart/1"
                            element={<LineChart height={400} values={lineData} />}
                        />
                        <Route path="/line-chart/2" element={<LineChart2 height={400} />} />
                    </Routes>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;
