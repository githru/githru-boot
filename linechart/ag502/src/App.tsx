import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';

import { AppleStockDataType, AppleStockColumnType } from './types';

// @ts-ignore
import AppleStockCSV from './assets/data/appleStock.csv';

function App() {
    const [appleStockData, setAppleStockData] = useState<AppleStockDataType>([]);
    const [xValues, setXValues] = useState<Date[]>([]);
    const [yValues, setYValues] = useState<number[]>([]);

    const fetchAppleStockData = useCallback(async () => {
        try {
            const data: d3.DSVParsedArray<AppleStockColumnType> = await d3.csv(
                AppleStockCSV,
                (row: d3.DSVRowString<keyof AppleStockColumnType>) => ({
                    date: new Date(row.date ? row.date : ''),
                    close: Number(row.close),
                }),
            );
            setAppleStockData(data);
        } catch (error) {
            setAppleStockData([]);
        }
    }, []);

    useEffect(() => {
        fetchAppleStockData();
    }, []);

    useEffect(() => {
        if (appleStockData.columns) {
            const [xAxis, yAxis] = appleStockData.columns;
            setXValues(d3.map(appleStockData, (x) => x[xAxis] as Date));
            setYValues(d3.map(appleStockData, (y) => y[yAxis] as number));
        }
    }, [appleStockData]);

    return (
        <div className="App">
            <svg>
                <path />
            </svg>
        </div>
    );
}

export default App;
