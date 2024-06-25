import { Link, NavLink, useLocation } from "react-router-dom";
import myStyles from "../../assets/css/myStyles.module.css";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Nav,
    Container,
    Media,
    Navbar,
} from "reactstrap";
import routes from "routes";
import axiosInstance from "api/axiosInstance";
import { useEffect, useState } from "react";
import { error } from "toastr";

const AdminNavbar = (props) => {
    const location = useLocation();
    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const { data } = await axiosInstance.get("/intimar/employee/me");
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const routesArray = location.pathname.replace("/", "").split("/").filter(Boolean);

    const disableNavbar = location.pathname.includes("/admin/calendario") ||
        location.pathname.includes("/admin/user-profile") ||
        location.pathname.includes("/admin/graficas") ||
        location.pathname.includes("/admin/home");


    return (
        <>
            {!disableNavbar && (
                <Navbar
                className={`navbar-top ${
                    location.pathname === "/admin/home" ? "navbar-dark" : ""
                } ${
                    location.pathname !== "/admin/home" && myStyles.navbarContainer
                }`}
                    expand="md"
                    id="navbar-main"
                >
                    <Container fluid>
                        {location.pathname === "/inicio" ? (
                            <>
                                <Link
                                    className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                    to=""
                                >
                                    {props.brandText}
                                </Link>
                            </>
                        ) : (
                            <ul className={myStyles.routeLink}>
                                {routesArray.map((route, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={`${route}`}
                                            activeStyle={{ color: "red" }}
                                        >
                                            / {route}
                                        </NavLink>
                                    </li>
                                ))}
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
                                    <DropdownItem to="/admin/configuracion" tag={Link}>
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Ajustes</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/calendario" tag={Link}>
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Calendario</span>
                                    </DropdownItem>
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
            )}
        </>
    );
};

export default AdminNavbar;