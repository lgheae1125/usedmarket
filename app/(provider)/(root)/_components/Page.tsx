import React, { ReactNode } from "react";

interface pageProps {
  children: ReactNode;
  title: string;
  mx?: string;
}

function Page({ children, title, mx = "mx-96" }: pageProps) {
  return (
    <main className={`p-4 ${mx}`}>
      <h2 className="text-center my-12 text-4xl font-extrabold">{title}</h2>
      {children}
    </main>
  );
}

export default Page;
