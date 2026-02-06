import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import AdminLayout from "../../layouts/AdminLayout";
import ProductForm from "../../components/Admin/ProductForm";
import Loader from "../../components/Loader";
import { Box, Heading } from "@chakra-ui/react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      const { data: offerData, error: offerError } = await supabase
        .from("offers")
        .select("*")
        .eq("product_id", id)
        .maybeSingle();

      if (productError) {
        console.error("Error cargando producto:", productError);
        setLoading(false);
        return;
      }

      if (offerError) {
        console.error("Error cargando oferta:", offerError);
      }

      setProduct({
        ...productData,
        offer: offerData || null,
      });

      setLoading(false);
    };

    load();
  }, [id]);

  const handleSaved = () => {
    navigate("/admin/dashboard");
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
          {id ? "Editar producto" : "Nuevo producto"}
        </Heading>

        {loading ? (
          <Loader />
        ) : (
          <ProductForm product={product} onSaved={handleSaved} />
        )}
      </Box>
    </AdminLayout>
  );
}
