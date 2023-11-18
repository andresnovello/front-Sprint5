import { Route, Routes } from "react-router-dom";
import * as React from 'react';
import ClientesPage from "../pages/ClientesPage";
import ProductosPage from "../pages/ProductosPage";
import EmpleadosPage from "../pages/EmpleadosPage";
import HomePage from "../pages/HomePage";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
//import PrivateRoute from "./PrivateRoute";

const Admin = React.lazy(() => import('../pages/admin/Admin'));


const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/empleados" element={<EmpleadosPage />}/>
        <Route path="/admin" element={<Admin />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
      
    </>
  )
}

export default AppRoutes