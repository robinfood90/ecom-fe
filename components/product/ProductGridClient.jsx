"use client";
import { Suspense } from "react";
import ProductGridContent from "./ProductGridContent";
import { Box, Typography } from "@mui/material";

function LoadingFallback() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
      <Typography>Loading filters...</Typography>
    </Box>
  );
}

export default function ProductGridClient({ products }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductGridContent products={products} />
    </Suspense>
  );
}

