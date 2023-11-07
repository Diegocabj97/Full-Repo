import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Obtener el carrito guardado del almacenamiento local
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en el almacenamiento local cada vez que cambie
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].cantidad += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, cantidad: 1 }]);
    }
  };

  const removeProductFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  
  const [containerClass, setContainerClass] = useState(
    "container-cart-products-hidden-cart"
  );

  const toggleContainerClass = () => {
    setContainerClass((containerClass) =>
      containerClass === "container-cart-products-show-cart"
        ? "container-cart-products-hidden-cart"
        : "container-cart-products-show-cart"
    );
  };

  return (
    <CartContext.Provider
      value={{
        containerClass,
        toggleContainerClass,
        cart,
        addToCart,
        removeProductFromCart,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
