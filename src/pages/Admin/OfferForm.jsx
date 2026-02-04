import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OfferForm({ offer }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(offer?.product_id || "");
  const [price, setPrice] = useState(offer?.price || "");
  const [discount, setDiscount] = useState(offer?.discount || "");
  const [active, setActive] = useState(offer?.active ?? true);

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("title", { ascending: true });

    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product_id: productId,
      price: Number(price),
      discount: Number(discount),
      active,
    };

    if (offer) {
      await supabase.from("offers").update(payload).eq("id", offer.id);
    } else {
      await supabase.from("offers").insert(payload);
    }

    navigate("/admin/offers");
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={6}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex direction="column" gap={4}>
        {/* PRODUCTO */}
        <FormControl isRequired>
          <FormLabel>Producto</FormLabel>
          <Select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Seleccionar producto"
            bg="white"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* PRECIO OFERTA */}
        <FormControl isRequired>
          <FormLabel>Precio con oferta</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            bg="white"
          />
        </FormControl>

        {/* DESCUENTO */}
        <FormControl isRequired>
          <FormLabel>Descuento (%)</FormLabel>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            bg="white"
          />
        </FormControl>

        {/* ACTIVA */}
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Oferta activa</FormLabel>
          <Switch
            isChecked={active}
            onChange={(e) => setActive(e.target.checked)}
            colorScheme="green"
          />
        </FormControl>

        <Button
          type="submit"
          bg="primary"
          color="light"
          _hover={{ bg: "secondary" }}
        >
          Guardar oferta
        </Button>
      </Flex>
    </Box>
  );
}
