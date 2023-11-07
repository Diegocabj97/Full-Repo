import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../Components/card/card";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import { useContext } from "react";
import { ProductsContext } from "../../Context/ProductsContext.jsx";
const SearchPage = () => {
  const { products } = useContext(ProductsContext);
  let { onSearch } = useParams();
  let filteredProducts = products.filter((item) => {
    const productName = item.nombre.toLowerCase();
    const searchValue = onSearch.toLowerCase();
    return productName.includes(searchValue);
  });

  if (filteredProducts.length > 0) {
    return (
      <div>
        <div>
          <h2>Productos Encontrados:</h2>
        </div>
        <div className="SearchItems">
          {filteredProducts.map((products) => {
            return (
              <Link to={`/detail/${products.id}`} key={products.id}>
                <div>
                  <Cards product={products}></Cards>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <h3 className="SorryMsg">
        Disculpas por las molestias, ningún producto fue encontrado.
      </h3>
    );
  }
};
export default SearchPage;
