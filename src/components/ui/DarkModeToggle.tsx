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
  const applyTheme = useCallback((dark: boolean) => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

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
      className="ml-4 px-5 py-4 sm:px-3 sm:py-2 rounded-md text-lg sm:text-sm font-medium transition-all shadow-md dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-zinc-100 hover:bg-zinc-300"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={handleToggle}
    >
      {/* https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-7 sm:size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
    </button>
  );
}
