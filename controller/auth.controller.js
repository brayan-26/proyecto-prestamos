import {
  agregarUser,
  getCedula,
  agregarPresta,
  numberPresta,
  obtenerPres,
  obtenerPresUser,
} from "../models/user.models.js";

export const login = (req, res) => {
  const { nombre, contraseña } = req.body;

  if (nombre === "brayan" && contraseña === "123") {
    res.status(200).json({ mensaje: "Crendenciales correctas" });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
};

export const registerUser = async (req, res) => {
  const { cedula, nombre, apellido } = req.body;
  const datos = [cedula, nombre, apellido];

  const resultsCedula = await getCedula(cedula);
  if (resultsCedula.length > 0) {
    res.status(401).json({ mensaje: "Cedula existente" });
  } else {
    const results = await agregarUser(datos);
    if (results.length > 0) {
      res.status(200).json({ mensaje: "Datos guardados correctamente" });
    } else {
      res.status(500).json({ mensaje: "Error al guardar los datos" });
    }
  }
};

export const registerPres = async (req, res) => {
  const { cedula, monto, fechaPrestamo, fechaPago, interes } = req.body;
  const datos = [cedula, monto, fechaPrestamo, fechaPago, true, interes];

  const resultsNumber = await numberPresta(cedula);
  const number = resultsNumber[0][0].total;

  if (monto <= 20000 || monto >= 20000000) {
    res.status(401).json({ mensaje: "monto erroneo" });
  } else {
    if (number === 4) {
      res
        .status(401)
        .json({ mensaje: "El usuario ya alcanzo el limite de prestamos" });
    } else {
      const results = await agregarPresta(datos);
      if (results) {
        res.status(200).json({ mensaje: "Prestamos guardado correctamente" });
      } else {
        res.status(500).json({ mensaje: "Error al guardar el prestamo" });
      }
    }
  }
};

export const getPrestamos = async (req, res) => {
  const results = await obtenerPres();
  console.log(results[0]);
};
export const getPresUser = async (req, res) => {
  const {cedula}  = req.body;
  const results = await obtenerPresUser(cedula);

  if (results[0].length > 0) {
    res.status(200).json({ mensaje: "El usuario tiene prestamos" });
  } else {
    res
    .status(401)
    .json({ mensaje: "El usuario NO tiene prestamos" });
  }
  
};
