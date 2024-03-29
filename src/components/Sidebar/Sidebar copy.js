import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
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

const Sidebar = (props) => {
    const [collapseStates, setCollapseStates] = useState({});

    const toggleCollapse = (key) => {
        setCollapseStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const closeCollapse = () => {
        setCollapseStates({});
    };

    const { routes, logo } = props;

    const createLinks = (routes) => {
        return routes.map((route, key) => {
            if (route.subRoutes) {
                const isOpen = collapseStates[key];
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

    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid className="p-0">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={closeCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {logo ? (
                    <NavbarBrand {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                <Nav navbar>{createLinks(routes)}</Nav>
            </Container>
        </Navbar>
    );
};

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
