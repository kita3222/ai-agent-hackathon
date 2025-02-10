"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoSrc =
    theme === "dark" || resolvedTheme === "dark"
      ? "/logo_dark.svg"
      : "/logo_light.svg";

  return <Image src={logoSrc} alt="AiDo Logo" width={48} height={48} />;
}
