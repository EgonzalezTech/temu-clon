"use client";

import React from "react";
import { useThemeContext } from "../Contexts/ThemeContext";

const Theme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-1/2 right-0 z-50
        rounded-l-full
        px-4 py-2
        bg-gradient-to-r from-[#FF6F00] via-[#FFA000] to-[#FF8F00]
        text-white
        transform translate-x-10
        hover:translate-x-0
        transition-transform duration-300
        flex items-center gap-2
        select-none
        shadow-lg
      `}
      style={{ userSelect: "none" }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          {/* Sol claro y legible */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-6a1 1 0 100 2h1a1 1 0 100-2h-1zM3 12a1 1 0 100 2h1a1 1 0 100-2H3zm15.364-5.364a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM5.343 16.95a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM16.95 18.657a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5.343 5.343a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <span className="hidden sm:inline-block capitalize">{theme}</span>
        </>
      ) : (
        <>
          {/* Luna modo oscuro */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
          <span className="hidden sm:inline-block capitalize">{theme}</span>
        </>
      )}
    </button>
  );
};

export default Theme;
