"use client";

import { beaches } from "@/constants/beachname";
import { useRouter } from "next/navigation";

interface ISearchBeach {
  beachNum: number;
}

export default function SearchBeach({ beachNum }: ISearchBeach) {
  const router = useRouter();
  return (
    <label>
      해수욕장을 선택하세요.
      <select
        value={beachNum}
        onChange={(e) => {
          e.preventDefault();
          const num = e.target.value;
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
  );
}
