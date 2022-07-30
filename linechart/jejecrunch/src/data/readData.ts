import * as d3 from 'd3';
import { InputData, URLProps } from '../types/interface';
import lineData from './line';

function parseDate(d: string) {
	return d3.timeParse('%Y-%m-%d')(d);
}

function readTSFileData(): InputData[] {
	const res: InputData[] = lineData.map(({ date, value }) => ({
		date: parseDate(date),
		value,
	}));
	return res;
}

function readCSVurlData({ url }: URLProps): Promise<InputData[]> {
	return d3.csv(url).then((res) =>
		res.map(({ date, value }) => ({
			date: date && parseDate(date),
			value: Number(value),
		}))
	);
}

export { readTSFileData, readCSVurlData };
