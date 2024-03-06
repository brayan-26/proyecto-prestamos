import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function MostarCedula() {
  const { register, handleSubmit } = useForm();
  const { ObtenerCedula } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const [prestamosData, setPrestamosData] = useState([]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const results = await ObtenerCedula(values);
      if (results.resultsData) {
        console.log(results.prestamosData);
        setPrestamosData(results.prestamosData);
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
    <div className="search-container">
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          {...register("cedula", { required: true })}
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>

      {mensaje && <p className="search-message">{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div className="result-container">
          <h2 className="result-heading">Datos de préstamos:</h2>
          <ul className="result-list">
            {prestamosData.map((prestamo, index) => (
              <li key={index} className="result-item">
                <p>
                  <strong>El número de ESTADOO 1 quiere decir que lo debe , 0 que ya lo pago</strong>
                </p>
                <p>ID: {prestamo.id}</p>
                <p>Estado: {prestamo.estado_pago}</p>
                <p>Cédula Usuario: {prestamo.cedula_usuario}</p>
                <p>Monto Solicitado: {prestamo.monto_solicitado} pesos</p>
                <hr className="result-divider" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MostarCedula;
