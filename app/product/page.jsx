"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Grid,
  Container,
  Pagination,
  Box,
  Chip,
  Slider,
} from "@mui/material";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const bannerImages = [
  'https://www.egm.com.au/site/images/banner/jquery/gourmet-deli.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/fresh-salads.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/cheese.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/continental-groceries.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/fruit-and-vegetables.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/breads.jpg',
  'https://www.egm.com.au/site/images/banner/jquery/gourmet-yoghurts.jpg'
];

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const url = process.env.NEXT_PUBLIC_API_URL;
  const { searchKeyword } = useSearch();
  const productsPerPage = 10;

  const resetAllFilters = () => {
  setSelectedCategory("All");   // reset category
  setPriceRange([0, 100]);      // reset price filter
  setCurrentPage(1);            // reset pagination
};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${url}/products`);
        setProducts(response.data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchKeyword]);

  // Handle slider change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
  };

  // Filter products by category, price, and search keyword
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    
    let matchesSearch = true;
    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.toLowerCase();
      matchesSearch =
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword);
    }

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const marks = [
    { value: 0, label: "$0" },
    { value: 100, label: "$100" },
  ];

  const categoryCounts = Object.values(
    products.reduce((acc, product) => {
      const cat = product.category;

      if (!acc[cat]) {
        acc[cat] = { category: cat, count: 0 };
      }

      acc[cat].count += 1;

      return acc;
    }, {})
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      {/* Swiper Banner */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Box sx={{ width: "60%" }}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop
            style={{ width: "100%", height: "auto" }}
          >
            {bannerImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`banner ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Left Sidebar */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryQuantity={categoryCounts}
          />

          {/* Right Side */}
          <Box sx={{ flex: 1 }}>
            {/* Top Filter Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={resetAllFilters}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "black",
                    borderColor: "black",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "black",
                    },
                  }}
                >
                  All Products ({products.length})
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "black",
                    borderColor: "black",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "black",
                    },
                  }}
                >
                  Allergens
                </Button>
              </Box>

              {/* Price Filter */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  Filter by price
                </Typography>
                <Box sx={{ width: 250 }}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={100}
                    marks={marks}
                    color="black"
                  />
                </Box>
              </Box>
            </Box>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <Typography variant="h6" align="center" sx={{ mt: 6 }}>
                No products found.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        pt: 2,
                        px: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          backgroundColor: "#e0e0e0",
                          height: 120,
                          width: 200,
                          mx: "auto",
                        }}
                      />
                      <CardContent>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {product.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pt: 1,
                          }}
                        >
                          <Chip label={`$${product.price}`} />
                          <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            href={`/product/${product.id}`}
                            sx={{
                              backgroundColor: "#000",
                              color: "#fff",
                              "&:hover": { backgroundColor: "#333" },
                              textTransform: "none",
                              minWidth: "80px",
                            }}
                          >
                            Order
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}