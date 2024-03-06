import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLogin from "../page/PageLogin";
import RegisterUser from "../page/RegisterUser";
import RegisterPres from "../page/RegisterPres";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/registerPrestamos" element={<RegisterPres />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
