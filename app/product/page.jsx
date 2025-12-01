import { Container } from "@mui/material";
import ProductGridClient from "@/components/product/ProductGridClient";

// Mark this route as dynamic since we use searchParams
export const dynamic = 'force-dynamic';

async function getProducts() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const response = await fetch(`${url}/products`, {
      cache: 'no-store', // Force dynamic rendering
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductCatalog() {
  const products = await getProducts();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductGridClient products={products} />
    </Container>
  );
}