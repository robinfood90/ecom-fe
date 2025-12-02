"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <SearchProvider>{children}</SearchProvider>
    </AuthProvider>
  );
}

