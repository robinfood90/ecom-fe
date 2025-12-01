"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import HeroSection from "@/components/homepage/HeroSection";
import CategorySection from "@/components/homepage/CategorySection";
import HotDealsSection from "@/components/homepage/HotDealsSection";
import BestSellers from "@/components/BestSellers";

export default function Home() {
  const [message, setMessage] = useState(null);
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url + "/api/hello");
        setMessage(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <HeroSection />

      {/* CATEGORIES */}
      <CategorySection />

      {/* HOT DEALS */}
      <Box sx={{ bgcolor: "#e0e0e0" }}>
        <HotDealsSection />
      </Box>

      {/* BEST SELLERS */}
      <Box sx={{ mt: 4 }}>
        <BestSellers />
      </Box>
    </Box>
  );
}
