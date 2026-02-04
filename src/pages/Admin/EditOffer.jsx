import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import AdminLayout from "../../layout/AdminLayout";
import OfferForm from "./OfferForm";

import Loader from "../../components/Loader";
import { Box, Heading } from "@chakra-ui/react";

export default function EditOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOffer = async () => {
    const { data } = await supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .single();

    setOffer(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOffer();
  }, [id]);

  return (
    <AdminLayout>
      <Box>
        <Heading fontSize="lg" color="gray.700" mb={4}>
          Editar oferta
        </Heading>

        {loading ? <Loader /> : <OfferForm offer={offer} />}
      </Box>
    </AdminLayout>
  );
}
