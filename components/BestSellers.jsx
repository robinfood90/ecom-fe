'use client';

import "swiper/css";
import "swiper/css/navigation";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Grid,
  Chip,
  CardContent,
} from "@mui/material";

export default function BestSellers() {
  return (
    <Grid
      container
      spacing={4}
      alignItems="flex-start"
      sx={{ px: { xs: 2, md: 8 }, py: 6, bgcolor: "#e9f7d4" }}
    >
      {/* LEFT: Title + Description */}
      <Grid item xs={12} md={4}>
        <Typography variant="h3" fontWeight={700} gutterBottom sx={{color: "black"}}>
          Try our bestsellers!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bestseller products of this month
        </Typography>
      </Grid>

      {/* RIGHT: Product Cards */}
      <Grid
        item
        xs={12}
        md={8}
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Card
            sx={{
              width: "100%",
              minHeight: 350,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              p: 2,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              sx={{ height: 150, borderRadius: 1 }}
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.9i_M5Eho7Y78ACytBl6v2gHaHa%3Fpid%3DApi&f=1&ipt=8785f8c8a352753d944f352c5f0a5f893424e5b3bad5f37070e15a29b5e80d8e&ipo=images"
              title="French Bread"
            />
            <Box>
              <Chip label="$9" />
              <CardContent sx={{ flexGrow: 1, p: 0 }}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  French bread
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Crispy and golden-color
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card
            sx={{
              width: "100%",
              minHeight: 350,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              p: 2,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              sx={{ height: 150, borderRadius: 1 }}
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP._1P6d5ZnWzY5PN0tnJLaFgHaE8%3Fpid%3DApi&f=1&ipt=1feb0c001258dee6098d8e303f574fa5831b5d34717069e492d2b0fb288a33c6&ipo=images"
              title="Almond Nuts"
            />
            <Box>
              <Chip label="$9" />
              <CardContent sx={{ flexGrow: 1, p: 0 }}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Almond Nuts
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Nutrition-rich
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
