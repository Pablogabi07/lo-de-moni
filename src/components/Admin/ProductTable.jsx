import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ProductTable({ products, onDelete }) {
  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" bg="white">
      <Table size="sm" minW="full">
        <Thead bg="primary" bgOpacity={0.1}>
          <Tr>
            <Th>Producto</Th>
            <Th>Categoría</Th>
            <Th isNumeric>Precio</Th>
            <Th>Oferta</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>

        <Tbody>
          {products.map((p) => (
            <Tr
              key={p.id}
              borderTopWidth="1px"
              _hover={{ bg: "gray.50" }}
            >
              <Td>
                <Flex align="center" gap={3}>
                  <Image
                    src={p.images?.[0] || "/placeholder.png"}
                    boxSize="40px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text fontWeight="medium">{p.title}</Text>
                </Flex>
              </Td>

              <Td>{p.category || "-"}</Td>

              <Td isNumeric>${Number(p.price).toFixed(2)}</Td>

              <Td>
                {p.offer?.active ? (
                  <Badge colorScheme="green">
                    -{p.offer.discount}%
                  </Badge>
                ) : (
                  <Badge colorScheme="gray">Sin oferta</Badge>
                )}
              </Td>

              <Td>
                <Flex gap={3}>
                  <ChakraLink
                    as={Link}
                    to={`/admin/edit/${p.id}`}
                    fontSize="xs"
                    color="blue.600"
                    textDecoration="underline"
                    _hover={{ color: "secondary" }}
                  >
                    Editar
                  </ChakraLink>

                  <Button
                    variant="link"
                    fontSize="xs"
                    color="red.600"
                    textDecoration="underline"
                    onClick={() => onDelete(p.id)}
                    _hover={{ color: "secondary" }}
                  >
                    Eliminar
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}

          {products.length === 0 && (
            <Tr>
              <Td colSpan={5} textAlign="center" py={4} color="gray.500">
                No hay productos cargados.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
