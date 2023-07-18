export type TimeOfDay = {
  새벽: number;
  아침: number;
  낮: number;
  오전: number;
  오후: number;
  저녁: number;
  밤: number;
};

export type CriminalData = {
  절도: TimeOfDay;
  살인: TimeOfDay;
  강도: TimeOfDay;
};
