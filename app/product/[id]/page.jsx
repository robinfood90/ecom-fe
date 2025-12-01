'use client'
import { useParams } from "next/navigation";
import { Container, Stack, Button, Card, CardMedia, Grid, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${url}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <Typography>Product not found</Typography>;

  const imageUrl = `${process.env.NEXT_PUBLIC_URL}/${product.image}`;

  return (

    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* left image area */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              aspectRatio: { xs: '1/1', md: '1/1', minWidth: '80vh' },
              backgroundColor: '#e0e0e0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'none' // Optional: remove shadow for cleaner look
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={product.name}
              sx={{
                width: '85%', // Increased from 100%
                height: '85%', // Increased from 100%
                objectFit: 'contain',
                maxWidth: '400px', // Optional: set max size
                maxHeight: '400px'
              }}
            />
          </Card>
        </Grid>

        {/* right content area */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h3" sx={{color: "black"}}>{product.name}</Typography>
            <Typography color="text.secondary">Grown in WA (the place of origin)</Typography>
          </Stack>
          <Button sx={{ textDecoration: 'underline', color: 'black' }}>Nutrition Details</Button>
          <Typography>pick tips : </Typography>
          <Typography color="text.secondary">{product.description}</Typography>
          <Typography>Included in below recipes:</Typography>
          <Box sx={{ pt: 10 }}>
            <Typography variant="h4" sx={{ pb: 5 }}>${product.price}</Typography>
            <Button
              type="submit"
              variant="contained"
              size="small"
              component={Link}
              href={`/product/${product.id}/quote-request`}
              sx={{
                mt: 2,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
                textTransform: 'none',
                minWidth: '80px',
                width: '200px', borderRadius: '10px'
              }}
            >
              Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}