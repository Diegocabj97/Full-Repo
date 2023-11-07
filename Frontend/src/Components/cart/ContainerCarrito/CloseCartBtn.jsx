import React, { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
const CloseCartBtn = () => {
  const { toggleContainerClass } = useContext(CartContext);
  return (
    <button
      onClick={toggleContainerClass}
      type="button"
      className="btn-close CloseCartBtn"
      aria-label="Close"
    ></button>
  );
};

export default CloseCartBtn;
