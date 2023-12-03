import { React, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

import "./login.css";
const initialState = {
  email: "",
  password: "",
};

const LoginPage = ({ setButtonState }) => {
  const { isAuthenticated, login } = useAuth();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
        const token = (document.cookie = `jwtCookie=${
          datos.token
        }; expires ${new Date(
          Date.now() + 1 * 24 * 60 * 60 * 1000
        ).toUTCString()}; path=/`);
        login(token);
        navigate("/");

        console.log("Usuario logeado, token: " + token);
      } else {
        console.log("Usuario no registrado");
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
