import { useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setErrorMsg("");

    if (!email || !pass) {
      setErrorMsg("Completá todos los campos");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Credenciales incorrectas");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      bg="white"
      borderWidth="1px"
      rounded="lg"
      p={6}
      mt={10}
      boxShadow="md"
    >
      <VStack spacing={4} align="stretch">
        <Heading fontSize="xl" color="primary">
          Acceso administrador
        </Heading>

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="white"
        />

        <Input
          placeholder="Contraseña"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          bg="white"
        />

        {errorMsg && (
          <Text fontSize="xs" color="red.500">
            {errorMsg}
          </Text>
        )}

        <Button
          bg="primary"
          color="light"
          w="full"
          onClick={login}
          isDisabled={loading}
          _hover={{ bg: "secondary" }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </VStack>
    </Box>
  );
}
