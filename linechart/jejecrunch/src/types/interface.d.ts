export interface Data {
	x: number;
	y1: number;
	y2: number;
	y3: number;
}

export interface InputData {
	date: string;
	value: string;
}

export interface LineChartData {
	d: string;
	v: number;
	y2?: number;
	y3?: number;
}

export interface Iterable<T> {
	[Symbol.iterator](): Iterable<T>;
}
