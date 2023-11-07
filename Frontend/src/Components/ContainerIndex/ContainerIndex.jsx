import "./ContainerIndex.css";
import React from "react";
const ContainerIndex = ({ setButtonState }) => {
  return (
    <div
      className={
        setButtonState ? "containerIndex-dark" : "containerIndex-light"
      }
    >
      <div style={{ width: "30%" }}>
        <span>
          <i className="fa-solid fa-calendar"></i> <strong>HORARIOS</strong>
        </span>

        <p>Lunes a Viernes de 9:30hs. a 18:30hs.</p>
      </div>

      <div style={{ width: "30%" }}>
        <a href="mailto:diegojadrian97@gmail.com.ar?Subject=Asunto%20del%20mail">
          <span>
            <i className="fa-solid fa-envelope"></i> <strong>ESCRIBINOS</strong>
          </span>
          <p>diegojadrian97@gmail.com.ar</p>
        </a>
      </div>
      <div style={{ width: "30%" }}>
        <a href="https://wa.me/5491159148462?text=Hola!%20Me%20comunico%20porque...">
          <span>
            <i className="fa-brands fa-whatsapp"></i>
            <strong>WHATSAPP</strong>
          </span>
          <p>+54 9 11-5914-8462</p>{" "}
        </a>
      </div>
    </div>
  );
};

export default ContainerIndex;
