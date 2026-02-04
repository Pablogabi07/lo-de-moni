import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import AdminLayout from "../../layout/AdminLayout";
import ProductFilters from "../../components/Admin/ProductFilters";
import ProductTable from "../../components/Admin/ProductTable";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: offersData, error: offersError } = await supabase
      .from("offers")
      .select("*");

    if (productsError || offersError) {
      console.error("Error cargando datos:", productsError || offersError);
      setLoading(false);
      return;
    }

    const merged =
      productsData?.map((p) => ({
        ...p,
        offer: offersData?.find((o) => o.product_id === p.id) || null,
      })) || [];

    setProducts(merged);
    setLoading(false);

    const cats = Array.from(
      new Set(merged.map((p) => p.category).filter(Boolean))
    );
    setCategories(cats);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [products, category, search]);

  const handleDelete = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    await supabase.from("offers").delete().eq("product_id", id);

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading fontSize="lg" color="gray.700">
            Productos ({filtered.length})
          </Heading>

          <Button
            as={Link}
            to="/admin/new"
            bg="primary"
            color="light"
            size="sm"
            _hover={{ bg: "secondary" }}
          >
            Nuevo producto
          </Button>
        </Flex>

        <ProductFilters
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          categories={categories}
        />

        <ProductTable products={filtered} onDelete={handleDelete} />
      </Box>
    </AdminLayout>
  );
}
