import "./ContainerIndex.css";
import React from "react";
const ContainerIndex = ({ setButtonState }) => {
  return (
    <div
      className={
        setButtonState ? "containerIndex-dark" : "containerIndex-light"
      }
    >
      <div className="containerItem" style={{ width: "50%" }}>
        <a href="mailto:diegojadrian97@gmail.com.ar?Subject=Asunto%20del%20mail">
          <span>
            <i className="fa-solid fa-envelope"></i> <strong>ESCRIBINOS</strong>
          </span>
        </a>
      </div>
      <div className="containerItem" style={{ width: "50%" }}>
        <a href="https://wa.me/5491159148462?text=Hola!%20Me%20comunico%20porque...">
          <span>
            <i className="fa-brands fa-whatsapp"></i>
            <strong>WHATSAPP</strong>
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContainerIndex;
