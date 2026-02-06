import { Link as ChakraLink, Text } from "@chakra-ui/react";

export default function FloatingWhatsApp() {
  const phone = "5491161910448"; // Cambiar por el de Moni

  return (
    <ChakraLink
      href={`https://wa.me/${phone}`}
      isExternal
      position="fixed"
      bottom={5}
      right={5}
      bg="primary"
      color="light"
      w="56px"
      h="56px"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      _hover={{ bg: "secondary" }}
      transition="0.2s ease"
      zIndex={50}
    >
      <Text fontSize="2xl">💬</Text>
    </ChakraLink>
  );
}
