import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

function App() {
  return (
    <div>
      <h1>2022년 성북구 강수량</h1>
      <LineChart />
      <BarChart />
    </div>
  );
}

export default App;
