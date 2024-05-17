import React from "react";
import fondo from "../assets/img/fondo.png";
import myStyles from "../assets/css/myStyles.module.css";

import { useLocation } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import Login from "../views/contentPage/Login";

const Auth = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <>
            <img src={fondo} alt="fondo" className={myStyles.authLoding} />
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
                <div className="header bg-gradient-info py-7 py-lg-8">
                    <Container className="mt--5">
                        <div className={`header-body text-center mb-6 ${myStyles.welcome}`}>
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Bienvenido !</h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                {/* Page content */}
                <Container className="mt--9 pb-5">
                    <Row className="justify-content-center">
                        <Login />
                    </Row>
                </Container>
            </div>
            <AuthFooter />
        </>
    );
};

export default Auth;
