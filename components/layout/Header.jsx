'use client';
import Navbar from "./Navbar";
import { useSearch } from "@/context/SearchContext"

export default function Header() {
  const { setSearchKeyword } = useSearch();

  const handleInput = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <header id="header">
      <div className="bg-gray-800 text-white text-center py-2 text-sm">
        Free Shipping on orders over $100
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <section className="flex items-center gap-8">
          <img src="/mock_EGM_Logo.png" alt="EGM Mock Logo" width={70} height={70} />
          <Navbar />
        </section>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="border text-black border-gray-300 px-4 py-2 rounded w-64 focus:outline-none"
            type="text"
            placeholder="🔍︎ Search product"
            onChange={handleInput}
          />
        </form>
      </div>
    </header>
  );
}
