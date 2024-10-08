import React from "react";
import Page from "./_components/Page";
import { supabase } from "@/supabase/client";
import Link from "next/link";

async function HomePage() {
  const response = await supabase.from("deals").select("*");
  const deals = response.data;

  if (!deals) return null;

  return (
    <Page title="전체 판매글">
      <ul className="grid grid-cols-3 gap-x-8 agp-y-10">
        {deals.map((deal) => (
          <li key={deal.id}>
            <Link href={`deals/${deal.id}`}>
              <div className="bg-slate-500 text-white w-full aspect-square mb-4">
                이미지 입니다.
              </div>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <span className="font-semibold text-xl">{deal.title}</span>
                </li>
                <span className="font-bold text-xl">{deal.price}원</span>
                <li>
                  <span className="font-semibold">{deal.location}</span>
                </li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}

export default HomePage;
