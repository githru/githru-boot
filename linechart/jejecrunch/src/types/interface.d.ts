export interface Data {
	x: number;
	y1: number;
	y2: number;
	y3: number;
}

export interface InputData {
	date: string | null;
	value: string;
}

export interface Props extends HeightProps {
	values: LineChartData[];
}

export interface HeightProps {
	_height: number;
}

export interface LineChartData {
	d: string;
	v: number;
	y2?: number;
	y3?: number;
}
