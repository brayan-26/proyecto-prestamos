import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate , Link} from "react-router-dom";

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
    <div className="register-user-container">
    <form className="register-user-form" onSubmit={onSubmit}>
      <input
        className="register-user-input"
        type="number"
        autoComplete="off"
        {...register("cedula", { required: true })}
        placeholder="Cédula"
      />
      <input
        className="register-user-input"
        type="text"
        autoComplete="off"
        {...register("nombre", { required: true })}
        placeholder="Nombre"
      />
      <input
        className="register-user-input"
        type="text"
        {...register("apellido", { required: true })}
        placeholder="Apellido"
      />
      <button className="register-user-button" type="submit">Registrar Usuario</button>
    </form>
    {mensaje && <p className="register-user-message">{mensaje}</p>}
    <Link to="/registerPrestamos" className="register-user-link">Registrar Préstamos</Link>
  </div>
  
  );
}

export default RegisterUser;
