import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import AdminLayout from "../../layouts/AdminLayout";
import OfferTable from "../../pages/Admin/OfferTable";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

export default function OffersDashboard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOffers = async () => {
    setLoading(true);

    const { data: offersData } = await supabase
      .from("offers")
      .select("*, products(*)")
      .order("created_at", { ascending: false });

    setOffers(offersData || []);
    setLoading(false);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("offers").delete().eq("id", id);
    setOffers((prev) => prev.filter((o) => o.id !== id));
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
            Ofertas ({offers.length})
          </Heading>

          <Button
            as={Link}
            to="/admin/offers/new"
            bg="primary"
            color="light"
            size="sm"
            _hover={{ bg: "secondary" }}
          >
            Nueva oferta
          </Button>
        </Flex>

        <OfferTable offers={offers} onDelete={handleDelete} />
      </Box>
    </AdminLayout>
  );
}
