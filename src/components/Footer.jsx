import { Box, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="primary"
      color="light"
      py={6}
      mt={16}
      textAlign="center"
    >
      <VStack spacing={1} maxW="6xl" mx="auto">
        <Text fontSize="lg" fontWeight="medium">
          © 2026 Lo de Moni
        </Text>

        <Text fontSize="sm" color="secondary">
          Pablo Design Lab
        </Text>
        <p className="footer-credit">
  Diseñado por <a href="https://pablodesignlab-qkg6.vercel.app/" target="_blank">Pablo Design Lab</a>
</p>
      </VStack>
    </Box>
  );
}
