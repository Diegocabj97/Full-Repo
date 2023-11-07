import React, { useContext } from "react";
import Cards from "../card/card.jsx";
import "./CardList.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  ProductsContext,
  ProductsProvider,
} from "../../Context/ProductsContext.jsx";

const CardList = () => {
  const ordenarCards = (ascendente) => {
    const sortedCards = [...cards].sort((a, b) => {
      if (ascendente) {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    setCards(sortedCards);
  };
  const { products, setProducts } = useContext(ProductsContext);
  return (
    <ProductsProvider>
      <Container className="Cards-List">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/detail/${product.id}`}>
                <Cards
                  product={product}
                  
                />
              </Link>
            </div>
          );
        })}
      </Container>
    </ProductsProvider>
  );
};

export default CardList;
