"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/store";
import { PropsWithChildren, useEffect } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);
  useEffect(() => {
    // 새로고침시 다시 로그인 상태 확인
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUserId(session.user.id);
        setIsLoggedIn();
      } else {
        setCurrentUserId(null);
        setIsLoggedIn();
      }
    });
  }, []);
  return children;
}

export default ProviderLayout;
