import React, { createContext, useState, useEffect, useContext } from "react";
import { ProductsContext } from "./ProductsContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState();
  const { productId } = useContext(ProductsContext);
  const updatedCart = [...cart];
  const fetchCart = async () => {
    try {
      if (cartId) {
        const response = await fetch(
          `http://localhost:8080/api/cart/${cartId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el carrito con FETCH");
        }

        const data = await response.json();
        const cartData = data.products;
        setCart(cartData);
        updateCartOnServer(cartData);
        updatedCart(cartData);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    // Lógica para cargar el carrito al montar el componente
    fetchCart();
    updateCartOnServer(updatedCart);
  }, [cartId]);
  const addToCart = async (productId, product) => {
    try {
      // Asegúrate de que cartId y productId tengan valores antes de continuar
      if (!cartId) {
        console.error("El cartId no está definido");
        return;
      }

      if (!productId) {
        console.error("Producto no encontrado con el ID:", productId);
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/cart/${cartId}/products/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Producto agregado en el servidor ");
      }
      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex(
        (p) => p._id === productId
      );

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      // Actualizar el carrito en el servidor
      console.log("agregado al cart de MongoDB");
      setCart(updatedCart);

      // Actualizar el carrito en el servidor
      updateCartOnServer(updatedCart);

      // También puedes almacenar el carrito en el local storage si es necesario
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  const updateCartOnServer = async (products, productId) => {
    try {
      if (cartId) {
        const response = await fetch(
          `http://localhost:8080/api/cart/${cartId}/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products), // Agrega el cuerpo con los datos del producto
          }
        );

        if (!response.ok) {
          console.log("carrito actualizado en el servidor " + productId);
        }
      }
    } catch (error) {
      console.error("Error al actualizar el carrito en el servidor:", error);
    }
  };

  const removeProductFromCart = async (productId) => {
    try {
      if (cartId) {
        const response = await fetch(
          `http://localhost:8080/api/cart/${cartId}/products/${productId}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("carrito actualizado en el servidor");
        }
      }
    } catch (error) {
      console.error(
        "Error al eliminar el producto del carrito en el servidor:",
        error
      );
    }
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  const clearCart = () => {
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
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
        cartId,
        productId,
        setCartId,
        updateCartOnServer,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
