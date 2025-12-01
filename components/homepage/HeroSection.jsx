
'use client'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',                 // <- ensure full width
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',        // <- left / right
          alignItems: 'center',
          gap: { xs: 2, md: 4 },
          flexWrap: 'nowrap',           // <- never wrap/stack
        }}
      >
        {/* LEFT: Image */}
        <Box sx={{ flex: '0 0 50%', minWidth: 0 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 220, md: 420 },
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <Image
              src="/egm_sign_photo.jpg" // in /public
              alt="EGM logo"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Box>

        {/* RIGHT: Text */}
        <Box sx={{ flex: '1 1 50%', minWidth: 0 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '1.75rem', md: '3rem' }, fontWeight: 700, mb: 2, color: "black" }}
          >
            Welcome to EGM
          </Typography>

          <Typography sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
            We strive to continually deliver top quality freshness at the best possible prices
            with an extensive range of fruit, vegetables, dairy products, groceries, quality
            cheeses, nuts & plenty more!
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            href={`/product`}
            sx={{ textTransform: 'none', px: 4, backgroundColor: 'black' }}
          >
            Shop now
          </Button>
        </Box>
      </Box>


    </Box>
  )
}
