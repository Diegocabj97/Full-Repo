import React, { useEffect, useState } from "react";
import Cards from "../card/card.jsx";
import "./CardList.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const CardList = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        if (data.payload) {
          setProds(data.payload.docs);
        } else {
          console.log({ error: "Productos no encontrados" });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="Cards-List">
      {prods.map((prod) => (
        <div key={prod._id}>
          <Link to={`/detail/${prod._id}`}>
            <Cards product={prod} />
          </Link>
        </div>
      ))}
    </Container>
  );
};

export default CardList;
