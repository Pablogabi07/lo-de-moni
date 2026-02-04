import { Flex, Heading, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Heading fontSize="xl" fontWeight="bold" color="primary">
        Panel de administración
      </Heading>

      <HStack spacing={3}>
        <ChakraLink
          as={Link}
          to="/admin/dashboard"
          fontSize="sm"
          color="primary"
          textDecoration="underline"
          _hover={{ color: "secondary" }}
        >
          Dashboard
        </ChakraLink>

        <ChakraLink
          as={Link}
          to="/"
          fontSize="sm"
          color="gray.500"
          textDecoration="underline"
          _hover={{ color: "secondary" }}
        >
          Ver sitio
        </ChakraLink>
      </HStack>
    </Flex>
  );
}
