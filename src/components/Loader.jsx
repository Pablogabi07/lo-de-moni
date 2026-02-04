import { Flex, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex w="full" justify="center" py={10}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="secondary"
        size="xl"
      />
    </Flex>
  );
}
