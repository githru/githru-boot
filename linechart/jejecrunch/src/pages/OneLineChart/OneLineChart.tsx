import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Id, InputData } from '../../types/interface';
import LineChart from '../../components/LineChart';
import { readCSVurlData, readTSFileData } from '../../data/readData';

function OneLineChart({ number }: Id) {
	const [data, setData] = useState<InputData[]>([]);
	const [url] = useState<string>(
		'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
	);
	const [type, setType] = useState<'ts_file' | 'csv_file' | 'csv_url' | 'json_url' | 'json_file'>('ts_file');
	const [color, setColor] = useState<string>('#ffffff');

	// read and set data
	const read = useCallback(() => {
		if (number === 1) {
			setData(readTSFileData());
			setType('ts_file');
			setColor('#a76511');
		} else if (number === 2) {
			readCSVurlData({ url }).then((v) => setData(v));
			setType('csv_url');
			setColor('#029711');
		}
	}, [number, url]);

	useEffect(() => read(), [read]);

	return (
		<>
			<h3>#{number}</h3>
			<LineChart _height={400} type={type} data={data} color={color} />
			<Link to="/" style={{ textDecoration: 'none' }}>
				<span style={{ fontSize: '0.5em', color: 'white' }}>메인으로</span>
			</Link>
		</>
	);
}

export default OneLineChart;
