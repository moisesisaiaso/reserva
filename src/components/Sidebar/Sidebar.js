import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom"; // Importación de NavLink y Link de react-router-dom
import { PropTypes } from "prop-types"; // Importación de PropTypes para definir tipos de propiedades
import {
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

// Definición del componente Sidebar
const Sidebar = (props) => {
    // Estado para controlar si el menú está colapsado o no
    const [collapseOpen, setCollapseOpen] = useState(false);
    // Estado para controlar el estado de colapso de cada elemento del menú
    const [collapseStates, setCollapseStates] = useState(Array(props.routes.length).fill(false));

    // Función para alternar el colapso del menú completo
    const toggleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    // Función para alternar el colapso de un elemento del menú
    const toggleItemCollapse = (index) => {
        const newCollapseStates = [...collapseStates];
        newCollapseStates[index] = !newCollapseStates[index];
        setCollapseStates(newCollapseStates);
    };

    // Función para cerrar todos los colapsos
    const closeCollapse = () => {
        setCollapseOpen(false);
        setCollapseStates(Array(props.routes.length).fill(false));
    };

    // Función para verificar si una ruta está activa
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    // Desestructuración de las propiedades routes y logo
    const { routes, logo } = props;

    // Función para crear los enlaces del menú
    const createLinks = (routes) => {
        return routes.map((route, key) => {
            if (route.subRoutes) {
                const isOpen = collapseStates[key];
                return (
                    <li key={key} className="nav-item">
                        <a
                            href="#pablo"
                            className="nav-link"
                            onClick={() => toggleItemCollapse(key)}
                        >
                            <i className={route.icon} />
                            <div className="d-flex justify-content-between w-100">
                                <span className="nav-link-text">{route.name}</span>
                                {/* Icono de flecha para indicar el estado del colapso */}
                                <i
                                    className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}
                                    style={{ fontSize: '9px', color: '#6c757d' }}
                                />
                            </div>
                        </a>
                        <Collapse isOpen={isOpen}>
                            <ul className="nav-sm flex-column nav">
                                {route.subRoutes.map((subRoute, subKey) => (
                                    <li key={subKey} className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to={subRoute.layout + subRoute.path}
                                            activeClassName="active"
                                        >
                                            <span className="sidenav-mini-icon">{subRoute.miniIcon}</span>
                                            <span className="sidenav-normal">{subRoute.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </Collapse>
                    </li>
                );
            } else {
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

    // Propiedades para el NavbarBrand
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

    // Renderizado del componente Sidebar
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                {/* Botón para alternar el colapso del menú */}
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                {logo ? (
                    <NavbarBrand className="pt-0" {...navbarBrandProps}>
                        <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
                    </NavbarBrand>
                ) : null}
                {/* Usuario (se muestra en dispositivos móviles) */}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav className="nav-link-icon">
                            <i className="ni ni-bell-55" />
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img
                                        alt="..."
                                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                                    />
                                </span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-single-02" />
                                <span>My profile</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-settings-gear-65" />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-calendar-grid-58" />
                                <span>Activity</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-support-16" />
                                <span>Support</span>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/* Colapso del menú */}
                <Collapse navbar isOpen={collapseOpen}>
                    {/* Encabezado del colapso */}
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>

                    {/* Navegación */}
                    <Nav navbar>{createLinks(routes)}</Nav>
                    {/* Divider */}
                    <hr className="my-3" />
                    {/* Encabezado */}
                    <h6 className="navbar-heading text-muted">Documentation</h6>
                    {/* Enlaces de documentación */}
                    <Nav className="mb-md-3" navbar>
                        <NavItem>
                            <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                                <i className="ni ni-spaceship" />
                                Getting started
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

// Propiedades esperadas por el componente Sidebar
Sidebar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        outterLink: PropTypes.string,
        imgSrc: PropTypes.string.isRequired,
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
