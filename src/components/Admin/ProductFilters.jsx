import { Flex, Input, Select } from "@chakra-ui/react";

export default function ProductFilters({
  category,
  setCategory,
  search,
  setSearch,
  categories = [],
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={3}
      mb={4}
    >
      <Input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        bg="white"
        borderColor="gray.300"
        _focus={{
          borderColor: "primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
        }}
        flex="1"
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        bg="white"
        borderColor="gray.300"
        _focus={{
          borderColor: "primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
        }}
        w={{ base: "100%", md: "52" }}
      >
        <option value="">Todas las categorías</option>

        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
