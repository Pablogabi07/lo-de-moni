import { useState } from "react";
import { supabase } from "../../supabase/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

export default function ProductForm({ product, onSaved }) {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [images, setImages] = useState([]);
  const [discount, setDiscount] = useState(product?.offer?.discount || "");
  const [offerActive, setOfferActive] = useState(product?.offer?.active || false);
  const [saving, setSaving] = useState(false);

  const uploadImages = async (files) => {
    const uploaded = [];
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("products")
        .upload(`${crypto.randomUUID()}/${file.name}`, file);

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(data.path);
        uploaded.push(publicUrl);
      }
    }
    return uploaded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    let imgs = product?.images || [];
    if (images.length > 0) {
      const newImgs = await uploadImages(images);
      imgs = [...imgs, ...newImgs];
    }

    let productId = product?.id;

    if (product) {
      await supabase
        .from("products")
        .update({ title, price, description, category, images: imgs })
        .eq("id", product.id);
    } else {
      const { data } = await supabase
        .from("products")
        .insert([{ title, price, description, category, images: imgs }])
        .select("id")
        .single();
      productId = data.id;
    }

    if (discount && offerActive) {
      await supabase.from("offers").upsert(
        {
          product_id: productId,
          discount: Number(discount),
          active: true,
        },
        { onConflict: "product_id" }
      );
    } else {
      await supabase
        .from("offers")
        .update({ active: false })
        .eq("product_id", productId);
    }

    setSaving(false);
    onSaved && onSaved();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl>
          <FormLabel fontSize="xs" color="gray.500">Título</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="xs" color="gray.500">Precio</FormLabel>
          <Input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormControl>
      </SimpleGrid>

      <FormControl>
        <FormLabel fontSize="xs" color="gray.500">Descripción</FormLabel>
        <Textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="xs" color="gray.500">Categoría</FormLabel>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="xs" color="gray.500">Imágenes (múltiples)</FormLabel>
        <Input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          fontSize="sm"
        />
      </FormControl>

      <Box borderTop="1px" borderColor="gray.200" pt={3}>
        <Text fontSize="sm" fontWeight="semibold" color="primary">
          Oferta
        </Text>

        <Flex align="center" gap={2} mt={2}>
          <Checkbox
            isChecked={offerActive}
            onChange={(e) => setOfferActive(e.target.checked)}
          />
          <Text fontSize="sm">Oferta activa</Text>
        </Flex>

        <FormControl maxW="xs" mt={2}>
          <FormLabel fontSize="xs" color="gray.500">Descuento (%)</FormLabel>
          <Input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </FormControl>
      </Box>

      <Button
        type="submit"
        isDisabled={saving}
        bg="primary"
        color="white"
        _hover={{ bg: "secondary" }}
        size="sm"
      >
        {saving ? "Guardando..." : "Guardar producto"}
      </Button>
    </Box>
  );
}
