"use client";

import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const { setSearchKeyword } = useSearch();

  const handleInput = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <input
      className="border text-black border-gray-300 px-4 py-2 rounded w-64 focus:outline-none"
      type="text"
      placeholder="🔍︎ Search product"
      onChange={handleInput}
    />
  );
}
