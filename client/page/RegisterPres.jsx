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
      const monto = parseInt(values.monto);
      const diasAgregar = parseInt(values.diasAgregar);

      // Realiza la validación para montos menores o iguales a 100,000
      if (monto <= 100000 && diasAgregar > 60) {
        setMensaje(
          "Para montos menores o iguales a 100,000, el plazo máximo es de 60 días."
        );
        return;
      }

      // Realiza la validación para montos iguales a 500,000
      if (monto <= 500000 && diasAgregar > 120) {
        setMensaje(
          "Para montos iguales o menores de 500,000, el plazo máximo es de 120 días."
        );
        return;
      }

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

        <label>Fecha Final a pagar</label>
        <select
          className="register-loan-select"
          {...register("diasAgregar", { required: true })}
        >
          <option value="30">A 1 mes</option>
          <option value="60">A 2 meses</option>
          <option value="90">A 3 meses</option>
          <option value="120">A 4 meses</option>
          <option value="150">A 5 meses</option>
          <option value="180">A 6 meses</option>
          <option value="210">A 7 meses</option>
          <option value="240">A 8 meses</option>
          <option value="270">A 9 meses</option>
          <option value="300">A 10 meses</option>
          <option value="330">A 11 meses</option>
          <option value="360">A 12 meses</option>
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
      <Link to="/register" className="register-user-link">
        Registrar usuario
      </Link>
      <Link to="/mostrarPrestamos" className="register-loan-link">
        Ver todos los préstamos
      </Link>
      <Link to="/obtenerCedula" className="register-loan-link">
        Ver préstamos por cédula
      </Link>
    </div>
  );
}

export default RegisterPres;
