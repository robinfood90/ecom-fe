'use client';

import Navbar from "./Navbar";
import SearchBar from "../SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide ENTIRE header on dashboard pages
  const hideHeader = pathname.startsWith("/dashboard");
  if (hideHeader) return null;

  // Show SearchBar ONLY on /product and /product/*
  const showSearch =
    pathname === "/product" || pathname.startsWith("/product/");

  return (
    <header id="header">
      <div className="bg-gray-800 text-white text-center py-2 text-sm">
        Free Shipping on orders over $100
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <section className="flex items-center gap-8">
          <img src="/mock_EGM_Logo.png" width={70} height={70} />

          <Navbar />
        </section>

        {/* SearchBar only on product pages */}
        {showSearch && <SearchBar />}
      </div>
    </header>
  );
}
