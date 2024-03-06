import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function PagePrestamos() {
  const { ObtenerPresta, allganacias } = useAuth();
  const [mensaje, setMensaje] = useState(null);

  const [prestamosData, setPrestamosData] = useState([]);
  const [gana, setGana] = useState(null);

  useEffect(() => {
    const obtenerDatosPrestamos = async () => {
      try {
        const resultsGana = await allganacias();
        const results = await ObtenerPresta();
        if (results.resultsData) {
          setPrestamosData(results.prestamosData);
          setMensaje(results.mensaje);
          setGana(resultsGana.mensaje);
        }
        if (results.statusCode) {
          setMensaje(results.responseData.mensaje);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatosPrestamos();
  }, []);

  return (
    <div className="loan-info-container">
      {gana && <p className="info-message">{gana}</p>}
      <hr className="info-divider" />
      {mensaje && <p className="info-message">{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div className="loan-list-container">
          <h2 className="loan-list-heading">Datos de préstamos:</h2>
          <ul className="loan-list">
            {prestamosData.map((prestamo, index) => (
              <li key={index} className="loan-item">
                <p>ID: {prestamo.id}</p>
                <p>Cédula Usuario: {prestamo.cedula_usuario}</p>
                <p>Monto Prestado: {prestamo.monto_solicitado} pesos</p>
                <hr className="loan-item-divider" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PagePrestamos;
