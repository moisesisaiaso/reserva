/* ESTE SOLO ES PARA EL SIDEBAR */

export let routesSideBar = [
    {
        path: "/home",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
    },
    {
        path: "/clients",
        name: "Clientes",
        icon: "ni ni-single-02 text-blue",
        layout: "/admin",
        subRoutes: [
            {
                path: "/clients",
                name: "Listado Clientes",
                layout: "/admin",
            },
            {
                path: "/clients/create",
                name: "Registro Clientes",
                layout: "/admin",
            },
        ],
    },
    {
        path: "/reservas",
        name: "Reservas",
        icon: "ni ni-tie-bow text-orange",
        layout: "/admin",
    },
    {
        path: "/mesas",
        name: "Mesas",
        icon: "ni ni-support-16 text-pink",
        layout: "/admin",
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        layout: "/admin",
    },

    {
        path: "/tables",
        name: "Tables-Graficas",
        icon: "ni ni-bullet-list-67 text-red",
        layout: "/admin",
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        layout: "/auth",
    },
];
