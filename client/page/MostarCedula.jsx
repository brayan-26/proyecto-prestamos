import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { differenceInMonths } from "date-fns";
import { Link } from "react-router-dom";

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
    <div className="search-container">
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          autoComplete="off"
          {...register("cedula", { required: true })}
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>

      {mensaje && <p className="search-message">{mensaje}</p>}

      {prestamosData.length > 0 && (
        <div className="loan-list-container">
          <h2 className="loan-list-heading">Datos de préstamos:</h2>
          <ul className="loan-list">
            {prestamosData.map((prestamo, index) => (
              <li key={index} className="loan-item">
                <p>ID Del Prestamo: {prestamo.id}</p>
                <p>
                  Estado: {prestamo.estado_pago === 0 ? "Pago" : "Pendiente"}
                </p>
                <p>Cédula Usuario: {prestamo.cedula_usuario}</p>
                <p>Monto Solicitado: {prestamo.monto_solicitado} pesos</p>
                <p>
                  Interés:{" "}
                  {Math.round(
                    (prestamo.monto_solicitado * prestamo.porcentaje_cobro) /
                      100
                  )}{" "}
                  pesos
                </p>
                <p>
                  Fecha Préstamo: {prestamo.fecha_prestamo.substring(0, 10)}
                </p>
                <p>
                  Fecha A Pagar Prestamo: {prestamo.fecha_pago.substring(0, 10)}
                </p>
                <p>Porcentaje Cobro: {prestamo.porcentaje_cobro}%</p>
                <p>
                  Monto a Pagar por Día: {calcularMontoPorDia(prestamo)} pesos
                </p>
                <p>
                  Monto Pagar Mensual: {calcularMontoMensual(prestamo)} pesos
                </p>
                <hr className="loan-item-divider" />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/register" className="register-user-link">
        Registrar usuario
      </Link>
      <Link to="/mostrarPrestamos" className="register-loan-link">
        Ver préstamos
      </Link>
      <Link to="/registerPrestamos" className="register-loan-link">
        registar prestamos
      </Link>
    </div>
  );
}

export default MostarCedula;
