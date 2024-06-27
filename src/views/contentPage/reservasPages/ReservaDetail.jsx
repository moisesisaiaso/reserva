import { useState, useEffect } from "react";
import axiosInstance from "api/axiosInstance";
import myStyles from "../../../assets/css/myStyles.module.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Badge, Button } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

export const ReservaDetail = () => {
    const location = useLocation();
    const reservaId = location.state;
    const [reservaData, setReservaData] = useState(null);
    const navigate = useNavigate();  

    useEffect(() => {
        const fetchReservaData = async () => {
            try {
                const response = await axiosInstance.get(`/intimar/reserva/reservaId/${reservaId}`);
                setReservaData(response.data.reserva);
            } catch (error) {
                console.error("Error al obtener los datos de la reserva:", error);
            }
        };

        fetchReservaData();
    }, [reservaId]);

    
    const getEstadoReservaColor = () => {
        switch (reservaData?.estado_reserva) {
            case "Pendiente a confirmar":
                return "warning";
            case "Cancelada":
                return "danger";
            case "Confirmada":
                return "default";
            case "Lista de espera":
                return "success";
            case "En proceso":
                return "primary";
            case "Finalizada":
                return "dark";
            default:
                return "default";
        }
    };

    const getEstadoAnticipoColor = () => {
        switch (reservaData?.anticipo?.estado_anticipo) {
            case 'Rechazado':
                return 'danger';
            case 'Pendiente':
                return 'warning';
            case 'Confirmado':
            case 'Aprobado':
                return 'success';
            default:
                return 'dark';
        }
    };
    const handleMesa = () => {
            navigate("/admin/mesas/crearAsignacion");
    
    };

    return (
        <Container className={myStyles.content} fluid>
            <Row>
                <Col md={reservaData?.anticipo_required && reservaData?.anticipo ? "6" : "12"}>
                    {reservaData && (
                        <Card className="shadow">
                            <CardHeader>
                                <h1>Detalle de la Reserva con ID: {reservaData.id}</h1>
                            </CardHeader>
                            <CardBody>
                                <h3>Cliente: {reservaData.client?.name} {reservaData.client?.lastname }</h3>
                                <p><strong>Celular:</strong> {reservaData.client?.cellphone}</p>
                                <p><strong>Email:</strong> {reservaData.client?.email || 'N/A'}</p>
                                <p><strong>Fecha de Reserva:</strong> {reservaData.fecha_reserva || 'N/A'}</p>
                                <p><strong>Hora de Reserva:</strong> {reservaData.hora_reserva || 'N/A'}</p>
                                <p><strong>Estado de la Reserva: </strong> 
                                    <Badge color={getEstadoReservaColor()} pill>
                                        {reservaData.estado_reserva || 'N/A'}
                                    </Badge>
                                </p>
                                <p><strong>Motivo de la Reserva:</strong> {reservaData.motivo_reserva || 'N/A'}</p>
                                <p><strong>Adultos:</strong> {reservaData.cant_adultos || 'N/A'}</p>
                                <p><strong>Niños:</strong> {reservaData.cant_ninos || 'N/A'}</p>
                                <p><strong>Anticipo Requerido: </strong> {reservaData.anticipo_required ? 'Sí' : 'No'}</p>
                                <p><strong>Usuario que registró: </strong> {reservaData.usuario?.name || 'N/A'} {reservaData.usuario?.lastname || 'N/A'}</p>
                                <p><strong>Idioma: </strong> {reservaData.client?.languaje|| 'N/A'}</p>
                            </CardBody>
                        </Card>
                    )}
                </Col>
                {reservaData?.anticipo_required && reservaData?.anticipo && (
                    <Col md="6">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>Detalles del Anticipo</h1>
                            </CardHeader>
                            <CardBody>
                                <p><strong>Fecha del Anticipo:</strong> {reservaData.anticipo.fecha_anticipo}</p>
                                <p><strong>Monto del Anticipo:</strong> {reservaData.anticipo.monto_anticipo}</p>
                                <p><strong>Banco:</strong> {reservaData.anticipo.banco}</p>
                                <p><strong>Moneda:</strong> {reservaData.anticipo.moneda}</p>
                                <p><strong>Estado del Anticipo:</strong> 
                                    <Badge color={getEstadoAnticipoColor()} pill>
                                        {reservaData.anticipo.estado_anticipo}
                                    </Badge>
                                </p>
                                {reservaData.anticipo.imagen_anticipo ? (
                                    <div>
                                        <strong>Imagen del Anticipo:</strong><br/>
                                        <img src={reservaData.anticipo.imagen_anticipo} alt="Imagen del Anticipo" style={{ width: '170px', height: '300px', display: 'block' }} />
                                    </div>
                                ) : (
                                    <p>No hay imagen del anticipo disponible</p>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
            <Row>
            <Col md="12">
                {reservaData && (
                    <Card className="shadow mt-4">
                        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1>Horario y Mesa</h1>
                            {reservaData.hora_llegada === "Aún no asignada" || !reservaData.hora_llegada ? (
                                <Button color="info" onClick={handleMesa}>
                                    Asignar Mesas
                                </Button>
                            ) : null}
                        </CardHeader>
                        <CardBody>
                            <p><strong>Hora de Llegada:</strong> {reservaData.hora_llegada || 'Aún no asignada'}</p>                              
                            <p><strong>Mesas Asignadas:</strong></p>
                            <ul>
                                {reservaData.mesas?.length ? (
                                    reservaData.mesas.map((mesa, index) => (
                                        <li key={index}>Mesa {mesa.numero_mesa} - {mesa.ubicacion_mesa}</li>
                                    ))
                                ) : (
                                    <li>Aún no asignada</li>
                                )}
                            </ul>
                            <p><strong>Mozo Asignado:</strong> {reservaData.mozo?.name || '-'} {reservaData.mozo?.lastname || '-'}</p>
                            <p><strong>Hora de Salida:</strong> {reservaData.hora_salida || 'Aún no registrada'}</p>
                        </CardBody>
                    </Card>
                )}
            </Col>
            </Row>
        </Container>
    );
};
