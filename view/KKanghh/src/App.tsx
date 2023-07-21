import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import "./App";
import * as d3 from "d3";
import WeatherLine from "./Graph/WeatherLine";

function App() {
  const [showData, setShowData] = useState({ showJeju: false });
  const [jejuData, setJejuData] = useState<{ date: Date; average: number }[]>(
    []
  );
  const width = useMemo(() => 640, []);
  const height = useMemo(() => 400, []);
  const marginTop = useMemo(() => 20, []);
  const marginRight = useMemo(() => 20, []);
  const marginBottom = useMemo(() => 30, []);
  const marginLeft = useMemo(() => 40, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const csv = await d3.csv("/weather.csv", (row) => {
          if (row.date && row.average)
            return { date: new Date(row.date), average: +row.average };
          else return { date: new Date(), average: 0 };
        });
        setJejuData(csv);
      } catch (error) {
        console.log(error);
      }
    };
    void getData();
  }, []);

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { name } = event.target as HTMLButtonElement;
      setShowData((state) => {
        const newState = state;
        let key: keyof typeof newState;
        for (key in newState) {
          newState[key] = false;
        }
        newState[name as keyof typeof newState] = true;
        return newState;
      });
    },
    []
  );

  return (
    <>
      <button className="showJeju" onClick={handleButtonClick}>
        제주
      </button>
      {jejuData && (
        <WeatherLine
          data={jejuData}
          width={width}
          height={height}
          marginTop={marginTop}
          marginRight={marginRight}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
        />
      )}
    </>
  );
}
export default App;
