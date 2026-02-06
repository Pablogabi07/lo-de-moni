import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !msg) {
      alert("Completá todos los campos");
      return;
    }

    const phone = "5491161910448"; // Número de Moni

    const text = `Hola Moni! Te escribo desde la web.%0A%0A` +
                 `Nombre: ${name}%0A` +
                 `Email: ${email}%0A` +
                 `Mensaje:%0A${msg}`;

    const url = `https://wa.me/${phone}?text=${text}`;

    window.open(url, "_blank");

    setSent(true);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <Box maxW="lg" mx="auto" py={6}>
      <Heading fontSize="2xl" color="primary" mb={4}>
        Contacto
      </Heading>

      <VStack
        as="form"
        spacing={3}
        align="stretch"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          bg="white"
        />

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="white"
        />

        <Textarea
          placeholder="Mensaje"
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          bg="white"
        />

        <Button
          bg="primary"
          color="light"
          w="full"
          onClick={handleSend}
          _hover={{ bg: "secondary" }}
        >
          Enviar por WhatsApp
        </Button>

        {sent && (
          <Text fontSize="sm" color="green.600">
            ¡Mensaje enviado por WhatsApp!
          </Text>
        )}
      </VStack>

      <Text fontSize="sm" color="gray.500" mt={4}>
        También podés escribir directamente al WhatsApp de Moni.
      </Text>
    </Box>
  );
}
