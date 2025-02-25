"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
import { UserNav } from "@/components/layouts/user-nav";
import Logo from "@/components/ui/logo";
import { AppBreadcrumb } from "./app-breadcrumb";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <Logo width={40} height={40} />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
