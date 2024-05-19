import myStyles from "../../assets/css/myStyles.module.css";
import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Header from "components/Headers/Header.js";
import { useCrud } from "hooks/useCrud";
import { useNavigate } from "react-router-dom"; 

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservas, getApi] = useCrud();
    const [filtroHora, setFiltroHora] = useState("");
    const navigate = useNavigate();  

    useEffect(() => {
        getReservas();
    }, [selectedDate, filtroHora]);

    const getReservas = async () => {
        try {
            await getApi("/intimar/reserva");
        } catch (error) {
            console.error("Error al obtener reservas:", error);
        }
    };

    const reservasDelDia = reservas ? reservas?.filter(
        (reserva) => {
            const fechaReserva = new Date(reserva?.fecha_reserva);
            const selected = new Date(selectedDate);

            const fechaReservaUTC = new Date(fechaReserva.getTime() + fechaReserva.getTimezoneOffset() * 60000);
            const selectedUTC = new Date(selected.getTime() + selected.getTimezoneOffset() * 60000);

            if (filtroHora) {
                return fechaReservaUTC.getFullYear() === selectedUTC.getFullYear() &&
                    fechaReservaUTC.getMonth() === selectedUTC.getMonth() &&
                    fechaReservaUTC.getDate() === selectedUTC.getDate() &&
                    parseInt(reserva.hora_reserva.split(":")[0]) === parseInt(filtroHora);
            }

            return fechaReservaUTC.getFullYear() === selectedUTC.getFullYear() &&
                fechaReservaUTC.getMonth() === selectedUTC.getMonth() &&
                fechaReservaUTC.getDate() === selectedUTC.getDate();
        }
    ) : [];

    const totalReservas = reservasDelDia.length;

    const handleFiltroHoraChange = (e) => {
        setFiltroHora(e.target.value);
    };

    const handleCreateReserva = () => {
        navigate("/admin/reservas/create");  
    };

    const handleDetail = (id) => {
        navigate("/admin/reservas/detail", { state: id });
    };

    const handleClientDetail = (id) => {
        navigate(`/admin/clients/detail/${id}`);  
    };

    return (
        <>
            <Header />

            <Container className="mt--7" fluid>
                <Row>
                    <Col md="6">
                        <Card className={myStyles.calendarCard}>
                            <CardHeader>
                                Calendario
                                <Button 
                                    color="info" 
                                    className="ml-3" 
                                    onClick={handleCreateReserva} 
                                    style={{ float: 'right' }}>
                                    Crear Reserva
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Calendar
                                    onChange={date => setSelectedDate(date)}
                                    value={selectedDate}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card className={myStyles.reservationsCard}>
                            <CardHeader>
                                Reservas para el {selectedDate.toLocaleDateString()} ({totalReservas} reservas)
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="filtroHora">Filtrar por hora:</Label>
                                        <Input type="select" name="filtroHora" id="filtroHora" value={filtroHora} onChange={handleFiltroHoraChange}>
                                            <option value="">Todas las horas</option>
                                            {[...Array(6).keys()].map(hour => (
                                                <option key={hour + 11} value={hour + 11}>{(hour + 11).toString().padStart(2, '0')}:00</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Form>
                                <ListGroup>
                                    {reservasDelDia.length > 0 ? (
                                        reservasDelDia?.map((reserva, index) => (
                                            <ListGroupItem key={index} className={myStyles.reservationItem}>
                                                <div>
                                                    <strong>{reserva?.hora_reserva}</strong> - {reserva?.client?.name} {reserva?.client?.lastname}
                                                </div>
                                                <div>
                                                    Adultos: {reserva?.cant_adultos}, Niños: {reserva?.cant_ninos}
                                                </div>
                                                <Button color="info" size="sm" onClick={() => handleDetail(reserva.id)}>Ver detalle</Button>
                                                {/* <Button color="info" size="sm" onClick={() => handleClientDetail(reserva?.client.id)}>Detalle Cliente</Button> */}
                                            </ListGroupItem>
                                        ))
                                    ) : (
                                        <ListGroupItem>No hay reservas para este día</ListGroupItem>
                                    )}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Calendario;