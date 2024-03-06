import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const { register, handleSubmit } = useForm();
  const { registrarUser } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const navegate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const results = await registrarUser(values);
      if (results.resultsData) {
        setMensaje(results.mensaje);
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
          type="number"
          autoComplete="off"
          {...register("cedula", { required: true })}
        />
        <input
          type="text"
          autoComplete="off"
          {...register("nombre", { required: true })}
        />
        <input type="text" {...register("apellido", { required: true })} />
        <button type="submit">register user</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default RegisterUser;
