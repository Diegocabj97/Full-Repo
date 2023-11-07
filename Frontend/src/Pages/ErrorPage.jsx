import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1900);
  }, [navigate]);

  return (
    <div>
      <h1 style={{ margin: "auto", fontSize: "30px"  }}>ERROR 404 NOT FOUND</h1>
      <p>USTED SERA REDIRECCIONADO AL INICIO</p>
    </div>
  );
};

export default ErrorPage;
