import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      bg="light"
      color="primary"
      py={{ base: 16, md: 24 }}
      px={6}
      textAlign="center"
    >
      <VStack spacing={6} maxW="4xl" mx="auto">
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          lineHeight="1.2"
        >
          Bienvenida al rincón donde encontrás productos varios seleccionados con cariño.
        </Text>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="secondary"
          fontWeight="medium"
        >
          MONI SELECCIONA, VOS DISFRUTÁS
        </Text>

        <HStack spacing={4} pt={2}>
          <Button
            as={Link}
            to="/productos"
            bg="primary"
            color="light"
            size="lg"
            _hover={{ bg: "secondary" }}
          >
            Ver productos
          </Button>

          <Button
            as={Link}
            to="/ofertas"
            bg="secondary"
            color="light"
            size="lg"
            _hover={{ bg: "primary" }}
          >
            Ver ofertas
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
