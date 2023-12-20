import { Form, Button } from "react-bootstrap";
import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Contact/Contact.css";
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  age: "",
};
const RegisterPage = ({ setButtonState }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [RegisteredUsers, setValues] = useState(initialState);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...RegisteredUsers, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const ageNumber = parseInt(RegisteredUsers.age, 10);
    if (isNaN(ageNumber) || ageNumber < 15 || ageNumber > 99) {
      alert("La edad debe ser un número entre 15 y 99");
      return null, false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (
      RegisteredUsers.password.length < 5 ||
      RegisteredUsers.password.length > 15 ||
      !passwordRegex.test(RegisteredUsers.password)
    ) {
      alert(
        "La contraseña debe tener entre 5 y 10 caracteres, un numero y una mayúscula"
      );
      return null, false;
    } else {
      console.log(RegisteredUsers);
      const response = await fetch(
        "http://localhost:3000/api/sessions/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(RegisteredUsers),
        }
      );
      if (response.status == 200) {
        setValues(initialState);
        navigate("/login");
        alert("Usuario registrado");
      } else if (response.status === 401) {
        alert("Usuario ya existente.");
      }
    }
  };

  return (
    <div>
      <h3 className={setButtonState ? "h3-dark" : "h3-light"}>Registrate!!</h3>
      <div className="formContainer">
        <Form className="ContactForm d-flex" onSubmit={onSubmit} ref={formRef}>
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
          <Button className="sendBtn" type="submit" variant="danger">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
