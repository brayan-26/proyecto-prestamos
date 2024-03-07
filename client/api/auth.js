import axios from "axios";
const API = "http://localhost:3000/api";

export const login = (values) => axios.post(`${API}/login`, values);
export const register = (values) => axios.post(`${API}/register`, values);
export const registerPrestamos = (values) => axios.post(`${API}/registerPres`, values);
export const PrestamosUser = (values) => axios.post(`${API}/getPresUser`, values);
export const PrestamosaAll = () => axios.post(`${API}/getPrestamos`);
export const ganancias = () => axios.post(`${API}/ganancias`);
export const actualizar = (values) => axios.post(`${API}/actualizarEstaID`, values);

