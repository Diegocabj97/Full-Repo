import React, { useContext } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { CartContext } from "../../../Context/CartContext";
import "./cartElements.css";
import { ProductsContext } from "../../../Context/ProductsContext";

const CartElements = () => {
  const { cart, setCart, removeProductFromCart } = useContext(CartContext);
  const { productId } = useContext(ProductsContext);
  console.log(cart);
  const handleQuantityChange = async (value, product) => {
    const updatedCart = cart.map((cartProduct) => {
      if (cartProduct._id === product._id) {
        const newQuantity = cartProduct.quantity + value;

        // Validación para asegurarse de que la cantidad no sea negativa
        if (newQuantity <= 0) {
          return null;
        }
        return {
          ...cartProduct,
          quantity: newQuantity,
        };
      }

      return cartProduct;
    });
    setCart(updatedCart);
    // Filtra los productos nulos después de actualizar el carrito
    const filteredCart = updatedCart.filter((product) => product !== null);
    setCart(filteredCart);

    // Actualizar el carrito desde el servidor después de modificarlo localmente
    // (El método updateCartElem y la lógica de servidor ya están en el CartContext)
  };

  return cart.map((cartProduct) => (
    <div key={cartProduct._id._id}>
      <div className="cartItem">
        <img
          className="cartItemImg"
          src={cartProduct.thumbnail}
          alt="products-card"
        />
        <div className="cartItem">
          <h3 className="cartItemName">{cartProduct._id.title}</h3>
          <h4 className="cartItemPrice">${cartProduct._id.price}</h4>
          <p className="cartItemQuantity">Cantidad: {cartProduct.quantity}</p>
        </div>

        <div>
          <CloseButton
            onClick={() => removeProductFromCart(productId)}
            className="rmvBtn"
          />
        </div>
      </div>
    </div>
  ));
};

export default CartElements;
