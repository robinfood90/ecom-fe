'use client'
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material"

export default function CategorySection() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: { xs: 2, md: 4 },
      flexWrap: 'nowrap',
    }}>
      <Card sx={{ flex: 1 }}>
        <CardMedia 
          component="img"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.KgzbMKQ4nR0T0xLxH9piCQHaEo%3Fpid%3DApi&f=1&ipt=63fb5dcbfa16adc810138f112e13720bf1bac5a4a61a4882b5b460716b18a5e0&ipo=images"
          alt="Fruit"
          sx={{
            width: "100%",              
            height: 200,             
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Fruit
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardMedia 
          component="img"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.pS2TLIWb_mTGmHIlbekl_gHaFj%3Fpid%3DApi&f=1&ipt=85249ff5eca3c31ea749196fb7763d5ce62235f799f48d3a637de25131d608ab&ipo=images"
          alt="Vegetables"
          sx={{
            width: "100%",             
            height: 200,             
            objectFit: 'cover',
          }} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Vegetables
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardMedia 
          component="img"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.m0ijeNlu46HV8emcFys1vwHaE7%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=bda6aca38dacfe4caab4ff4759d3f6ee8434ebb318621891ff9d54ebaeff3591&ipo=images"
          alt="Groceries"
          sx={{
            width: "100%",              
            height: 200,             
            objectFit: 'cover',
          }} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Groceries
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}