import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom"; // Importa NavLink como NavLinkRRD y Link desde react-router-dom
import { PropTypes } from "prop-types"; // Importa PropTypes desde prop-types
import {
    // Importa los siguientes componentes desde reactstrap
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

const Sidebar = (props) => {
    // Define un estado local para manejar el estado de la expansión de los elementos del menú
    const [collapseStates, setCollapseStates] = useState({});

    // Función para alternar el estado de expansión de un elemento del menú
    const toggleCollapse = (key) => {
        setCollapseStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    // Función para cerrar todos los elementos colapsados del menú
    const closeCollapse = () => {
        setCollapseStates({});
    };

    // Desestructura las propiedades recibidas
    const { routes, logo } = props;

    // Función para crear los elementos del menú basados en las rutas proporcionadas
    const createLinks = (routes) => {
        return routes.map((route, key) => {
            if (route.subRoutes) { // Si la ruta tiene subrutas
                const isOpen = collapseStates[key]; // Verifica si el elemento está expandido
                return (
                    <li key={key} className="nav-item">
                        <a
                            href="#pablo"
                            data-toggle="collapse"
                            className="nav-link"
                            aria-expanded={isOpen ? "true" : "false"}
                            onClick={() => toggleCollapse(key)}
                        >
                            <i className={route.icon} />
                            <span className="nav-link-text">{route.name}</span>
                        </a>
                        <div className={`collapse ${isOpen ? 'show' : ''}`}>
                            <ul className="nav-sm flex-column nav">
                                {route.subRoutes.map((subRoute, subKey) => (
                                    <li key={subKey} className="nav-item">
                                        <a
                                            className="nav-link"
                                            href={subRoute.layout + subRoute.path}
                                        >
                                            <span className="sidenav-mini-icon">{subRoute.miniIcon}</span>
                                            <span className="sidenav-normal">{subRoute.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                );
            } else { // Si la ruta no tiene subrutas
                return (
                    <NavItem key={key}>
                        <NavLink
                            to={route.layout + route.path}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                        >
                            <i className={route.icon} />
                            {route.name}
                        </NavLink>
                    </NavItem>
                );
            }
        });
    };

    // Configura las propiedades de NavbarBrand basadas en el logo proporcionado
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }

    // Devuelve el componente Sidebar con el contenido generado dinámicamente
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={closeCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                {logo ? (
                    <NavbarBrand className="pt-0" {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                <Nav navbar>{createLinks(routes)}</Nav>
           
        </Navbar>
    );
};

// Definición de los tipos de las propiedades esperadas por Sidebar
Sidebar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object), // Array de objetos de ruta
    logo: PropTypes.shape({ // Objeto de forma específica para logo
        innerLink: PropTypes.string, // Enlace interno
        outterLink: PropTypes.string, // Enlace externo
        imgSrc: PropTypes.string.isRequired, // Fuente de imagen requerida
        imgAlt: PropTypes.string.isRequired, // Texto alternativo de imagen requerido
    }),
};

export default Sidebar; // Exporta el componente Sidebar por defecto
