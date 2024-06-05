import { Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "api/axiosInstance";

const UserHeader = () => {
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axiosInstance.get("/intimar/employee/profile");
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployeeData();
    }, []);

    return (
        <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
                minHeight: "300px", 
                backgroundImage: "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
                backgroundSize: "cover",
                backgroundPosition: "center top",
            }}
        >
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-7" />
            {/* Header container */}
            <Container className="d-flex align-items-center" fluid>
                <Row>
                    <Col lg="12" className="text-center">
                        {employeeData && ( 
                            <h1 className="display-4 text-white">
                                Bienvenid@, {employeeData.name} {employeeData.lastname}
                            </h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserHeader;
