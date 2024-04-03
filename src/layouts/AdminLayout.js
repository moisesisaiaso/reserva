import React from "react";
import myStyles from "../assets/css/myStyles.module.css";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { routesSideBar } from "routesSideBar";


const Admin = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    /* mantiene la actualización del contenido cada que renderiza una nueva pagina siempre mostrando desde la parte superior */
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    /* obtiene todas las rutas que renderizan los componentes de contenido de la pagina accedida */
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return <Route path={prop.path} element={prop.component} key={key} exact />;
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            {/* barra lateral */}
            <Sidebar
                {...props}
                routes={routesSideBar}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("../assets/img/brand/logo1.png"),
                    imgAlt: "...",
                }}
            />
            {/* sección principal */}
            <div className="main-content" ref={mainContent}>
                {/* HEADER */}
                <AdminNavbar {...props} brandText={getBrandText(props?.location?.pathname)} />

                {/* CONTENT */}
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to="/admin/home" replace />} />
                </Routes>

                {/* FOOTER */}
                <Container fluid className={myStyles.footerContainer}>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Admin;
