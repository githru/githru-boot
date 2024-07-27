"use client";

import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import { getData } from "@/api/api";
import { beaches } from "@/constants/beachname";
import { useEffect, useState } from "react";
import IBeach from "@/interface/beach";
import { useRouter } from "next/navigation";

export default function SearchBeach({ beachNum }) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <label>
        해수욕장을 선택하세요.
        <select
          value={beachNum}
          onChange={(e) => {
            e.preventDefault();
            const num = e.target.value;
            console.log("num", num);
            router.push(`/?num=${num}`);
          }}
        >
          {beaches.map((beach) => (
            <option key={beach.num} value={beach.num}>
              {beach.name}
            </option>
          ))}
        </select>
      </label>
    </main>
  );
}
