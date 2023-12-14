import { React, useState, useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import "./login.css";
import { ProductsContext } from "../../Context/ProductsContext.jsx";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = ({ setButtonState }) => {
  const { setCartId, fetchCart } = useContext(CartContext);
  const { login } = useAuth();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (
      formData.password.length < 5 ||
      formData.password.length > 15 ||
      !passwordRegex.test(formData.password)
    ) {
      alert(
        "La contraseña debe tener 5 caracteres como mínimo y 15 como máximo. Una mayuscula y 1 número"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const datos = await response.json();
        const { token } = datos;
        const cartid = datos.cart;
        console.log("cartid", cartid);
        setCartId(cartid);
        localStorage.setItem("cartid", cartid);
        const Cookiecartid =
          (document.cookie = `cartid=${cartid}; expires ${new Date(
            Date.now() + 1 * 24 * 60 * 60 * 1000
          ).toUTCString()}; path=/`);
        document.cookie = Cookiecartid;
        //////////////////////////
        const jwtCookie = (document.cookie = `jwtCookie=${
          datos.token
        }; expires ${new Date(
          Date.now() + 1 * 24 * 60 * 60 * 1000
        ).toUTCString()}; path=/`);
        document.cookie = jwtCookie;
        login(token);
        navigate("/");
        alert("Usuario logeado");
        console.log("Usuario logeado, token: " + token);
      } else if (response.status === 401) {
        // Credenciales incorrectas
        alert("Credenciales incorrectas.");
        return;
      } else if (response.status === 404) {
        // Usuario no encontrado
        alert(
          "Usuario no encontrado. Serás redirigido a la página de registro."
        );
        navigate("/register");
      } else {
        // Otro tipo de error
        console.log(response);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <h3 className={setButtonState ? "loginDark" : "loginLight"}>
        Inicia sesión!
      </h3>
      <div>
        <Form className="d-flex loginForm" onSubmit={onSubmit} ref={formRef}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            className="mb-2 me-2"
            aria-label="Search"
          />
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            className="mb-2 me-2"
            aria-label="Search"
          />
          <Button type="submit" variant="danger">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
