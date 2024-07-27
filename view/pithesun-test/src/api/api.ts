interface IBeachRequestParam {
  numOfRows?: number;
  pageNo?: number;
  dataType?: string;
  base_date: string;
  base_time: string;
  beach_num: string;
}

interface IBeachrResponse {
  numOfRows?: number;
  pageNo?: number;
  dataType?: string;
  base_date: string;
  base_time: string;
  beach_num: string;
  totalCount: number;
  resultCode: string;
  resultMsg: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  ny: number;
  nx: number;
}

export async function getData(params: IBeachRequestParam) {
  console.log(`${process.env.BEACH_API_END_POINT}/getUltraSrtFcstBeach`);
  const url = new URL(
    `${process.env.BEACH_API_END_POINT}/getUltraSrtFcstBeach`
  );

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  searchParams.append("serviceKey", `${process.env.AUTH_DECODING_KEY}`);

  url.search = searchParams.toString();

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("failted to fetch data");
  }

  const { response } = await res.json();

  if (response.header?.resultCode != "00") {
    throw new Error(response.header?.resultMsg);
  }

  return response.body;
}
