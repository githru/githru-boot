import { useContext } from "react";
import { ChartDataContext } from "../../Chart/Chart.hook";

export const XAxis: React.FC = () => {
  const data = useContext(ChartDataContext);
  return <div>X축</div>;
};
