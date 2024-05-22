import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosInstance";
import myStyles from "../../../assets/css/myStyles.module.css";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";


const EmployeeDetail = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        // Función para obtener los datos del empleado por ID
        const getEmployeeById = async () => {
            try {
                const response = await axiosInstance.get(`/intimar/employee/me`);
                setEmployeeData(response.data.employee);
            } catch (error) {
                console.error("Error al obtener los datos del empleado:", error);
            }
        };

        getEmployeeById(); 
    }, [id]);

    return (
        <>
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={require("../../../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">

                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading">22</span>
                                                <span className="description">Friends</span>
                                            </div>
                                            <div>
                                                <span className="heading">10</span>
                                                <span className="description">Photos</span>
                                            </div>
                                            <div>
                                                <span className="heading">89</span>
                                                <span className="description">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    {employeeData && (
                                        <>
                                            <h3>
                                                {employeeData.name} {employeeData.lastname}
                                            </h3>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2" />
                                                {employeeData.email}
                                            </div>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2" />
                                                {employeeData.cellphone}
                                            </div>
                                            <div>
                                                <i className="ni education_hat mr-2" />
                                                Roles:
                                                <ul>
                                                    {employeeData.roles.map((role, index) => (
                                                        <li key={index}>{role.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <hr className="my-4" />
                                        </>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EmployeeDetail;
