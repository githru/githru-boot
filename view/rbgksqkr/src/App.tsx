import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { barData } from "./sampleData";

function App() {
    return (
        <>
            <BarChart data={barData} />
        </>
    );
}

export default App;
