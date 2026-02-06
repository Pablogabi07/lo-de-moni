import {
  Box,
  Flex,
  VStack,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function AdminLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* SIDEBAR DESKTOP */}
      <Box
        w="240px"
        bg="primary"
        color="light"
        p={6}
        display={{ base: "none", md: "block" }}
      >
        <VStack align="start" spacing={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Admin
          </Text>

          <VStack align="start" spacing={3} fontWeight="medium">
            <ChakraLink as={Link} to="/admin/dashboard" _hover={{ color: "secondary" }}>
              Dashboard
            </ChakraLink>

            <ChakraLink as={Link} to="/admin/new" _hover={{ color: "secondary" }}>
              Nuevo producto
            </ChakraLink>

            <ChakraLink as={Link} to="/admin" _hover={{ color: "secondary" }}>
              Cerrar sesión
            </ChakraLink>
          </VStack>
        </VStack>
      </Box>

      {/* SIDEBAR MOBILE */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary" color="light">
          <DrawerCloseButton />

          <DrawerBody mt={10}>
            <VStack align="start" spacing={4} fontWeight="medium">
              <ChakraLink as={Link} to="/admin/dashboard" onClick={onClose}>
                Dashboard
              </ChakraLink>

              <ChakraLink as={Link} to="/admin/new" onClick={onClose}>
                Nuevo producto
              </ChakraLink>

              <ChakraLink as={Link} to="/admin" onClick={onClose}>
                Cerrar sesión
              </ChakraLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* CONTENIDO */}
      <Flex direction="column" flex="1">
        {/* NAVBAR SUPERIOR */}
        <Flex
          bg="white"
          borderBottomWidth="1px"
          p={4}
          justify="space-between"
          align="center"
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Abrir menú"
          />

          <Text fontWeight="bold" color="primary">
            Panel de administración
          </Text>
        </Flex>

        {/* CONTENIDO SCROLLABLE */}
        <Box p={6} flex="1" overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
