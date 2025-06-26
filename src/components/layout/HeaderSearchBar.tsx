"use client";

import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const HeaderSearchBar = () => {
  const [placeholder, setPlaceholder] = useState("Search...");

  return (
    <div className="relative">
      {/* Icono de búsqueda */}
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input con placeholder animado */}
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        className="w-34 pl-8 pr-2 py-1 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-transparent transition-colors"
      />

      {/* Componente invisible que actualiza el placeholder */}
      <div className="sr-only">
        <TypeAnimation
          sequence={[
            () => setPlaceholder('Search "Shirt"'),
            1000,
            () => setPlaceholder('Search "Full HD"'),
            1000,
            () => setPlaceholder('Search "Jacket"'),
            1000,
            () => setPlaceholder('Search "Pierced"'),
            1000,
            () => setPlaceholder('Search "TV"'),
            1000,
            () => setPlaceholder('Search "Gaming Drive'),
            1000,
            () => setPlaceholder('Search "Backpack"'),
            1000,
            () => setPlaceholder('Search "SSD"'),
            1000,
            () => setPlaceholder('Search "Shirt"'),
            1000,
          ]}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default HeaderSearchBar;
