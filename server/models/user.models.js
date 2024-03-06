import { connection } from "../config/db.js";

export async function agregarUser(datos) {
  try {
    const sql =
      "INSERT INTO usuarios (cedula, nombre, apellido) VALUES (?, ?, ?)";
    const results = await connection.promise().query(sql, datos);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function getCedula(cedula) {
  try {
    const sql = "SELECT * FROM usuarios WHERE cedula = ?";
    const [results] = await connection.promise().query(sql, cedula);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function agregarPresta(datos) {
  try {
    const sql =
      "INSERT INTO prestamos (cedula_usuario, monto_solicitado, fecha_prestamo, fecha_pago, estado_pago, porcentaje_cobro) VALUES ( ?, ?, ?, ?, ?, ?)";
    const results = await connection.promise().query(sql, datos);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function numberPresta(cedula) {
  try {
    const sql =
      "SELECT COUNT(*) as total FROM prestamos WHERE cedula_usuario = ? AND estado_pago = 1";
    const results = await connection.promise().query(sql, cedula);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerPres() {
  try {
    const sql = "SELECT * FROM prestamos";
    const results = await connection.promise().query(sql);
    return results[0];
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerPresUser(cedula) {
  try {
    const sql = "SELECT * FROM prestamos WHERE cedula_usuario = ?";
    const results = await connection.promise().query(sql, cedula);
    return results;
  } catch (error) {
    console.log(error);
  }
}


