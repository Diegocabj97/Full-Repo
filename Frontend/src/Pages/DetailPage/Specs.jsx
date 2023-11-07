import React, { useContext } from "react";
import DetailPage from "./DetailPage";
import { ProductsContext } from "../../Context/ProductsContext";
const Specs = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      <DetailPage>{products.Specs}</DetailPage>
    </div>
  );
};

export default Specs;
