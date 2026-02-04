import AdminLayout from "../../layout/AdminLayout";
import ProductForm from "../../components/Admin/ProductForm";
import { Box, Heading } from "@chakra-ui/react";

export default function NewProduct() {
  const handleSaved = () => {
    // Después de guardar, ProductForm te redirige al dashboard
    // o podés agregar lógica acá si querés
  };

  return (
    <AdminLayout>
      <Box>
        <Heading
          fontSize="lg"
          color="gray.700"
          mb={4}
          fontWeight="semibold"
        >
          Nuevo producto
        </Heading>

        <ProductForm product={null} onSaved={handleSaved} />
      </Box>
    </AdminLayout>
  );
}
