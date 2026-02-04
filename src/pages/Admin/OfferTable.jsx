import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function OfferTable({ offers, onDelete }) {
  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" bg="white">
      <Table size="sm" minW="full">
        <Thead bg="primary" bgOpacity={0.1}>
          <Tr>
            <Th>Producto</Th>
            <Th isNumeric>Precio original</Th>
            <Th isNumeric>Precio oferta</Th>
            <Th isNumeric>Descuento</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>

        <Tbody>
          {offers.map((o) => (
            <Tr key={o.id} borderTopWidth="1px" _hover={{ bg: "gray.50" }}>
              <Td>
                <Text fontWeight="medium">{o.products?.title}</Text>
              </Td>

              <Td isNumeric>${Number(o.products?.price).toFixed(2)}</Td>

              <Td isNumeric>${Number(o.price).toFixed(2)}</Td>

              <Td isNumeric>
                <Badge colorScheme="green">-{o.discount}%</Badge>
              </Td>

              <Td>
                {o.active ? (
                  <Badge colorScheme="green">Activa</Badge>
                ) : (
                  <Badge colorScheme="gray">Inactiva</Badge>
                )}
              </Td>

              <Td>
                <Flex gap={3}>
                  <Button
                    as={Link}
                    to={`/admin/offers/edit/${o.id}`}
                    variant="link"
                    fontSize="xs"
                    color="blue.600"
                    textDecoration="underline"
                  >
                    Editar
                  </Button>

                  <Button
                    variant="link"
                    fontSize="xs"
                    color="red.600"
                    textDecoration="underline"
                    onClick={() => onDelete(o.id)}
                  >
                    Eliminar
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}

          {offers.length === 0 && (
            <Tr>
              <Td colSpan={6} textAlign="center" py={4} color="gray.500">
                No hay ofertas cargadas.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
