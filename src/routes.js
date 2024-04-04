import Index from "views/Index.js";
import Profile from "views/contentPage/Profile.js";
import Register from "views/contentPage/Register.js";
import Login from "views/contentPage/Login.js";
import Tables from "views/contentPage/Tables.js";
import Client from "views/contentPage/clientesPages/Client";
import Reserva from "views/contentPage/reservasPages/Reserva";
import { Mesa } from "views/contentPage/mesasPages/Mesa";
import { CustomerDetail } from "views/contentPage/clientesPages/CustomerDetail";
import { CreateClient } from "views/contentPage/clientesPages/CreateClient";

let routes = [
    {
        path: "/home",
        component: <Index />,
        layout: "/admin",
    },
    {
        path: "/clients",
        component: <Client />,
        layout: "/admin",
    },
    {
        path: "/clients/detail/:id",
        component: <CustomerDetail />,
        layout: "/admin",
    },
    {
        path: "/clients/create/:id?",
        component: <CreateClient />,
        layout: "/admin",
    },
    {
        path: "/reservas",
        component: <Reserva />,
        layout: "/admin",
    },
    {
        path: "/mesas",
        component: <Mesa />,
        layout: "/admin",
    },
    {
        path: "/user-profile",
        component: <Profile />,
        layout: "/admin",
    },
    {
        path: "/tables",
        component: <Tables />,
        layout: "/admin",
    },
    {
        path: "/login",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        component: <Register />,
        layout: "/auth",
    },
];
export default routes;
