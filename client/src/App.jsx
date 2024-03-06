import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLogin from "../page/PageLogin";
import RegisterUser from "../page/RegisterUser";
import RegisterPres from "../page/RegisterPres";
import MostarCedula from "../page/MostarCedula";
import PagePrestamos from "../page/PagePrestamos";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/registerPrestamos" element={<RegisterPres />} />
          <Route path="/obtenerCedula" element={<MostarCedula />} />
          <Route path="/mostrarPrestamos" element={<PagePrestamos />} />
          <Route path="/*" element={<p>paila manito</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
