import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./card.css";
import { CartContext } from "../../Context/CartContext.jsx";
import { ProductsContext } from "../../Context/ProductsContext.jsx";

function Cards({ added }) {
  const { products, setProducts, productId } = useContext(ProductsContext);
  const { addToCart, updateCartOnServer } = useContext(CartContext);
  const { setCurrentProductId } = useContext(ProductsContext);
  useEffect(() => {
    const product = products.map((product) => product._id);
  }, [products]);
  const BuyButtonClick = (event) => {
    event.preventDefault();
    setCurrentProductId(productId);
    addToCart(productId, products); // Solo necesitas dos argumentos aquí
    updateCartOnServer(productId, products); // Solo necesitas un argumento aquí
  };

  return (
    <div>
      <Card>
        <Card.Img className="cardImg" variant="top" src={products.thumbnail} />
        <Card.Body>
          <Card.Title>{products.title}</Card.Title>
          <Card.Text>{products.description}</Card.Text>
          <Card.Title className="cardPrice">$ {products.price}</Card.Title>
          <Card.Body>${products._id}</Card.Body>
          <Button
            onClick={BuyButtonClick}
            added={added}
            className="ComprarBtn"
            variant="primary"
          >
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
