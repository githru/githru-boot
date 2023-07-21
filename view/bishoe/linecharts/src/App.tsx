import * as d3 from "d3";
import LineChart from "./components/LineChart";
function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        gap: "20px",
        justifyContent: "center",
        marginTop: "50px",
        marginLeft: "50px",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "black",
          padding: "2px",
          borderRadius: "20px",
        }}
      >
        2010년 시간대별 범죄
      </h1>
      <LineChart />
    </div>
  );
}

export default App;
