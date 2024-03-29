import Index from "views/Index.js";
import Profile from "views/contentPage/Profile.js";
import Maps from "views/contentPage/Maps.js";
import Register from "views/contentPage/Register.js";
import Login from "views/contentPage/Login.js";
import Tables from "views/contentPage/Tables.js";
import Icons from "views/contentPage/Icons.js";

let routes = [
    {
        path: "/index",
        name: "Inicio",
        icon: "ni ni-tv-2 text-primary",
        component: <Index />,
        layout: "/admin",
    },
    {
        path: "/clientes",
        name: "Clientes",
        icon: "ni ni-single-02 text-pink",
        layout: "/admin",
        subRoutes: [
            {
                path: "/listado",
                name: "Listado de Clientes",
                icon: "",
                component: <Index />,
                layout: "/admin/clientes",
            },
            {
                path: "/registro",
                name: "Registro de Clientes",
                icon: "",
                component: <Index />,
                layout: "/admin/clientes",
            },
        ],
    },
    {
        path: "/reservas",
        name: "Reservas",
        icon: "ni ni-calendar-grid-58 text-orange",
        layout: "/admin",
        subRoutes: [
            {
                path: "/listado",
                name: "Listado de Reservas",
                icon: "",
                component: <Index />,
                layout: "/admin/reservas",
            },
            {
                path: "/mesas",
                name: "Crear Reserva",
                icon: "",
                component: <Index />,
                layout: "/admin/reservas",
            },
        ],
    },
    {
        path: "/mesas",
        name: "Mesas",
        icon: "ni ni-align-left-2 text-default",
        component: <Index />,
        layout: "/admin",
        subRoutes: [
            {
                path: "/listado",
                name: "Listado de Mesas",
                icon: "",
                component: <Index />,
                layout: "/admin/reservas",
            },
            {
                path: "/mesas",
                name: "Asignar Mesas",
                icon: "",
                component: <Index />,
                layout: "/admin/reservas",
            },
        ],
    },
    {
        path: "/register",
        name: "Usuarios",
        icon: "ni ni-single-02 text-pink",
        component: <Register />,
        layout: "/auth",
    },
    {
        path: "/maps",
        name: "Calendario",
        icon: "ni ni-calendar-grid-58 text-orange",
        component: <Maps />,
        layout: "/admin",
    },
    {
        path: "/icons",
        name: "Graficas",
        icon: "ni ni-chart-pie-35 text-blue",
        component: <Icons />,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Configuración",
        icon: "ni ni-settings text-yellow",
        component: <Login />,
        layout: "/auth",
    },
];
export default routes;
