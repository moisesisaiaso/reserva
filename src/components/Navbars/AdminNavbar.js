import { Link, NavLink, useLocation } from "react-router-dom";
import myStyles from "../../assets/css/myStyles.module.css";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
} from "reactstrap";
import routes from "routes";
import axiosInstance from "api/axiosInstance";
import { useEffect, useState } from "react";
import { error } from "toastr";

const AdminNavbar = (props) => {
    const location = useLocation();
    const [user, setUser] = useState();

    const getUser = async () => {
        const data = await axiosInstance
            .get("/intimar/employee/me")
            .then(({ data }) => setUser(data))
            .catch((error) => console.log(error));
        console.log("user: ", data);
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = () => {
        // Elimina todos los datos del localStorage
        localStorage.clear();
        window.location.href = "/login";
    };

    const currentRoute = location.pathname.replace("/", ""); /* Elimino el primero / de la url */
    const routesArray = currentRoute.split("/");
    routesArray.shift();
    console.log(routesArray);

    const navbarDark = location.pathname === "/admin/home" ? "navbar-dark" : "";

    return (
        <>
            <Navbar
                className={`navbar-top ${navbarDark} ${
                    location.pathname !== "/admin/home" && myStyles.navbarContainer
                }`}
                expand="md"
                id="navbar-main"
            >
                <Container fluid>
                    {location.pathname === "/admin/home" ? (
                        <>
                            <Link
                                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                to="/"
                            >
                                {props.brandText}
                            </Link>
                            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                                <FormGroup className="mb-0">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Search" type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </Form> */}
                        </>
                    ) : (
                        <ul className={myStyles.routeLink}>
                            <li>
                                <NavLink to="/admin/home">Inicio</NavLink>
                            </li>
                            {routesArray.map((route, i) => {
                                if (i === 0) {
                                    return (
                                        <li key={i}>
                                            <NavLink
                                                to={`/admin/${route}`}
                                                activeStyle={{ color: "red" }}
                                            >
                                                / {route}
                                            </NavLink>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={i}>
                                            <NavLink
                                                to={location.pathname}
                                                activeStyle={{ color: "red" }}
                                            >
                                                / {route}
                                            </NavLink>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    )}
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img
                                            alt="..."
                                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                        />
                                    </span>
                                    <Media className="ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm font-weight-bold">
                                            {`${user?.name} ${user?.lastname}`}
                                        </span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Bienvenid@!</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-single-02" />
                                    <span>Mi perfil</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-settings-gear-65" />
                                    <span>Ajustes</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-calendar-grid-58" />
                                    <span>Calendario</span>
                                </DropdownItem>
                                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-support-16" />
                                    <span>Support</span>
                                </DropdownItem> */}
                                <DropdownItem divider />
                                <DropdownItem href="#pablo" onClick={handleLogout}>
                                    <i className="ni ni-user-run" />
                                    <span>Cerrar sesión</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
