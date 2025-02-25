import React from "react";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
