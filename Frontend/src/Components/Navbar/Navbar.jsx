import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import ContainerCarrito from "../cart/ContainerCarrito/ContainerCarrito";
import { LinkContainer } from "react-router-bootstrap";
import SearchForm from "./SearchForm.jsx";
import { CartContext } from "../../Context/CartContext";
import CartWidget from "../cart/CartWidget/CartWidget";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../Pages/Login/login.jsx";
const NavBarImport = ({
  greeting,
  onSearch,
  counter,
  setCounter,
  value,
  setButtonState,
}) => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const [buttonState, setLocalButtonState] = useState(false);
  const handleOnSubmit = async (e) => {
    logout();
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/sessions/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.status == 200) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartid");
      localStorage.removeItem("jwtToken");
      console.log("Has cerrado sesion");
      navigate("/login");
    } else {
      console.log("Error al cerrar sesion");
    }
  };
  const handleButtonClick = () => {
    setLocalButtonState(!buttonState);
    setButtonState(!buttonState);
  };
  const { toggleContainerClass } = useContext(CartContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={buttonState ? "navbar-dark bg-dark" : "navbar-light bg-light"}
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>{greeting}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className="dropdownCategories"
              title="Categorías"
              align="start"
              id="collasible-nav-dropdown"
              bg="dark"
            >
              <LinkContainer to="/Category/Procesadores">
                <Nav.Link className="NavItem">Procesadores</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/VideoCards">
                <Nav.Link className="NavItem">Placas de video</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Monitores">
                <Nav.Link className="NavItem">Monitores</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Auriculares">
                <Nav.Link className="NavItem">Auriculares</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Motherboards">
                <Nav.Link className="NavItem">Motherboards</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Almacenamiento">
                <Nav.Link className="NavItem">Almacenamiento</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Fuentes de poder">
                <Nav.Link className="NavItem">Fuentes de poder</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Teclados">
                <Nav.Link className="NavItem">Teclados</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Category/Mouses">
                <Nav.Link className="NavItem">Mouses</Nav.Link>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown
              className="dropdown m-3"
              title="Contacto"
              align="start"
              id="collasible-nav-dropdown"
              bg="dark"
            >
              <LinkContainer to="/Register">
                <Nav.Link className="NavItem">Registrarse</Nav.Link>
              </LinkContainer>
              {isAuthenticated ? (
                <Nav.Link
                  to="/Logout"
                  className="NavItem"
                  onClick={handleOnSubmit}
                >
                  Cerrar sesión
                </Nav.Link>
              ) : (
                <NavDropdown
                  title="Ingresar"
                  id="collasible-nav-dropdown"
                  drop="end"
                  className="dropdownLogin"
                >
                  <Container classname="loginFor">
                    <LoginPage></LoginPage>
                  </Container>
                </NavDropdown>
              )}
            </NavDropdown>
            <SearchForm value={value} onSearch={onSearch} />

            <button
              className={buttonState ? "BtnLight" : "BtnDark"}
              onClick={handleButtonClick}
            >
              {buttonState ? "Día" : "Noche"}{" "}
              <svg
                viewBox="0 2 24 24"
                width="24"
                height="24"
                className="m-2"
                strokeWidth="0.3"
              >
                <path
                  stroke={buttonState ? "white" : "black"}
                  fill={buttonState ? "black" : "white"}
                  d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
                ></path>
              </svg>
            </button>

            <CartWidget
              setButtonState={buttonState}
              onClick={toggleContainerClass}
              counter={counter}
              setCounter={setCounter}
              cart={cart}
              setCart={setCart}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarImport;
