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
      <Link className="text-4xl font-black" href="/">
        중고
      </Link>
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
