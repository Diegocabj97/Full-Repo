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
          <p className="fontInd2">diegojadrian97@gmail.com.ar</p>
        </a>
      </div>
      <div className="containerItem" style={{ width: "50%" }}>
        <a href="https://wa.me/5491159148462?text=Hola!%20Me%20comunico%20porque...">
          <span>
            <i className="fa-brands fa-whatsapp"></i>
            <strong>WHATSAPP</strong>
          </span>
          <p className="fontInd3">+54 9 11-5914-8462</p>{" "}
        </a>
      </div>
    </div>
  );
};

export default ContainerIndex;
