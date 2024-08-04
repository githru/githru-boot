import { getData } from "@/api/api";
import SearchBeach from "./Component/SearchBeach";
import LineChart from "./Component/LineChart";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const data = await getData({
    beach_num: searchParams?.num || "1",
    numOfRows: 6,
    pageNo: 1,
    dataType: "JSON",
    base_date: "20240728", // TODO 현재 날짜 기준으로 변경
    base_time: "1430", // TODO 현재 시간 기준으로 변경
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchBeach beachNum={Number(searchParams?.num) || 1} />
      {/* BarChart, LineChart */}
      <LineChart data={data.items.item} />
    </main>
  );
}
