import React, { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import "./cartElements.css";
import { ProductsContext } from "../../../Context/ProductsContext";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
const CartElements = () => {
  const { cart, setCart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { removeProductFromCart } = useContext(CartContext);
  const { productId, setProductId } = useContext(ProductsContext);
  const handleQuantityChange = (productId, value) => {
    const updatedCart = cart.map((product) => {
      console.log("El pid es " + productId);
      if (product._id === productId) {
        const newQuantity = product.quantity + value;
        if (newQuantity <= 0) {
          return null;
        }
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });

    // Filtra los productos nulos después de actualizar el carrito
    const filteredCart = updatedCart.filter((product) => product !== null);
    setCart(filteredCart);
  };
  return (
    <div>
      {cart.map((product) => {
        const productInfo = products.find((p) => p._id === product._id);

        if (!productInfo) {
          return null;
        }

        const { title, price, thumbnail } = productInfo;

        return (
          <div className="cartItem" key={product._id}>
            <img
              className="cartItemImg"
              src={productInfo.thumbnail}
              alt="products-card"
            />
            <h3 className="cartItemName">{product.title}</h3>
            <h4 className="cartItemPrice">${product.price}</h4>
            <p className="cartItemQuantity">Cantidad:{product.quantity}</p>
            <div className="BtnAgregar">
              <Button
                onClick={() => handleQuantityChange(product._id, -1)}
                variant="outline-danger"
              >
                -
              </Button>
            </div>
            <div className="BtnRestar">
              <Button
                onClick={() => handleQuantityChange(product._id, 1)}
                variant="outline-success"
              >
                +
              </Button>
            </div>
            <div>
              <CloseButton
                onClick={() => removeProductFromCart(productId)}
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
