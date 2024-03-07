import { createContext, useState, useContext } from "react";
import {
  login,
  register,
  registerPrestamos,
  PrestamosUser,
  PrestamosaAll,
  ganancias,
  actualizar,
} from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const usecontext = useContext(AuthContext);
  if (!usecontext) {
    console.log("no hya contexto");
  }
  return usecontext;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const ingresar = async (values) => {
    try {
      const results = await login(values);
      return { resultsData: results.status };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };

  const registrarUser = async (values) => {
    try {
      const results = await register(values);
      return { resultsData: results.status, mensaje: results.data.mensaje };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  const registerPres = async (values) => {
    try {
      const results = await registerPrestamos(values);
      return { resultsData: results.status, mensaje: results.data.mensaje };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  const ObtenerCedula = async (values) => {
    try {
      const results = await PrestamosUser(values);
      const prestamosData = results.data.info;
      return {
        resultsData: results.status,
        mensaje: results.data.mensaje,
        prestamosData: prestamosData,
      };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  const ObtenerPresta = async () => {
    try {
      const results = await PrestamosaAll();
      const prestamosData = results.data.info;
      return {
        resultsData: results.status,
        mensaje: results.data.mensaje,
        prestamosData: prestamosData,
      };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  const allganacias = async (values) => {
    try {
      const results = await ganancias(values);
      return { resultsData: results.status, mensaje: results.data.mensaje };
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  const actualizarEsta = async (values) => {
    try {
      const results = await actualizar(values);
      return {status : results.status,}
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return { statusCode: status, responseData: data };
      } else {
        console.log(error);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ingresar,
        registrarUser,
        registerPres,
        ObtenerCedula,
        ObtenerPresta,
        allganacias,
        actualizarEsta,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
