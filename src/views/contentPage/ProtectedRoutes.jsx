import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem("access_token");

    return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
