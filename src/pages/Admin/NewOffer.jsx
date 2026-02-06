import OfferForm from "./OfferForm";
import { Box, Heading } from "@chakra-ui/react";

export default function NewOffer() {
  return (
    <Box>
      <Heading fontSize="lg" color="gray.700" mb={4} fontWeight="semibold">
        Nueva oferta
      </Heading>

      <OfferForm offer={null} />
    </Box>
  );
}
