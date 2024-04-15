import Index from "views/Index.js";
import Profile from "views/contentPage/Profile.js";
import Register from "views/contentPage/Register.js";
import Login from "views/contentPage/Login.js";
import Tables from "views/contentPage/Tables.js";
import Client from "views/contentPage/clientesPages/Client";
import Reserva from "views/contentPage/reservasPages/Reserva";
import Employee from "views/contentPage/empleadosPages/Employee";
import Mesa from "views/contentPage/mesasPages/Mesa";

// import { Mesa } from "views/contentPage/mesasPages/Mesa";
import { CustomerDetail } from "views/contentPage/clientesPages/CustomerDetail";
import { CreateClient } from "views/contentPage/clientesPages/CreateClient";
import { CreateReserva } from "views/contentPage/reservasPages/CreateReserva";

import { CreateMesa } from "views/contentPage/mesasPages/CreateMesa";

import { EmployeeDetail } from "views/contentPage/empleadosPages/EmployeeDetail";
import { CreateEmployee } from "views/contentPage/empleadosPages/CreateEmployee";


/* ESTE ARCHIVO SOLO ES PARA EL CONTENIDO => TODAS LAS PAGINAS */

let routes = [
    {
        path: "/home",
        component: <Index />,
        layout: "/admin",
    },
    //CLIENTES
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
    //RESERVAS
    {
        path: "/reservas",
        component: <Reserva />,
        layout: "/admin",
    },
    {
        path: "/reservas/create/:id?",
        component: <CreateReserva />,
        layout: "/admin",
    },
    //MESAS
    {
        path: "/mesas",
        component: <Mesa />,
        layout: "/admin",
    },
    {
        path: "/mesas/create/:id?",
        component: <CreateMesa />,
        layout: "/admin",
    },
    //EMPLEADOS
    {
        path: "/employees",
        component: <Employee />,
        layout: "/admin",
    },
    {
        path: "/employees/detail/:id",
        component: <EmployeeDetail />,
        layout: "/admin",
    },
    {
        path: "/employees/create/:id?",
        component: <CreateEmployee/>,
        layout: "/admin",
    },

    //AUTH
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
