import { Form, Button } from "react-bootstrap";
import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  age: "",
};
const RegisterPage = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [RegisteredUsers, setValues] = useState(initialState);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...RegisteredUsers, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setValues(initialState);
    console.log(RegisteredUsers);
    const response = await fetch(
      "http://localhost:8080/api/sessions/register",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(RegisteredUsers),
      }
    );
    if (response.status == 200) {
      navigate("/login");
      console.log("Usuario registrado");
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <h3>Registrate!!</h3>
      <div>
        <Form className="d-flex" onSubmit={onSubmit} ref={formRef}>
          <Form.Control
            type="first_name"
            placeholder="Ingrese su nombre"
            name="first_name"
            value={RegisteredUsers.first_name}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="last_name"
            placeholder="Ingrese su apellido"
            name="last_name"
            value={RegisteredUsers.last_name}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="age"
            placeholder="Ingrese su edad"
            name="age"
            value={RegisteredUsers.age}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={RegisteredUsers.email}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            name="password"
            value={RegisteredUsers.password}
            onChange={handleOnChange}
            className="me-2"
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

export default RegisterPage;
