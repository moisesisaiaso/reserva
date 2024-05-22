import React, { useState, useEffect } from "react";
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
import axiosInstance from "api/axiosInstance";

const EmployeeDetail = () => {
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
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
                <Row className="justify-content-center"> {/* Centra la tarjeta */}
                    <Col lg="6" md="8">
                        {employeeData && (
                            <Card className="card-profile shadow">
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    {/* <div className="d-flex justify-content-between">
                                        <Button
                                            className="mr-4"
                                            color="info"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Regresar a inicio
                                        </Button>
                                    </div> */}
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <div className="text-center">
                                        <Row className="justify-content-center mb-9"> 
                                            <Col lg="3">
                                                <div className="card-profile-image">
                                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                        <img
                                                            alt="..."
                                                            className="rounded-circle"
                                                            src={require("../../assets/img/theme/team-4-800x800.png")}
                                                        />
                                                    </a>
                                                </div>
                                            </Col>
                                        </Row>

                                        <h3>
                                            {employeeData.name} {employeeData.lastname}
                                        </h3>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {employeeData.roles ? employeeData.roles.join(", ") : ""}
                                        </div>
                                        <hr className="my-4" />
                                        <p><strong> Email: </strong>  {employeeData.email} </p>
                                        <p>
                                            <strong> Teléfono: </strong> {employeeData.cellphone}
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EmployeeDetail;
