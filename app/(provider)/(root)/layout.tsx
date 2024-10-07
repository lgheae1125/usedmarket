import React, { PropsWithChildren } from "react";
import Header from "./_components/Header";
import LogInModal from "./_components/LogInModal";

function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <LogInModal />
      <Header />
      {children}
    </div>
  );
}

export default layout;
