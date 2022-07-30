import { atom } from 'recoil';
import { InputData } from '../types/interface';

export interface IDataTypes {
	id: number;
	data: InputData[];
}

export const dataState = atom<IDataTypes>({
	key: 'datas',
});
