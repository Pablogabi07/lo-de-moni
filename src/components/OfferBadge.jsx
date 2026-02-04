import { Box, Text } from "@chakra-ui/react";

export default function OfferBadge({ discount }) {
  if (!discount || Number(discount) <= 0) return null;

  return (
    <Box
      position="absolute"
      top={2}
      left={2}
      bg="secondary"
      color="white"
      px={2}
      py={1}
      borderRadius="full"
      boxShadow="md"
      fontSize="xs"
      fontWeight="bold"
    >
      -{discount}%
    </Box>
  );
}
