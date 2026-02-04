import { useCart } from "../context/CartContext";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Flex,
} from "@chakra-ui/react";

export default function Cart() {
  const {
    items,
    addToCart,
    removeOne,
    removeFromCart,
    clearCart,
    total,
    sendToWhatsApp,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <Box maxW="2xl" mx="auto" py={4}>
      <Heading fontSize="2xl" color="primary" mb={4}>
        Carrito
      </Heading>

      {isEmpty ? (
        <Text fontSize="sm" color="gray.500">
          Tu carrito está vacío.
        </Text>
      ) : (
        <VStack spacing={3} align="stretch">
          {items.map((item) => (
            <Flex
              key={item.id}
              justify="space-between"
              align="center"
              bg="white"
              borderWidth="1px"
              rounded="lg"
              px={3}
              py={2}
            >
              <Box>
                <Text fontWeight="medium">{item.title}</Text>
                <Text fontSize="xs" color="gray.500">
                  ${Number(item.price).toFixed(2)} c/u
                </Text>
              </Box>

              <HStack spacing={3}>
                <Button
                  size="xs"
                  bg="gray.200"
                  onClick={() => removeOne(item.id)}
                >
                  -
                </Button>

                <Text>{item.quantity}</Text>

                <Button
                  size="xs"
                  bg="gray.200"
                  onClick={() => addToCart(item)}
                >
                  +
                </Button>

                <Button
                  size="xs"
                  variant="link"
                  color="red.500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </Button>
              </HStack>
            </Flex>
          ))}

          <Divider mt={4} />

          <Flex justify="space-between" align="center">
            <Text fontWeight="semibold">Total:</Text>
            <Text fontSize="lg" fontWeight="bold" color="secondary">
              ${total.toFixed(2)}
            </Text>
          </Flex>

          <Flex justify="space-between" gap={3} mt={2}>
            <Button
              variant="link"
              color="red.500"
              fontSize="sm"
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>

            <Button
              bg="green.500"
              color="white"
              px={4}
              py={2}
              rounded="lg"
              fontSize="sm"
              _hover={{ bg: "green.600" }}
              onClick={sendToWhatsApp}
            >
              Enviar pedido por WhatsApp
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
}
