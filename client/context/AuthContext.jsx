import { createContext, useState, useContext } from "react";
import { login, register, registerPrestamos } from "../api/auth";

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
  const registerPrestamos = async (values) => {
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
  return (
    <AuthContext.Provider
      value={{
        ingresar,
        registrarUser,
        registerPrestamos,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
