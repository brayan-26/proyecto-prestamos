import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PageLogin() {
  const { register, handleSubmit } = useForm();
  const { ingresar } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const navegate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const results = await ingresar(values);
      if (results.resultsData) {
        navegate("/register");
      }
      if (results.statusCode) {
        setMensaje(results.responseData.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <input
          placeholder="Cédula"
          className="login-input"
          type="text"
          autoComplete="off"
          {...register("nombre", { required: true })}
          />
        <input
          placeholder="Contraseña"
          className="login-input"
          type="password"
          {...register("contraseña", { required: true })}
        />
        <button className="login-button" type="submit">
          login
        </button>
      </form>
      {mensaje && <p className="login-message">{mensaje}</p>}
    </div>
  );
}

export default PageLogin;
