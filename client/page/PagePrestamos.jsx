import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function PagePrestamos() {
  const { ObtenerPresta, allganacias, actualizarEsta } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const [estado, setEstado] = useState(null);
  const { register, handleSubmit } = useForm();
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

  const onSubmit = async (data) => {
    try {
      data.estado = 0;

      const results = await actualizarEsta(data);
      console.log(results.status);
      if (results.status === 200) {
        console.log(results.status);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      if (results.statusCode) {
        setEstado(results.responseData.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calcularMontoPorDia = (prestamo) => {
    const montoTotal =
      prestamo.monto_solicitado +
      Math.round((prestamo.monto_solicitado * prestamo.porcentaje_cobro) / 100);
    const fechaPrestamo = new Date(prestamo.fecha_prestamo);
    const fechaPago = new Date(prestamo.fecha_pago);
    const diasTotales = Math.ceil(
      (fechaPago - fechaPrestamo) / (1000 * 60 * 60 * 24)
    ); // Calcular la diferencia en días
    const montoPorDia = Math.round(montoTotal / diasTotales);
    return montoPorDia;
  };

  const calcularMontoMensual = (prestamo) => {
    const montoPorDia = calcularMontoPorDia(prestamo);
    const fechaPrestamo = new Date(prestamo.fecha_prestamo);
    const fechaPago = new Date(prestamo.fecha_pago);
    const diasTotales = Math.ceil(
      (fechaPago - fechaPrestamo) / (1000 * 60 * 60 * 24)
    ); // Calcular la diferencia en días
    const montoMensual = montoPorDia * diasTotales;
    return montoMensual;
  };

  return (
    <div className="loan-info-container">
      {gana && <p className="info-message">{gana}</p>}
      {estado && <p className="info-message">{estado}</p>}
      <hr className="info-divider" />
      {mensaje && <p className="info-message">{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div className="loan-list-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="loan-list-heading">Datos de préstamos:</h2>
            <ul className="loan-list">
              {prestamosData.map((prestamo, index) => (
                <li key={index} className="loan-item">
                  <p>ID Del Prestamo: {prestamo.id}</p>
                  <p>Cédula Usuario: {prestamo.cedula_usuario}</p>
                  <p>Monto Prestado: {prestamo.monto_solicitado} pesos</p>
                  <p>
                    Fecha Préstamo: {prestamo.fecha_prestamo.substring(0, 10)}
                  </p>
                  <p>
                    Fecha A Pagar Prestamo:{" "}
                    {prestamo.fecha_pago.substring(0, 10)}
                  </p>
                  <p>
                    Interés:{" "}
                    {Math.round(
                      (prestamo.monto_solicitado * prestamo.porcentaje_cobro) /
                        100
                    )}{" "}
                    pesos
                  </p>
                  <p>Porcentaje Cobro: {prestamo.porcentaje_cobro}%</p>
                  <p>
                    Monto a Pagar por Día: {calcularMontoPorDia(prestamo)} pesos
                  </p>
                  <p>
                    Monto Pagar Mensual: {calcularMontoMensual(prestamo)} pesos
                  </p>{" "}
                  <input
                    type="text"
                    {...register("id")}
                    value={prestamo.id}
                    readOnly
                  />
                  <button type="submit">Cambiar estado</button>
                  <hr className="loan-item-divider" />
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}
      <Link to="/register" className="register-user-link">
        Registrar usuario
      </Link>
      <Link to="/obtenerCedula" className="register-loan-link">
        Ver préstamos por cédula
      </Link>
      <Link to="/registerPrestamos" className="register-loan-link">
        registar prestamos
      </Link>
    </div>
  );
}

export default PagePrestamos;
