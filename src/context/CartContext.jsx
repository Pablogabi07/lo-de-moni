import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeOne = (id) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc + Number(item.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const sendToWhatsApp = () => {
    const phone = "5491161910448";

    const message = items
      .map(
        (item) =>
          `• ${item.title} x${item.quantity} - $${(
            Number(item.price) * item.quantity
          ).toFixed(2)}`
      )
      .join("%0A");

    const url = `https://wa.me/${phone}?text=Hola Moni! Quiero hacer este pedido:%0A%0A${message}%0A%0ATotal: $${total.toFixed(
      2
    )}`;

    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeOne,
        removeFromCart,
        clearCart,
        total,
        totalItems,
        sendToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
