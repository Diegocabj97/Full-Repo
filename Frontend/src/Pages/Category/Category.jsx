import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Cards from "../../Components/card/card";
import "./Category.css";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DropdownOrder from "../../Components/DropDownOrder/dropdownOrder";

const Category = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"));
      where("categoria", "==", { categoryid });
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProducts(docs);
    };
    getProducts();
  }, []);
  let { categoryid } = useParams();
  let filteredProducts = products.filter((item) => {
    return item.categoria === categoryid;
  });
  return (
    <div className="CategoryItems">
      
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
  );
};

export default Category;
