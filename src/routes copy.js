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
        path: "/tables",
        name: "Registro",
        icon: "ni ni-bullet-list-67 text-red",
        component: <Tables />,
        layout: "/admin",
    },
    {
        path: "/register",
        name: "Clientes",
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
