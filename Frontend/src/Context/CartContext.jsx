import React, { createContext, useState, useEffect, useContext } from "react";
import { ProductsContext } from "./ProductsContext.jsx";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState();

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartid");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      fetchCart();
    }
  }, [cartId, setCart]); // <-- Asegúrate de incluir setCart en las dependencias

  const fetchCart = async () => {
    try {
      if (!cartId) {
        console.log("Error al obtener el carrito:");
      } else {
        const response = await fetch(
          `http://e-commerce-diego.onrender.com/api/cart/${cartId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el carrito con FETCH");
        }

        const data = await response.json();
        const cartData = data.payload.products;
        setCart(cartData);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      if (!cartId) {
        console.error("El cartId no está definido");
        return;
      }

      const response = await fetch(
        `http://e-commerce-diego.onrender.com/api/cart/${cartId}/product/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        // Actualizar el carrito en el estado local
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        // Actualizar el carrito en el servidor
        fetchCart(cartId);
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const removeProductFromCart = async (productId) => {
    try {
      if (!cartId) {
        console.error("El cartId no está definido");
        return;
      }

      const response = await fetch(
        `http://e-commerce-diego.onrender.com/api/cart/${cartId}/product/${productId}`,
        {
          method: "PUT",
          body: { quantity: 0 },
        }
      );

      if (response.ok) {
        // Actualizar el carrito en el estado local
        setCart((prevCart) =>
          prevCart.filter((product) => product._id !== productId)
        );
        // Actualizar el carrito en el servidor
        fetchCart(cartId);
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const clearCart = () => {
    try {
      if (!cartId) {
        console.error("El cartId no está definido");
        return;
      }

      // Limpiar el carrito en el servidor
      fetch(`http://e-commerce-diego.onrender.com/api/cart/${cartId}`, {
        method: "DELETE",
      });

      // Limpiar el carrito en el estado local
      setCart([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
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
        setContainerClass,
        cart,
        cartId,
        setCartId,
        setCart,
        addToCart,
        removeProductFromCart,
        clearCart,
        toggleContainerClass,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
