import React, { useState, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ProductsContext } from "../../Context/ProductsContext";

const BotonOrdenar = ({ ordenarCards }) => {
  const [orden, setOrden] = useState(null);

  const OrdenCards = (ascendente) => {
    setOrden(ascendente);
    ordenarCards(ascendente);
  };
  return (
    <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
      <DropdownButton
        align={{ lg: "end" }}
        title="Ordenar"
        id="dropdown-menu-align-responsive-1"
      >
        <Dropdown.Item onClick={() => OrdenCards(true)} eventKey="1">
          Menor a Mayor
        </Dropdown.Item>
        <Dropdown.Item onClick={() => OrdenCards(false)} eventKey="2">
          Mayor a menor
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

const DropdownOrder = () => {
  const { products, setProducts } = useContext(ProductsContext);

  const ordenarCards = (ascendente) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (ascendente) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts(sortedProducts);
  };

  return <BotonOrdenar ordenarCards={ordenarCards} />;
};

export default DropdownOrder;
