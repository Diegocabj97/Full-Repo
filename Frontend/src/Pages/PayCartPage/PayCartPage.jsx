import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Form, Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "./PayCartPage.css";
import ThxMsg from "./ThxMsg";

const PayCartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const productosComprados = cart.map((product) => ({
    nombre: product.nombre,
    precio: product.precio,
    cantidad: product.cantidad,
  }));
  const initialState = {
    name: "",
    lastname: "",
    Email: "",
    EmailConfirm: "",
    Productos: productosComprados,
  };
  const [values, setValues] = useState(initialState);
  const [purchaseID, setPurchaseID] = useState(null);
  const [emailMatch, setEmailMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [highlight, setHighlight] = useState(false);
  useEffect(() => {
    if (highlight) {
      setTimeout(() => {
        setHighlight(false); // Restablecer el estado de iluminación después de 0.5 segundos
      }, 500);
    }
  }, [highlight]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setEmailMatch(null);
  };
  const FinalizarPago = async (e) => {
    e.preventDefault();
    setHighlight(false);
    setSubmitted(true);
    const match = values.Email === values.EmailConfirm;
    setEmailMatch(match);
    if (match) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cart/:cartId/purchase",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } catch (error) {
        error: "Error al redireccionar al ticket";
      }
    } else {
      console.log("email incorrecta");
    }

    const docRef = await addDoc(collection(db, "Compras Recibidas"), {
      values,
    });
    setPurchaseID(docRef.id);
    console.log(docRef.id);
    setValues(initialState);
    setCart([]);
  };
  const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  return total > 0 ? (
    <div className="payCart">
      <h1>Termina tu compra!</h1>
      {cart.map((product) => (
        <div className="BuyItem" key={product.id}>
          <img src={product.imagen} alt="" />
          <h3>{product.nombre}</h3>
          <p>Precio: ${product.precio}</p>
          <p>Cantidad: {product.cantidad}</p>
        </div>
      ))}
      <h3>El total de tu compra es de $:{total}</h3>
      <h2>Escriba sus datos para finalizar la compra!</h2>
      <div
        style={{ marginBottom: "50px" }}
        className={`${highlight ? "highlight" : ""}`}
      >
        {submitted &&
          !emailMatch && ( // Cambio en la condición de renderización del mensaje de error
            <p style={{ color: "red", marginBottom: "50px" }}>
              Los correos electrónicos no coinciden.
            </p>
          )}
        <Form className={"BuyForm d-flex "} onSubmit={FinalizarPago}>
          <Form.Control
            type="input"
            placeholder="Escriba su nombre"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="input"
            placeholder="Apellido"
            name="lastname"
            value={values.lastname}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="input"
            placeholder="Telefono"
            name="Telefono"
            value={values.phone}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="email"
            placeholder="Email"
            name="Email"
            value={values.Email}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="email"
            placeholder="Vuelva a ingresar su Email"
            name="EmailConfirm"
            value={values.EmailConfirm}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />

          <Button type="submit" onClick={FinalizarPago} variant="danger">
            Finalizar Compra
          </Button>
        </Form>
      </div>
    </div>
  ) : (
    <div className="payCart">
      {purchaseID ? (
        <div>
          <ThxMsg purchaseID={purchaseID} />
          <Link to="/">
            <Button>Volver al Inicio</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h3 style={{ margin: "auto", textAlign: "center" }}>
            Tu carrito esta vacio!
          </h3>
          <Link to="/">
            <Button>Volver al Inicio</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PayCartPage;
