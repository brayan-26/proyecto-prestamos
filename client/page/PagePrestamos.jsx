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
    <div>
      {gana && <p>{gana}</p>}
      <hr />
      {mensaje && <p>{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div>
          <h2>Datos de préstamos:</h2>
          <ul>
            {prestamosData.map((prestamo, index) => (
              <li key={index}>
                <p>ID: {prestamo.id}</p>
                <p>Cedula Usuario: {prestamo.cedula_usuario} </p>
                <p>Monto Solicitado: {prestamo.monto_solicitado} pesos</p>
                <button>nada 
                  
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PagePrestamos;
