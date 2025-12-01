
'use client'
import { Typography, Box, Button, Card, CardContent, CardMedia, Grid } from "@mui/material"

export default function HotDealsSection() {
  const deals = [
    {
      badge: "50% OFF",
      title: "Spring Onion",
      desc: "Spring onions are grown by local farmers",
    },
    {
      badge: "BUY 2 GET 1 FREE",
      title: "Snack",
      desc: "Description of snack",
    },
    {
      badge: "40% OFF",
      title: "Carrot",
      desc: "Description",
    },
  ]

  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      {/* Section Heading */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Hot deals today!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Good deals everyday
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {deals.map((item, i) => (
          <Grid item key={i} xs={12} sm={6} md="auto">
            <Card
              sx={{
                width: 260,
                minHeight: 380, 
                borderRadius: 2,
                boxShadow: 3,
                position: 'relative',
                overflow: 'visible',
                textAlign: 'center',
                p: 2,
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -25,
                  left: -25,
                  bgcolor: 'white',
                  border: '1px solid black',
                  borderRadius: '50%',
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {item.badge}
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  component="img"
                  image="https://via.placeholder.com/240x150.png?text=Product+Image"
                  alt={item.title}
                  sx={{
                    height: 150,
                    borderRadius: 2,
                    bgcolor: '#e0e0e0',
                    mb: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Box>

              <Button
                variant="contained"
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  borderRadius: 1,
                  textTransform: 'none',
                  width: '70%',
                  alignSelf: 'center',
                  mb: 1,
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Buy now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
