"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";
    setTheme(isLight ? "light" : "dark");
    document.documentElement.classList.toggle("light", isLight);
    document.documentElement.classList.toggle("dark", !isLight);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-16 items-center rounded-full border border-line bg-black/20 px-1 transition hover:border-brand/80"
      aria-label="Toggle theme"
      aria-pressed={theme === "light"}
    >
      <span className="sr-only">Switch to {theme === "dark" ? "light" : "dark"} mode</span>
      <span
        className={`h-6 w-6 rounded-full bg-brand transition-transform ${
          theme === "dark" ? "translate-x-0" : "translate-x-8"
        }`}
      />
    </button>
  );
}
