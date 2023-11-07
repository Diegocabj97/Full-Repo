import React from "react";
import CardList from "../../Components/CardList/CardList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ProductsProvider } from "../../Context/ProductsContext";
import DropdownOrder from "../../Components/DropDownOrder/dropdownOrder";
import "./ProductsPage.css";
const ProductsPage = () => {
  return (
    <ProductsProvider>
      <h2>Productos más buscados</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DropdownOrder />
        <CardList />
      </div>
    </ProductsProvider>
  );
};

export default ProductsPage;
