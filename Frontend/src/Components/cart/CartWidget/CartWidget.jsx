import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./CartWidget.css";
import { useState, useContext } from "react";
import { CartContext } from "../../../Context/CartContext";

const CartWidget = ({ onClick, setButtonState }) => {
  const { cart } = useContext(CartContext);
  const counter = cart.reduce(
    (total, product) => total + product.cantidad,
    0
  );
  return (
    <Container className="container-icon">
      <div className="container-cart-icon" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 1 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="icon-cart"
        >
          <path
            stroke={setButtonState ? "white" : "black"}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        <div className="count-products">
          <span id="contador-productos">{counter}</span>
        </div>
      </div>
    </Container>
  );
};

export default CartWidget;
