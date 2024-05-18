/* ESTE SOLO ES PARA EL SIDEBAR */

export let routesSideBar = [
    {
        path: "/home",
        name: "Inicio",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
    },
    {
        path: "/calendario",
        name: "Calendario",
        icon: "ni ni-calendar-grid-58 text-red",
        layout: "/admin",
    },
    {
        path: "/clients",
        name: "Clientes",
        icon: "ni ni-single-02 text-orange",
        layout: "/admin",
        subRoutes: [
            {
                path: "/clients",
                name: "Listado Clientes",
                layout: "/admin",
            },
            {
                path: "/clients/create",
                name: "Registrar Cliente",
                layout: "/admin",
            },
        ],
    },
    {
        path: "/reservas",
        name: "Reservas",
        icon: "ni ni-tie-bow text-yellow",
        layout: "/admin",
    },
    {
        path: "/asignar-mesa",
        name: "Mesas asignadas",
        icon: "ni ni-support-16 text-info",
        layout: "/admin",
    },
    {
        path: "/mesas",
        name: "Mesas",
        icon: "ni ni-support-16 text-red",
        layout: "/admin",
    },
    {
        path: "/graficas",
        name: "Graficas",
        icon: "ni ni-chart-bar-32 text-orange",
        layout: "/admin",
    },
    {
        path: "/employees",
        name: "Empleados",
        icon: "ni ni-single-02 text-yellow",
        layout: "/admin",
    },
    {
        path: "/configuracion",
        name: "Configuracion",
        icon: "ni ni-settings text-info",
        layout: "/admin",
    },
    // {
    //     path: "/tables",
    //     name: "Tables-Graficas",
    //     icon: "ni ni-bullet-list-67 text-red",
    //     layout: "/admin",
    // },
];