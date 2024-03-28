import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/AdminLayout";
import AuthLayout from "layouts/AuthLayout";
import { ProtectedRoutes } from "views/contentPage/ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/admin/*" element={<AdminLayout />} />
            </Route>
            {localStorage.getItem("access_token") === null ? (
                <Route path="/login/*" element={<AuthLayout />} />
            ) : (
                <Route path="/*" element={<Navigate to="/admin" />} />
            )}
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
);
