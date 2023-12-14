import React, { useState, createContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);
  useEffect(() => {
    const ids = products.map((product) => product._id);
    setProductId(ids);
  }, [products]);

  useEffect(() => {
    const getCartProds = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();

        if (data.docs) {
          setProducts(data.docs);
        } else {
          console.log({ error: "Productos no encontrados" });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getCartProds();
  }, []);

  const findProductById = (productId) => {
    console.log("Searching for productId:", productId);
    console.log("Available products:", products);
    return products.find((product) => product._id === productId);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        productId,
        setProductId,
        currentProductId,
        findProductById,
        setCurrentProductId,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
