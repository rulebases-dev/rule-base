"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  const update = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty(
        "--spotlight-x",
        `${posRef.current.x}px`,
      );
      spotlightRef.current.style.setProperty(
        "--spotlight-y",
        `${posRef.current.y}px`,
      );
    }
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    function onLeave() {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    }

    function onEnter() {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "1";
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const gradient =
    resolvedTheme === "dark"
      ? "radial-gradient(400px circle at var(--spotlight-x, -999px) var(--spotlight-y, -999px), rgba(139, 92, 246, 0.07), rgba(99, 102, 241, 0.03) 40%, transparent 70%)"
      : "radial-gradient(400px circle at var(--spotlight-x, -999px) var(--spotlight-y, -999px), rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.02) 40%, transparent 70%)";

  return (
    <div
      ref={spotlightRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-0 transition-opacity duration-500"
      style={{ background: gradient }}
    />
  );
}
