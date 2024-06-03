import Index from "views/Index.js";
//? extras
//? Auth
import Profile from "views/contentPage/Profile.js";
import Register from "views/contentPage/Register.js";
import Login from "views/contentPage/Login.js";
import Calendario from "views/contentPage/Calendario";
import Graficas from "views/contentPage/Graficas";

//? Client
import Client from "views/contentPage/clientesPages/Client";
import { CreateClient } from "views/contentPage/clientesPages/CreateClient";
import { CustomerDetail } from "views/contentPage/clientesPages/CustomerDetail";

//? Reserva
import Reserva from "views/contentPage/reservasPages/Reserva";
import { CreateReserva } from "views/contentPage/reservasPages/CreateReserva";
import { ReservaDetail } from "views/contentPage/reservasPages/ReservaDetail";

//? pivote asignación de mesas
import AsignacionMesa from "views/contentPage/asignacionMesasPages/AsignacionMesa";
import { CreateAsignacion } from "views/contentPage/asignacionMesasPages/CreateAsignacion";

//? mesas
import Mesa from "views/contentPage/mesasPages/Mesa";
import { CreateMesa } from "views/contentPage/mesasPages/CreateMesa";

//? employee
import Employee from "views/contentPage/empleadosPages/Employee";
import { CreateEmployee } from "views/contentPage/empleadosPages/CreateEmployee";
// import { EmployeeDetail } from "views/contentPage/empleadosPages/EmployeeDetail";
import EmployeeDetail from "views/contentPage/empleadosPages/EmployeeDetail";

//? Configuracion
import Configuracion from "views/contentPage/Configuracion";

/* ESTE ARCHIVO SOLO ES PARA EL CONTENIDO => TODAS LAS PAGINAS */

let routes = [
    {
        path: "/home",
        component: <Index />,
        layout: "/admin",
        roles: ["administrador", "recepcionista", "anfitrion", "vigilante", "mesero"],
    },
    //^ CALENDARIO
    {
        path: "/calendario",
        component: <Calendario />,
        layout: "/admin",
        roles: ["administrador", "recepcionista", "anfitrion", "vigilante", "mesero"],
    },

    //^CLIENTES
    {
        path: "/clients",
        component: <Client />,
        layout: "/admin",
        roles: ["administrador", "recepcionista", "anfitrion"],
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
    //^RESERVAS
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
    {
        path: "/reservas/detail",
        component: <ReservaDetail />,
        layout: "/admin",
    },

    //^ ASIGNACION DE MESA
    {
        path: "/asignar-mesa",
        component: <AsignacionMesa />,
        layout: "/admin",
    },
    {
        path: "/asignar-mesa/create",
        component: <CreateAsignacion />,
        layout: "/admin",
    },

    //^MESAS
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
    //^EMPLEADOS
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
        component: <CreateEmployee />,
        layout: "/admin",
    },
    //^GRAFICAS
    {
        path: "/graficas",
        component: <Graficas />,
        layout: "/admin",
    },
    //^CONFIGURACION
    {
        path: "/configuracion",
        component: <Configuracion />,
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
    //^AUTH
    {
        path: "/user-profile",
        component: <Profile />,
        layout: "/admin",
    },
];
export default routes;
