import { Accordion, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ContainerCarrito.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext.jsx";
import CartElements from "../CartElements/cartElements.jsx";
import CloseCartBtn from "./CloseCartBtn";
const ContainerCarrito = () => {
  const { cart, containerClass } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, el) => acc + el._id.price * el.quantity,
      0
    );
    setCartTotal(newTotal);
    console.log(cartTotal);
  }, [cart]);
  const { toggleContainerClass } = useContext(CartContext);
  return cart.length > 0 ? (
    <Container className={containerClass}>
      <div>
        <div className="carrito">
          <div className="CartHeader">
            <h3>Carrito de compras</h3>
            <CloseCartBtn />
          </div>
          <CartElements />

          <h4>Total: ${cartTotal}</h4>
          <Link to="/PayCart">
            <button
              onClick={toggleContainerClass}
              className="endBuyBtn"
              variant="primary"
            >
              Finaliza tu compra!
            </button>
          </Link>
        </div>
      </div>
    </Container>
  ) : (
    <Container className={containerClass}>
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontSize: 30,
            display: "flex",
            flexDirection: "end",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 5,
            margin: "10px",
            border: "solid",
            width: "100%",
          }}
        >
          El carrito esta vacio :(
        </p>
        <CloseCartBtn />
      </div>
    </Container>
  );
};

export default ContainerCarrito;
