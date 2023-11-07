import React, { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import "./cartElements.css";
import { ProductsContext } from "../../../Context/ProductsContext";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
const CartElements = () => {
  const { cart, setCart } = useContext(CartContext);

  const { products } = useContext(ProductsContext);

  const removeItem = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };
  const handleQuantityChange = (productId, value) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.cantidad + value;
        if (newQuantity <= 0) {
          return null;
        }
        return {
          ...product,
          cantidad: newQuantity,
        };
      }
      return product;
    });
    const filteredCart = updatedCart.filter((product) => product !== null);
    setCart(filteredCart);
  };
  return (
    <div>
      {cart.map((product) => {
        const productInfo = products.find((p) => p.id === product.id);

        if (!productInfo) {
          return null;
        }

        const { nombre, precio, imagen } = productInfo;

        return (
          <div className="cartItem" key={product.id}>
            <img className="cartItemImg" src={imagen} alt="products-card" />
            <h3 className="cartItemName">{nombre}</h3>
            <h4 className="cartItemPrice">{precio}$</h4>
            <p className="cartItemQuantity">Cantidad:{product.cantidad}</p>
            <div className="BtnAgregar">
              <Button
                onClick={() => handleQuantityChange(product.id, -1)}
                variant="outline-danger"
              >
                -
              </Button>
            </div>
            <div className="BtnRestar">
              <Button
                onClick={() => handleQuantityChange(product.id, 1)}
                variant="outline-success"
              >
                +
              </Button>
            </div>
            <div>
              <CloseButton
                onClick={() => removeItem(product.id)}
                className="rmvBtn"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartElements;
