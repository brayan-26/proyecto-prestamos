import {
  agregarUser,
  getCedula,
  agregarPresta,
  numberPresta,
  obtenerPres,
  obtenerPresUser,
  obtenerPresTrue,
  actualizarEstado,
} from "../models/user.models.js";

export const login = (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    if (nombre === "brayan" && contraseña === "123") {
      res.status(200).json({ mensaje: "Crendenciales correctas" });
    } else {
      res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const registerPres = async (req, res) => {
  try {
    const { cedula, monto, fechaPago, interes } = req.body;
    // Obtener la fecha de hoy
    const fechaPrestamo = new Date();

    // Formatear la fecha como una cadena en el formato deseado (por ejemplo, YYYY-MM-DD)
    const fechaPrestamoFormateada = fechaPrestamo.toISOString().split("T")[0];
    const total = fechaPrestamo.setDate(fechaPrestamo.getDate() + fechaPago);
    console.log(fechaPago)
    
    const datos = [
      cedula,
      monto,
      fechaPrestamoFormateada,
      total,
      true,
      interes,
    ];

    console.log(datos)
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
  } catch (error) {
    console.log(error);
  }
};

export const getPrestamos = async (req, res) => {
  try {
    const results = await obtenerPresTrue();
    if (results.length > 0) {
      res.status(200).json({ mensaje: "Todos los prestamos", info: results });
    } else {
      res.status(401).json({ mensaje: "NO hay tiene prestamos" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPresUser = async (req, res) => {
  try {
    const { cedula } = req.body;
    const results = await obtenerPresUser(cedula);

    if (results[0].length > 0) {
      res
        .status(200)
        .json({ mensaje: "El usuario tiene prestamos", info: results[0] });
    } else {
      res.status(401).json({ mensaje: "El usuario NO tiene prestamos" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const ganancias = async (req, res) => {
  try {
    const prestamos = await obtenerPres();

    if (prestamos.length > 0) {
      // obtenemos el monto y el porcentaje
      const montosPrestamos = prestamos.map(
        (prestamo) => prestamo.monto_solicitado
      );
      const montosPorcentaje = prestamos.map(
        (prestamo) => prestamo.porcentaje_cobro
      );
      const gananciasPorPrestamo = montosPrestamos.map((monto, index) => {
        const porcentaje = montosPorcentaje[index];
        return (monto * porcentaje) / 100;
      });
      const gananciaTotal = gananciasPorPrestamo.reduce(
        (total, ganancia) => total + ganancia
      );
      res
        .status(200)
        .json({ mensaje: `Ganancias totales ${Math.round(gananciaTotal)}` });
    } else {
      res.status(401).json({ mensaje: "Aun no hay prestamos" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const actualizarEsta = async (req, res) => {
  try {
    const estado = req.body;
    const results = await actualizarEstado(estado);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};
