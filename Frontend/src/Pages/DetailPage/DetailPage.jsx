import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./DetailPage.css";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Cards from "../../Components/card/card";
import Specs from "./Specs";

const DetailPage = ({ setButtonState }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"));
      where("id", "==", { id });
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProducts(docs);
    };
    getProducts();
  }, []);
  const { id } = useParams();
  let filteredProducts = products.filter((item) => {
    return item.id === id;
  });

  return (
    <div>
      <div
        className={
          setButtonState ? "ProductDetail-light" : "ProductDetail-dark"
        }
      >
        {filteredProducts.map((product) => {
          return (
            <div className="ProductDetail" key={product.id}>
              <Cards product={product}></Cards>
              <div className="ProductSpecs">
                <h1>Especificaciones del producto</h1>
                <hr></hr>
                <br></br>
                {product.Specs}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailPage;
