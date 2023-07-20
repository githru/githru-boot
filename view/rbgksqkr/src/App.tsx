import BarChart from "./components/BarChart";
import GroupedBarChart from "./components/GroupedBarChart";
import LineChart from "./components/LineChart";
import { barData, groupedBarData } from "./sampleData";

function App() {
    return (
        <>
            <BarChart data={barData} />
            <GroupedBarChart data={groupedBarData} />
        </>
    );
}

export default App;
