"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = resolvedTheme === "dark" ? "#17171a" : "#ffffff";
  }, [mounted, resolvedTheme]);

  return null;
}
