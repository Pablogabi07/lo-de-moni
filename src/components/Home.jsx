import { Box, VStack } from "@chakra-ui/react";
import Hero from "./Hero";

export default function Home() {
  return (
    <Box as="main">
      <VStack spacing={16}>
        <Hero />

        {/* Acá después podés agregar: */}
        {/* <FeaturedProducts /> */}
        {/* <OffersSection /> */}
        {/* <Testimonials /> */}
      </VStack>
    </Box>
  );
}
