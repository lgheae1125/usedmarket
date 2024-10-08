"use client";
import React, { ComponentProps, useRef } from "react";
import Page from "../../_components/Page";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

function DealsCreatePage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleClickDealsCreateButton: ComponentProps<"form">["onSubmit"] =
    async (e) => {
      e.preventDefault();
      if (!titleRef.current?.value) return alert("제목을 입력해주세요.");
      if (!contentRef.current?.value) return alert("내용을 입력해주세요.");
      if (!locationRef.current?.value)
        return alert("직거래 위치를 입력해주세요.");
      if (!priceRef.current?.value) return alert("판매 가격을 입력해주세요.");

      const title = titleRef.current!.value;
      const content = contentRef.current!.value;
      const location = locationRef.current!.value;
      const price = Number(priceRef.current!.value);

      await supabase.from("deals").upsert({ title, content, location, price });
    };

  return isLoggedIn ? (
    <Page title="판매글 작성하기">
      <form
        onSubmit={handleClickDealsCreateButton}
        className="grid gap-y-5 w-[600px] mx-auto"
      >
        <div className="grid grid-cols-6 gap-x-5 w-full items-center">
          <label className="text-xl font-bold" htmlFor="title">
            글 제목
          </label>
          <input
            className="col-span-5 p-4 border border-gray-300 rounded-sm"
            type="text"
            id="title"
            ref={titleRef}
          />
        </div>
        <div className="grid grid-cols-6 gap-x-5 w-full items-center">
          <label className="text-xl font-bold" htmlFor="content">
            글 내용
          </label>
          <input
            className="col-span-5 p-4 border border-gray-300 rounded-sm h-80"
            type="text"
            id="content"
            ref={contentRef}
          />
        </div>
        <div className="grid grid-cols-6 gap-x-5 w-full items-center">
          <label className="text-xl font-bold" htmlFor="location">
            직거래 위치
          </label>
          <input
            className="col-span-5 p-4 border border-gray-300 rounded-sm"
            type="text"
            id="location"
            ref={locationRef}
          />
        </div>
        <div className="grid grid-cols-6 gap-x-5 w-full items-center">
          <label className="text-xl font-bold" htmlFor="price">
            판매 가격
          </label>
          <input
            className="col-span-5 p-4 border border-gray-300 rounded-sm"
            type="text"
            id="price"
            ref={priceRef}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-sm p-5">
          판매글 작성하기
        </button>
      </form>
    </Page>
  ) : (
    router.push("/")
  );
}

export default DealsCreatePage;
