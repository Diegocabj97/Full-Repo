import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./card.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast, ToastContainer } from "react-toastify";

function Cards({ product, added }) {
  const { cart, setCart } = useContext(CartContext);
  const onAddProduct = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].cantidad += 1;
    } else {
      updatedCart.push({ ...product, cantidad: 1 });
      setCart(updatedCart);
    }
    toast.success("Producto agregado al carrito", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setCart(updatedCart);
  };
  const BuyButtonClick = (event) => {
    event.preventDefault();
    onAddProduct(product);
  };

  return (
    <div>
      <Card>
        <Card.Img className="cardImg" variant="top" src={product.imagen} />
        <Card.Body>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Text>{product.descripcion}</Card.Text>
          <Card.Text className="cardPrice">$ {product.precio}</Card.Text>
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
