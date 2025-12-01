'use client'
import { useState, useEffect } from 'react';
import { Grid, Divider, Box, Typography, Button, FormControl, InputLabel, Input, FormHelperText, Card, CardMedia } from "@mui/material";
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function QuotationForm() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name_buyer: '',
    email: '',
    phone_number: '',
    quantity: '',
    note: ''
  });

  const [errors, setErrors] = useState({
    name_buyer: '',
    email: '',
    phone_number: '',
    quantity: ''
  });

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
  }, [url, id]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name_buyer, email, phone_number, quantity, note } = formData;
    const newErrors = {};

    // Validate all fields
    if (!name_buyer.trim()) {
      newErrors.name_buyer = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Your email address is invalid. Please try again';
    }

    if (!phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (phone_number.length < 10 || !/^\d+$/.test(phone_number.replace(/[\s-]/g, ''))) {
      newErrors.phone_number = 'Phone number must be at least 10 digits';
    }

    if (!quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    // If there are errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
        const response = await axios.post(`${url}/quote-request`, {
            name_buyer,
            email,
            phone_number,
            role: 'customer',
            quantity: Number(quantity),
            note: note || '',
            product: {id:product.id}, // you already fetched this
        });

      alert("Your quote request has been submitted!");

      // Reset form
      setFormData({
        name_buyer: '',
        email: '',
        phone_number: '',
        quantity: '',
        note: ''
      });
      setErrors({
        name_buyer: '',
        email: '',
        phone_number: '',
        quantity: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <Typography>Product not found</Typography>;

  const imageUrl = `${process.env.NEXT_PUBLIC_URL}/${product.image}`;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={5} >
          <Typography variant="h4" sx={{ mb: 3 }}>Item overview</Typography>

          <Card
            key={product.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              mb: 2,
              minWidth: '50vh',
              border: '1px solid #ccc',
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={product.name}
              sx={{
                backgroundColor: '#e0e0e0',
                height: 80,
                width: 120,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                ml: 2,
              }}
            >
              <Typography variant="body1">{product.name}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ${product.price}
              </Typography>
            </Box>
          </Card>

        </Grid>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mb: 1 }}>Request Quote</Typography>
          <Typography sx={{ mb: 3 }}>Fill in your details and we will contact you ASAP!</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl variant="standard" error={!!errors.name_buyer}>
              <InputLabel htmlFor="name-input">Full Name*</InputLabel>
              <Input
                id="name-input"
                value={formData.name_buyer}
                onChange={handleChange('name_buyer')}
              />
              {errors.name_buyer && (
                <FormHelperText sx={{ color: 'red', fontStyle: 'italic' }}>
                  {errors.name_buyer}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" error={!!errors.email}>
              <InputLabel htmlFor="email-input">Email Address*</InputLabel>
              <Input
                id="email-input"
                value={formData.email}
                onChange={handleChange('email')}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'red', fontStyle: 'italic' }}>
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" error={!!errors.phone_number}>
              <InputLabel htmlFor="phone_number-input">Phone Number*</InputLabel>
              <Input
                id="phone_number-input"
                value={formData.phone_number}
                onChange={handleChange('phone_number')}
              />
              {errors.phone_number && (
                <FormHelperText sx={{ color: 'red', fontStyle: 'italic' }}>
                  {errors.phone_number}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard" error={!!errors.quantity}>
              <InputLabel htmlFor="quantity-input">Quantity*</InputLabel>
              <Input
                id="quantity-input"
                type="number"
                value={formData.quantity}
                onChange={handleChange('quantity')}
              />
              {errors.quantity && (
                <FormHelperText sx={{ color: 'red', fontStyle: 'italic' }}>
                  {errors.quantity}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="note-input">Message (Optional)</InputLabel>
              <Input
                id="note-input"
                multiline
                rows={3}
                value={formData.note}
                onChange={handleChange('note')}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              Submit request
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}