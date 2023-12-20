import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./card.css";
import { CartContext } from "../../Context/CartContext.jsx";

function Cards({ product }) {
  const { addToCart, cart } = useContext(CartContext);

  const isProductInCart = cart.some((item) => item._id === product._id._id);

  const BuyButtonClick = (event) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <Card>
      <Card.Img className="cardImg" variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Title className="cardPrice">${product.price}</Card.Title>
        <Button
          onClick={BuyButtonClick}
          className="ComprarBtn"
          variant="primary"
          disabled={isProductInCart}
        >
          {isProductInCart ? "Ya en el carrito" : "Agregar al carrito"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
