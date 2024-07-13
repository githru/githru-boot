interface precipitationDataInterface {
  date: string;
  precipitation: number;
}

// 2022.07 ~ 2023.07까지 1년간 서울시 강수량 데이터
export const precipitationData: precipitationDataInterface[] = [
  { date: '2022-07', precipitation: 252.3 },
  { date: '2022-08', precipitation: 564.8 },
  { date: '2022-09', precipitation: 201.5 },
  { date: '2022-10', precipitation: 124.1 },
  { date: '2022-11', precipitation: 84.5 },
  { date: '2022-12', precipitation: 13.6 },
  { date: '2023-01', precipitation: 47.9 },
  { date: '2022-02', precipitation: 1 },
  { date: '2022-03', precipitation: 10.5 },
  { date: '2022-04', precipitation: 96.9 },
  { date: '2022-05', precipitation: 155.6 },
  { date: '2022-06', precipitation: 195.6 },
  { date: '2022-07', precipitation: 375.1 },
];
