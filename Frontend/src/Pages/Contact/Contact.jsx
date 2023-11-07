import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
const initialState = {
  name: "",
  lastname: "",
  email: "",
};

const ContactPage = () => {
  const [Usuarios, setValues] = useState(initialState);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...Usuarios, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "Usuarios Registrados"), { Usuarios, });

    console.log("Document written with ID: ", docRef.id);
    setValues(initialState);
  };

  // FIREBASE

  return (
    <div>
      <h1>Registrate para mas noticias!</h1>
      <div>
        <Form className="d-flex" onSubmit={onSubmit}>
          <Form.Control
            type="search"
            placeholder="Escriba su nombre"
            name="name"
            value={Usuarios.name}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="Search"
            placeholder="Apellido"
            name="lastname"
            value={Usuarios.lastname}
            onChange={handleOnChange}
            className="me-2"
            aria-label="Search"
          />
          <Form.Control
            type="search"
            placeholder="Email"
            name="email"
            value={Usuarios.email}
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

export default ContactPage;
