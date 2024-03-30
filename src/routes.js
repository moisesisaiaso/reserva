import Index from "views/Index.js";
import Profile from "views/contentPage/Profile.js";
import Reserva from "views/contentPage/Reserva";
import Register from "views/contentPage/Register.js";
import Login from "views/contentPage/Login.js";
import Tables from "views/contentPage/Tables.js";
import Client from "views/contentPage/Client";

let routes = [
    {
        path: "/home",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: <Index />,
        layout: "/admin",
    },
    {
        path: "/clients",
        name: "Clientes",
        icon: "ni ni-single-02 text-blue",
        component: <Client />,
        layout: "/admin",
    },
    {
        path: "/reservas",
        name: "Reservas",
        icon: "ni ni-pin-3 text-orange",
        component: <Reserva />,
        layout: "/admin",
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: <Profile />,
        layout: "/admin",
    },
    {
        path: "/tables",
        name: "Tables",
        icon: "ni ni-bullet-list-67 text-red",
        component: <Tables />,
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <Register />,
        layout: "/auth",
    },
];
export default routes;
