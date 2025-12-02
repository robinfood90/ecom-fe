"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Grid,
  Pagination,
  Box,
  Chip,
  Slider,
} from "@mui/material";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function ProductGridContent({ products: initialProducts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchKeyword } = useSearch();
  
  const [products] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0', 10),
    parseInt(searchParams.get('maxPrice') || '100', 10)
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );

  const productsPerPage = 10;

  // Update URL when filters change
  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All' || (Array.isArray(value) && value[0] === 0 && value[1] === 100)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set('minPrice', value[0]);
        params.set('maxPrice', value[1]);
      } else {
        params.set(key, value);
      }
    });
    
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  const resetAllFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 100]);
    setCurrentPage(1);
    router.push('/product', { scroll: false });
  };

  // Update page when URL params change
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category') || 'All';
    const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(searchParams.get('maxPrice') || '100', 10);
    
    setCurrentPage(page);
    setSelectedCategory(category);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);

  // Handle slider change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
    updateURL({ minPrice: newValue[0], maxPrice: newValue[1], page: 1 });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({ category: category === 'All' ? null : category, page: 1 });
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
    updateURL({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left Sidebar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
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
    </>
  );
}


