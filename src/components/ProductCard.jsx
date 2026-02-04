import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    id,
    title,
    price,
    images,
    offer,
    category,
  } = product;

  const image = images?.[0] || "/placeholder.png";

  const hasOffer = offer?.active;

  const finalPrice = hasOffer ? offer.price : price;

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      rounded="xl"
      shadow="sm"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="0.2s ease"
      p={4}
    >
      <Image
        src={image}
        alt={title}
        w="full"
        h="56"
        objectFit="cover"
        rounded="md"
        mb={4}
      />

      <VStack align="start" spacing={1}>
        <Text fontSize="lg" fontWeight="semibold" color="primary">
          {title}
        </Text>

        {hasOffer ? (
          <Flex align="center" gap={2}>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              ${finalPrice}
            </Text>

            <Text
              fontSize="sm"
              color="gray.500"
              textDecoration="line-through"
            >
              ${price}
            </Text>

            <Badge colorScheme="green">-{offer.discount}%</Badge>
          </Flex>
        ) : (
          <Text fontSize="xl" fontWeight="bold" color="secondary">
            ${price}
          </Text>
        )}

        <Text fontSize="sm" color="gray.600">
          {category}
        </Text>
      </VStack>

      <Button
        mt={4}
        w="full"
        bg="primary"
        color="light"
        py={2}
        rounded="lg"
        _hover={{ bg: "secondary" }}
        onClick={() =>
          addToCart({
            id,
            title,
            price: finalPrice,
            image,
          })
        }
      >
        Agregar al carrito
      </Button>
    </Box>
  );
}
