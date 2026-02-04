import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Flex,
  Badge,
} from "@chakra-ui/react";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  const loadOffers = async () => {
    const { data } = await supabase
      .from("offers")
      .select("*, products(*)")
      .eq("active", true)
      .order("created_at", { ascending: false });

    setOffers(data || []);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <Box maxW="6xl" mx="auto" px={4} py={10}>
      <Heading mb={6} color="primary">
        Ofertas
      </Heading>

      {offers.length === 0 && (
        <Text color="gray.500">No hay ofertas activas en este momento.</Text>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {offers.map((o) => (
          <Box
            key={o.id}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            boxShadow="sm"
          >
            <Image
              src={o.products?.images?.[0]}
              alt={o.products?.title}
              borderRadius="md"
              mb={3}
              objectFit="cover"
              w="100%"
              h="180px"
            />

            <Heading fontSize="lg" mb={2}>
              {o.products?.title}
            </Heading>

            <Flex align="center" gap={2} mb={2}>
              <Text fontWeight="bold" color="green.600">
                ${o.price}
              </Text>

              <Text
                fontSize="sm"
                color="gray.500"
                textDecoration="line-through"
              >
                ${o.products?.price}
              </Text>

              <Badge colorScheme="green">-{o.discount}%</Badge>
            </Flex>

            <Text fontSize="sm" color="gray.600">
              {o.products?.category}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
