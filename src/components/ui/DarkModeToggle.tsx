import React, { useEffect, useCallback, useState } from "react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme) return theme === "dark";
      // Default to dark mode if no preference
      return true;
    }
    return true;
  });

  // Apply theme to body
  const applyTheme = useCallback(
    (dark: boolean) => {
      if (typeof document !== "undefined") {
        if (dark) {
          document.body.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
    },
    []
  );

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark, applyTheme]);

  useEffect(() => {
    // On mount, sync with localStorage
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") setIsDark(true);
      else if (theme === "light") setIsDark(false);
    }
  }, []);

  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="ml-4 px-3 py-2 rounded-md text-sm font-medium transition-all bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      aria-label="Toggle dark mode"
      onClick={handleToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline-block align-middle"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.485-4.485l-.707-.707M4.222 4.222l-.707.707"
        />
        <circle
          cx={12}
          cy={12}
          r={5}
          stroke="currentColor"
          strokeWidth={2}
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
}
