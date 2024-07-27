import Image from "next/image";
import { getData } from "@/api/api";
import { beaches } from "@/constants/beachname";
import { useState } from "react";
import IBeach from "@/interface/beach";
import { redirect } from "next/navigation";
import SearchBeach from "./Component/SearchBeach";

export default async function Home({ params, searchParams }) {
  const data = await getData({
    beach_num: searchParams?.num || "1",
    numOfRows: 5,
    pageNo: 1,
    dataType: "JSON",
    base_date: "20240727",
    base_time: "1230",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchBeach beachNum={searchParams?.num} />
      {/* BarChart, LineChart */}
    </main>
  );
}
