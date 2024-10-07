import React, { ReactNode } from "react";

interface pageProps {
  children: ReactNode;
  title: string;
}

function Page({ children, title }: pageProps) {
  return (
    <main className="p-4">
      <h2 className="text-center my-20 text-6xl font-extrabold">{title}</h2>
      {children}
    </main>
  );
}

export default Page;
