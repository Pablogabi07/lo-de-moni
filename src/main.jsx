import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Tu paleta personalizada
const theme = extendTheme({
  colors: {
    primary: "#7C3AED",
    secondary: "#F472B6",
    light: "#FFFFFF",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
