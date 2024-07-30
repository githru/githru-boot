import { getData } from "@/api/api";
import SearchBeach from "./Component/SearchBeach";
import LineChart from "./Component/LineChart";

export default async function Home({ params, searchParams }) {
  const data = await getData({
    beach_num: searchParams?.num || "1",
    numOfRows: 6,
    pageNo: 1,
    dataType: "JSON",
    base_date: "20240728",
    base_time: "1430",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchBeach beachNum={searchParams?.num} />
      {/* BarChart, LineChart */}
      <LineChart data={data.items.item} />
    </main>
  );
}
