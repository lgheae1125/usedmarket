"use client";
import React, { ComponentProps, useRef } from "react";
import Page from "../../_components/Page";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSignUpSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    if (!emailRef) return alert("email 입력");
    if (!passwordRef) return alert("password 입력");
    if (!confirmPasswordRef) return alert("confirm password 입력");

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const confirmPassword = confirmPasswordRef.current!.value;

    if (password !== confirmPassword) return alert("password가 맞지 않습니다.");
    const signUp = await supabase.auth.signUp({ email, password });
    console.log(signUp);
    alert("회원가입 완료");
    router.push("/");
  };

  return (
    <Page title="회원가입">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-[500px] mx-auto flex flex-col gap-y-5"
      >
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
        <input
          type="password"
          placeholder="confirm password"
          className="w-full border border-black p-4 text-xl rounded-sm"
          ref={confirmPasswordRef}
        />
        <button
          type="submit"
          className="w-full p-4 bg-black text-white text-xl rounded-sm"
        >
          회원가입하기
        </button>
      </form>
    </Page>
  );
}

export default SignUpPage;
