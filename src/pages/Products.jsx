import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

import ProductCard from "../components/ProductCard";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);

    // 1) Traer productos
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    // 2) Traer ofertas
    const { data: offersData } = await supabase
      .from("offers")
      .select("*")
      .eq("active", true);

    // 3) Merge productos + ofertas
    const merged =
      productsData?.map((p) => ({
        ...p,
        offer: offersData?.find((o) => o.product_id === p.id) || null,
      })) || [];

    setProducts(merged);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Box maxW="6xl" mx="auto" py={16} px={6}>
      <Heading fontSize="3xl" fontWeight="bold" color="primary" mb={8}>
        Productos
      </Heading>

      {loading && (
        <Text color="gray.500" mb={6}>
          Cargando productos...
        </Text>
      )}

      {!loading && products.length === 0 && (
        <Text color="gray.500">No hay productos cargados.</Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
