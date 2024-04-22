import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosInstance";
import myStyles from "../../../assets/css/myStyles.module.css";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";


export const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axiosInstance.get(`/intimar/client/${id}`);
                setCustomer(response.data.client);
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        fetchCustomerDetails();
    }, [id]);

    return (
        <>
            <Container className={myStyles.content} fluid>
                <Row>
                    <Col>
                        <Card className="shadow">
                            <CardHeader>
                                <h1>Detalle del cliente</h1>
                            </CardHeader>
                            <CardBody>
                                {customer ? (
                                    <>
                                        <h2>{customer.name} {customer.lastname}</h2>
                                        <p><strong>Email:</strong> {customer.email}</p>
                                        <p><strong>Teléfono:</strong> {customer.cellphone}</p>
                                        <p><strong>Edad:</strong> {customer.age}</p>
                                        {/* Aquí puedes mostrar otros detalles del cliente */}
                                    </>
                                ) : (
                                    <p>Cargando detalles del cliente...</p>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
