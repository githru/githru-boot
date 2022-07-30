import { DSVRowString } from 'd3';

type AppleStockColumnType = 'date' | 'close';

type AppleStockDataType = DSVRowString<AppleStockColumnType>[] & { columns?: AppleStockColumnType[] };

export type { AppleStockDataType, AppleStockColumnType };
