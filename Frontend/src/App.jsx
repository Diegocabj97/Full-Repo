import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORTS
import "./App.css";
import Header from "./Components/Header/header";
import ContainerIndex from "./Components/ContainerIndex/ContainerIndex";
import { ProductsProvider } from "./Context/ProductsContext.jsx";
import NavBarImport from "./Components/Navbar/Navbar.jsx";
import ContainerCarrito from "./Components/cart/ContainerCarrito/ContainerCarrito";
import { CartProvider } from "./Context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
// IMPORT PAGES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage/ProductsPage.jsx";
import DetailPage from "./Pages/DetailPage/DetailPage";
import ErrorPage from "./Pages/ErrorPage";
import Category from "./Pages/Category/Category";
import SearchPage from "./Pages/SearchPage/SearchPage";
import PayCartPage from "./Pages/PayCartPage/PayCartPage";
import RegisterPage from "./Pages/Register/register.jsx";
import LoginPage from "./Pages/Login/login.jsx";
import NewProduct from "./Pages/NewProduct/newProduct.jsx";

// ////////////////////////FIREBASE///////////////////////////
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
import ProdCreated from "./Pages/NewProduct/ProdCreated";

const App = () => {
  const [ButtonState, setButtonState] = useState(false);
  const [products, setProducts] = useState([]);
  const handleSearch = (searchText) => {
    if (searchText) {
      const filteredProducts = products.filter(
        (product) => product.nombre && product.nombre.includes(searchText)
      );
      console.log("Productos filtrados:", filteredProducts);
      setProducts(filteredProducts);
    } else {
      setProducts([]);
    }
  };

  const [counter, setCounter] = useState(0);
  const counterUp = () => {
    setCounter(counter + 1);
  };
  const counterDown = () => {
    setCounter(counter - 1);
  };
  return (
    <div>
      <ProductsProvider>
        <CartProvider>
          <AuthProvider>
            <Router>
              <div className={ButtonState ? "App-dark" : "App-light"}>
                <NavBarImport
                  counter={counter}
                  setCounter={setCounter}
                  greeting="Flores Gamers"
                  onSearch={handleSearch}
                  setButtonState={setButtonState}
                ></NavBarImport>

                <ContainerCarrito />

                <Header greeting="Flores Gamers!" />

                <ContainerIndex setButtonState={ButtonState}></ContainerIndex>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/PayCart" element={<PayCartPage />} />

                  <Route
                    path="/Register"
                    element={<RegisterPage setButtonState={ButtonState} />}
                  />
                  <Route
                    path="/Login"
                    element={<LoginPage setButtonState={ButtonState} />}
                  />
                  <Route path="/NewProd" element={<NewProduct />} />
                  <Route path="/ProdCreated" element={<ProdCreated />} />
                  <Route
                    path="/Detail/:id"
                    element={
                      <DetailPage
                        counterUp={counterUp}
                        setButtonState={ButtonState}
                      />
                    }
                  />
                  <Route path="/Category/:categoryid" element={<Category />} />
                  <Route path="*" element={<ErrorPage />} />
                  <Route
                    path="/Search/:onSearch"
                    element={<SearchPage onSearch={handleSearch} />}
                  ></Route>
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
};

export default App;
