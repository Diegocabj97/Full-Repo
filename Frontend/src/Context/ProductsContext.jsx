import React, { useState, createContext, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        if (data) {
          setProducts(data.payload.docs);
        } else {
          console.log({ error: "Productos no encontrados" });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getProducts();
  }, []);
  useEffect(() => {
    const ids = products.map((product) => product._id).toString();
    setProductId(ids);
  });
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        productId,
        setProductId,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
