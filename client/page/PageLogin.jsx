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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          autoComplete="off"
          {...register("nombre", { required: true })}
        />
        <input
          type="password"
          {...register("contraseña", { required: true })}
        />
        <button type="submit">login</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default PageLogin;
