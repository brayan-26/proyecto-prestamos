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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("cedula", { required: true })} />
        <button type="submit">Buscar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div>
          <h2>Datos de préstamos:</h2>
          <ul>
            {prestamosData.map((prestamo, index) => (
              <li key={index}>
                <p>ID: {prestamo.id}</p>
                <p>estado: {prestamo.estado_pago} </p>
                <p>Cedula Usuario: {prestamo.cedula_usuario} </p>
                <p>Monto Solicitado: {prestamo.monto_solicitado} pesos</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MostarCedula;
