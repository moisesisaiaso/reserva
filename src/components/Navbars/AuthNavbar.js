import myStyles from "../../assets/css/myStyles.module.css";

// reactstrap components
import { NavbarBrand, Navbar, Container } from "reactstrap";

const AdminNavbar = () => {
    return (
        <>
            <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                <Container className="px-4">
                    <NavbarBrand>
                        <img
                            alt="..."
                            src={require("../../assets/img/brand/logo1.png")}
                            className={myStyles.brandAuth}
                        />
                    </NavbarBrand>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
