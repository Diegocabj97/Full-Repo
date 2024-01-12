import React, { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../../Context/ProductsContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./DetailPage.css";
import { useParams } from "react-router-dom";
import Cards from "../../Components/card/card";

const DetailPage = ({ setButtonState }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://e-commerce-diego.onrender.com/api/products");
        const data = await response.json();

        if (data.docs) {
          // Accede al array de productos y actualiza el estado
          setProducts(data.docs);
        } else {
          console.log({ error: "Productos no encontrados" });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getProducts();
  }, []);
  const { id } = useParams();
  let filteredProducts = products.filter((item) => {
    return item._id === id;
  });

  return (
    <div>
      <div
        className={
          setButtonState ? "ProductDetail-light" : "ProductDetail-dark"
        }
      >
        {filteredProducts.map((product) => {
          return (
            <div className="ProductDetail" key={product._id}>
              <Cards product={product}></Cards>
              <div className="ProductSpecs">
                <h1>Especificaciones del producto</h1>
                <hr></hr>
                <br></br>
                {product.Specs}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailPage;
