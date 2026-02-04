import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeOne, removeFromCart, total, sendToWhatsApp } = useCart();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tu carrito</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {items.map((item) => (
              <HStack key={item.id} spacing={4}>
                <Image
                  src={item.image}
                  boxSize="60px"
                  objectFit="cover"
                  rounded="md"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{item.title}</Text>
                  <Text>${item.price}</Text>
                  <Text fontSize="sm">Cantidad: {item.quantity}</Text>
                </VStack>

                <Button size="xs" colorScheme="red" onClick={() => removeOne(item.id)}>
                  -
                </Button>
                <Button size="xs" colorScheme="red" onClick={() => removeFromCart(item.id)}>
                  x
                </Button>
              </HStack>
            ))}

            {items.length === 0 && (
              <Text color="gray.500">Tu carrito está vacío.</Text>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter flexDirection="column" gap={3}>
          <Text fontWeight="bold" fontSize="lg">
            Total: ${total.toFixed(2)}
          </Text>

          <Button
            w="full"
            bg="primary"
            color="light"
            _hover={{ bg: "secondary" }}
            onClick={sendToWhatsApp}
            isDisabled={items.length === 0}
          >
            Enviar pedido por WhatsApp
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
