import { useContext } from "react";
import { ChartDataContext } from "../../Chart/Chart.hook";

export const Graph: React.FC = () => {
  const data = useContext(ChartDataContext);
  return <div>그래프</div>;
};
