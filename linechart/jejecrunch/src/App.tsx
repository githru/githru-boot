import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import OneLineChart from './pages/OneLineChart/OneLineChart';
import Main from './pages/Main';

function App() {
	return (
		<div className="App">
			<div className="App-header" />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/line-chart/1" element={<OneLineChart number={1} />} />
				<Route path="/line-chart/2" element={<OneLineChart number={2} />} />
			</Routes>
		</div>
	);
}

export default App;
