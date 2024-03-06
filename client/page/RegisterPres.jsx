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
      console.log(values)
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
    <div className="register-loan-container">
      <form className="register-loan-form" onSubmit={onSubmit}>
        <label>Cédula:</label>
        <input
          className="register-loan-input"
          type="number"
          autoComplete="off"
          {...register("cedula", { required: true })}
        />

        <label>Monto:</label>
        <input
          className="register-loan-input"
          type="number"
          autoComplete="off"
          {...register("monto", { required: true })}
        />

        <select {...register("fechaPago", {required: true})}>
          <option value="15">A 15 dias</option>
          <option value="30">A 30 dias</option>
        </select>

        <label>Interés:</label>
        <select
          className="register-loan-select"
          {...register("interes", { required: true })}
        >
          {[...Array(100).keys()].map((index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {`${index + 1}%`}
            </option>
          ))}
        </select>

        <button className="register-loan-button" type="submit">
          Registrar Préstamo
        </button>
      </form>
      {mensaje && <p className="register-loan-message">{mensaje}</p>}
      <br />
      <Link to="/mostrarPrestamos" className="register-loan-link">
        Ver todos los préstamos
      </Link>
      <br /> <br />
      <Link to="/obtenerCedula" className="register-loan-link">
        Ver préstamos por cédula
      </Link>
    </div>
  );
}

export default RegisterPres;
