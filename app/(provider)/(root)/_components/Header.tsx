"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore, useLogInModalStore } from "@/zustand/store";
import Link from "next/link";
import React from "react";

function Header() {
  const toggleLogInModal = useLogInModalStore(
    (state) => state.toggleLogInModal
  );
  const handleClickLogInButton = () => {
    toggleLogInModal();
  };
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);

  const handleClickLogOutButton = async () => {
    await supabase.auth.signOut();
    setCurrentUserId(null);
    setIsLoggedIn();
  };

  return (
    <header className="border-b border-black px-8 py-10 flex justify-between items-center">
      {isLoggedIn ? (
        <ul className="flex gap-x-5 items-center">
          <li>
            <Link className="text-2xl font-black mr-12" href="/">
              중고마켓
            </Link>
          </li>
          <li>
            <Link className="text-xl" href="/">
              구입하기
            </Link>
          </li>
          <li>
            <Link className="text-xl" href="/">
              판매하기
            </Link>
          </li>
          <li>
            <Link className="text-xl" href="/deals/create">
              내 판매글
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-x-5 items-center">
          <li>
            <Link className="text-2xl font-black mr-12" href="/">
              중고마켓
            </Link>
          </li>
          <li>
            <button onClick={toggleLogInModal} className="text-xl">
              구입하기
            </button>
          </li>
          <li>
            <button onClick={toggleLogInModal} className="text-xl">
              판매하기
            </button>
          </li>
          <li>
            <button onClick={toggleLogInModal} className="text-xl">
              내 판매글
            </button>
          </li>
        </ul>
      )}
      <div>
        {isLoggedIn ? (
          <ul className="gap-x-5 flex items-center">
            <li>
              <button onClick={handleClickLogOutButton} className="text-xl">
                로그아웃
              </button>
            </li>
          </ul>
        ) : (
          <ul className="gap-x-5 flex items-center">
            <li>
              <Link className="text-xl" href="/auth/sign-up">
                회원가입
              </Link>
            </li>
            <li>
              <button onClick={handleClickLogInButton} className="text-xl">
                로그인
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
