"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore, useLogInModalStore } from "@/zustand/store";
import React, { ComponentProps, useRef } from "react";

function LogInModal() {
  const isClickedLogInModalButton = useLogInModalStore(
    (state) => state.isClickedLogInModalButton
  );
  const toggleLogInModal = useLogInModalStore(
    (state) => state.toggleLogInModal
  );
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogInSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    if (!emailRef) return alert("email 입력");
    if (!passwordRef) return alert("password 입력");

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    const LogIn = await supabase.auth.signInWithPassword({ email, password });
    if (!LogIn.data) return alert("로그인 에러");
    const LogInUserId = LogIn.data.user!.id;
    setCurrentUserId(LogInUserId);
    setIsLoggedIn();
    alert("로그인 완료");
    toggleLogInModal();
  };

  const handleClickCancelLogInModal: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) toggleLogInModal();
  };

  return isClickedLogInModalButton ? (
    <div
      onClick={handleClickCancelLogInModal}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 grid place-items-center"
    >
      <form
        onSubmit={handleLogInSubmit}
        className="w-[500px] flex flex-col gap-y-5 bg-white p-10 rounded-xl"
      >
        <h2 className="text-6xl font-black text-center">로그인</h2>
        <input
          type="email"
          placeholder="email"
          className="w-full border border-black p-4 text-xl rounded-sm"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full border border-black p-4 text-xl rounded-sm"
          ref={passwordRef}
        />
        <button
          type="submit"
          className="w-full p-4 bg-black text-white text-xl rounded-sm"
        >
          로그인하기
        </button>
      </form>
    </div>
  ) : null;
}

export default LogInModal;
