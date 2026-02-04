import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  // Estado del menú móvil
  const {
    isOpen: isMenuOpen,
    onToggle: toggleMenu,
    onClose: closeMenu,
  } = useDisclosure();

  // Estado del Drawer del carrito
  const {
    isOpen: isCartOpen,
    onOpen: openCart,
    onClose: closeCart,
  } = useDisclosure();

  const { totalItems } = useCart();

  return (
    <Box
      as="nav"
      bg="primary"
      color="light"
      px={{ base: 4, md: 6 }}
      py={4}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex maxW="6xl" mx="auto" justify="space-between" align="center">
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          Lo de Moni
        </Text>

        {/* LINKS DESKTOP */}
        <HStack
          spacing={6}
          fontWeight="medium"
          display={{ base: "none", md: "flex" }}
        >
          <ChakraLink as={Link} to="/" _hover={{ color: "secondary" }}>
            Inicio
          </ChakraLink>
          <ChakraLink as={Link} to="/ofertas" _hover={{ color: "secondary" }}>
            Ofertas
          </ChakraLink>
          <ChakraLink as={Link} to="/productos" _hover={{ color: "secondary" }}>
            Productos
          </ChakraLink>
          <ChakraLink as={Link} to="/contacto" _hover={{ color: "secondary" }}>
            Contacto
          </ChakraLink>

          <Button
            onClick={openCart}
            bg="transparent"
            color="light"
            _hover={{ color: "secondary" }}
          >
            Carrito{" "}
            <Badge ml={1} colorScheme="pink" borderRadius="full">
              {totalItems}
            </Badge>
          </Button>
        </HStack>

        {/* BOTÓN MENÚ MOBILE */}
        <IconButton
          aria-label="Abrir menú"
          icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={toggleMenu}
          bg="transparent"
          color="light"
          _hover={{ bg: "secondary" }}
        />
      </Flex>

      {/* MENÚ MOBILE */}
      <Collapse in={isMenuOpen} animateOpacity>
        <Box bg="primary" px={4} pt={4} pb={6} display={{ md: "none" }}>
          <VStack spacing={4} align="start" fontWeight="medium">
            <ChakraLink as={Link} to="/" onClick={closeMenu}>
              Inicio
            </ChakraLink>
            <ChakraLink as={Link} to="/ofertas" onClick={closeMenu}>
              Ofertas
            </ChakraLink>
            <ChakraLink as={Link} to="/productos" onClick={closeMenu}>
              Productos
            </ChakraLink>
            <ChakraLink as={Link} to="/contacto" onClick={closeMenu}>
              Contacto
            </ChakraLink>

            <Button
              onClick={() => {
                closeMenu();
                openCart();
              }}
              bg="transparent"
              color="light"
              _hover={{ color: "secondary" }}
            >
              Carrito ({totalItems})
            </Button>
          </VStack>
        </Box>
      </Collapse>

      {/* DRAWER DEL CARRITO */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </Box>
  );
}
