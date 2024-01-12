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
    nombre: product.title,
    precio: product.price,
    cantidad: product.quantity,
  }));
  const initialState = {
    name: "",
    last_name: "",
    Email: "",
    EmailConfirm: "",
    Productos: productosComprados,
  };
  const [values, setValues] = useState(initialState);
  const [purchaseID, setPurchaseID] = useState(null);
  const [emailMatch, setEmailMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

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

    // Verificar si todos los campos obligatorios están llenos
    const isFormComplete =
      values.name !== "" &&
      values.last_name !== "" &&
      values.Telefono !== "" &&
      values.Email !== "" &&
      values.EmailConfirm !== "";

    setFormComplete(isFormComplete);
  };

  const FinalizarPago = async (e) => {
    e.preventDefault();
    setHighlight(false);
    setSubmitted(true);
    const match = values.Email === values.EmailConfirm;
    setEmailMatch(match);

    if (match) {
      try {
        // Hacer la llamada a la API solo si el formulario está completo
        if (formComplete) {
          const response = await fetch(
            "http://e-commerce-diego.onrender.com/api/cart/:cid/purchase",
            {
              method: "get",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
        }
      } catch (error) {
        console.error("Error al redireccionar al ticket", error);
      }
    } else {
      console.log("email incorrecto");
    }

    const docRef = await addDoc(collection(db, "Compras Recibidas"), {
      values,
    });
    setPurchaseID(docRef.id);
    console.log(docRef.id);
    setValues(initialState);
    setCart([]);
  };

  const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

  return total > 0 ? (
    <div className="payCart">
      <h1>Termina tu compra!</h1>
      {cart.map((product) => (
        <div className="BuyItem" key={product._id}>
          <img src={product.thumbnail} alt="" />
          <h3>{product.title}</h3>
          <p>Precio: ${product.price}</p>
          <p>Cantidad: {product.quantity}</p>
        </div>
      ))}
      <h3>El total de tu compra es de $:{total}</h3>
      <h2>Escriba sus datos para finalizar la compra!</h2>
      <div
        style={{ marginBottom: "50px" }}
        className={`${highlight ? "highlight" : ""}`}
      >
        {submitted && !emailMatch && (
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
            name="last_name"
            value={values.last_name}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="input"
            placeholder="Telefono"
            name="Telefono"
            value={values.Telefono}
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

          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (formComplete) {
                FinalizarPago(e);
              } else {
                setHighlight(true);
              }
            }}
            variant="danger"
          >
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
