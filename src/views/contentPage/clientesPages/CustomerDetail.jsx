import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "api/axiosInstance";
import myStyles from "../../../assets/css/myStyles.module.css";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

export const CustomerDetail = () => {
    const { id } = useParams();
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        // Función para obtener los datos del cliente por ID
        const getCustomerById = async () => {
            try {
                const response = await axiosInstance.get(`/intimar/client/findById/${id}`);
                setCustomerData(response.data.client);
            } catch (error) {
                console.error("Error al obtener los datos del cliente:", error);
            }
        };

        getCustomerById(); 
    }, [id]);

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <Col>
                        {customerData && ( 
                            <Card className="shadow">
                                <CardHeader>
                                    <h1>Detalle del cliente: {id}</h1>
                                </CardHeader>
                                <CardBody>
                                    {/* <h2>ID: {id}</h2> */}
                                    <h3>Nombre: {customerData.name} {customerData.lastname}</h3>
                                    <p><strong>Email:</strong> {customerData.email}</p>
                                        <p><strong>Teléfono:</strong> +{customerData.countryCode}{customerData.cellphone}</p>           
                                        <p><strong>Dirección:</strong> {customerData.address  || "N/A"}</p>
                                        <p><strong>Alergias:</strong> {customerData.allergies || "N/A"}</p>
                                        <p><strong> DNI </strong>{customerData.dni|| "N/A"} </p>
                                        <p><strong> RUC </strong>{customerData.ruc|| "N/A"} </p>
                                        <p><strong> Numero de pasaporte: </strong>{customerData.numero_pasaporte|| "N/A"} </p>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};
