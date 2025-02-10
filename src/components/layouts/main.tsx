import React from "react";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="flex-1">
      <div className="container relative">
        <div className="mx-auto py-6 lg:py-8">{children}</div>
      </div>
    </main>
  );
}
