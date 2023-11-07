import { Form, Button } from "react-bootstrap";
import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookiesByName } from "../../Utils/formUtils";
const initialState = {
  title: "",
  thumbnail: "",
  category: "",
  description: "",
  code: "",
  quantity: "",
  stock: "",
  price: "",
};
const NewProduct = () => {
  const formRef = useRef(null);
  const [Productos, setValues] = useState(initialState);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...Productos, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setValues(initialState);
    const datForm = new FormData(formRef.current);
    const data = Object.fromEntries(datForm);
    const token = getCookiesByName("jwtCookie");
    console.log(token);
    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(Productos),
    });
    if (response.status == 200) {
      const datos = await response.json();
      console.log(datos);
    } else {
      const datos = await response.json();
      console.log(datos);
    }
  };
  return (
    <div className="container">
      <h2>Creacion de nuevo Producto</h2>
      <form className="d-flex" onSubmit={onSubmit} ref={formRef}>
        <Form.Control
          type="title"
          placeholder="Nombre"
          name="title"
          value={Productos.title}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="code"
          placeholder="Codigo"
          name="code"
          value={Productos.code}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="description"
          placeholder="Descripcion del producto"
          name="description"
          value={Productos.description}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="category"
          placeholder="Categoría"
          name="category"
          value={Productos.category}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="Number"
          placeholder="Precio"
          name="price"
          value={Productos.price}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="Number"
          placeholder="Stock"
          name="stock"
          value={Productos.stock}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <Form.Control
          type="Number"
          placeholder="Cantidad"
          name="quantity"
          value={Productos.quantity}
          onChange={handleOnChange}
          className="me-2"
          aria-label="Search"
        />
        <button type="submit" className="btn btn-primary">
          Crear Producto
        </button>
      </form>
    </div>
  );
};
export default NewProduct;
