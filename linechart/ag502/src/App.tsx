import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';

import { AppleStockColumnType } from './types';

// @ts-ignore
import AppleStockCSV from './assets/data/appleStock.csv';

const lengthInfo = {}

function App() {
    const [appleStockData, setAppleStockData] = useState<d3.DSVRowArray<AppleStockColumnType> | never[]>([]);

    const fetchAppleStockData = useCallback(async () => {
        try {
            const data: d3.DSVRowArray<AppleStockColumnType> = await d3.csv(AppleStockCSV);
            setAppleStockData(data);
        } catch (error) {
            setAppleStockData([]);
        }
    }, []);

    useEffect(() => {
        fetchAppleStockData();
    }, []);

    return (
        <div className="App">
            <svg />
        </div>
    );
}

export default App;
