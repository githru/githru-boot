import { useContext } from "react";
import { ChartDataContext } from "../../Chart/Chart.hook";

export const YAxis: React.FC = () => {
  const data = useContext(ChartDataContext);
  return <div>Y축</div>;
};
