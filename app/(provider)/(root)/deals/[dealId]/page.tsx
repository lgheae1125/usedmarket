import { supabase } from "@/supabase/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import Page from "../../_components/Page";

async function DealsDetailPage({ params }: { params: Params }) {
  const response = await supabase
    .from("deals")
    .select("*")
    .filter("id", "eq", params.dealId);
  const deals = response.data;
  if (!deals) return;

  const deal = deals[0];
  if (!deal) return;

  return (
    <Page title="상세페이지" mx="mx-20">
      <div className="flex gap-x-20 grid grid-cols-2">
        <div className="bg-slate-500 text-white w-full aspect-square mb-4">
          이미지 입니다.
        </div>
        <ul className="flex flex-col gap-y-10">
          <li>
            <span className="font-semibold text-4xl">{deal.title}</span>
          </li>
          <span className="font-bold text-4xl">가격: {deal.price}원</span>
          <li>
            <span className="font-semibold text-2xl">
              거래 장소: {deal.location}
            </span>
          </li>
        </ul>
      </div>
    </Page>
  );
}

export default DealsDetailPage;
