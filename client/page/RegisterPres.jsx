import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function RegisterPres() {
  const { register, handleSubmit } = useForm();
  const { registerPres } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const navegate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const results = await registerPres(values);
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
      cedula, monto, fechaPrestamo, fechaPago, interes
      <form onSubmit={onSubmit}>
        <input
          type="number"
          autoComplete="off"
          {...register("cedula", { required: true })}
        />
        <input
          type="number"
          autoComplete="off"
          {...register("monto", { required: true })}
        />
        <input type="date" {...register("fechaPrestamo", { required: true })} />
        <input type="date" {...register("fechaPago", { required: true })} />

        <select {...register("interes", { required: true })}>
          {[...Array(100).keys()].map((index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {`${index + 1}%`}
            </option>
          ))}
        </select>

        <button type="submit">register prestamo</button>
      </form>  
      {mensaje && <p>{mensaje}</p>}
      <br />
      <Link to="/mostrarPrestamos">Ver todos los prestamos</Link> <br /> <br />
      <Link to="/obtenerCedula">Ver prestamos por cedula</Link>
    </div>
  );
}

export default RegisterPres;
