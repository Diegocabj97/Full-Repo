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
        return a.price - b.price;
      } else {
        return b.price - a.price;
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
            <div key={product._id}>
              <Link to={`/detail/${product._id}`}>
                <Cards product={product} />
              </Link>
            </div>
          );
        })}
      </Container>
    </ProductsProvider>
  );
};

export default CardList;
