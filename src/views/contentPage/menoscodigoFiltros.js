import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from "reactstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Header from "components/Headers/Header.js";
import { useCrud } from "hooks/useCrud";

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservas, getApi] = useCrud();
    const [filtroHora, setFiltroHora] = useState(null); // Iniciar el filtro a null

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

    const reservasDelDia = reservas ? reservas.filter(
        (reserva) => {
            const fechaReserva = new Date(reserva.fecha_reserva);
            const selected = new Date(selectedDate);

            // Convertir todas las fechas a UTC para compararlas
            const fechaReservaUTC = new Date(fechaReserva.getTime() + fechaReserva.getTimezoneOffset() * 60000);
            const selectedUTC = new Date(selected.getTime() + selected.getTimezoneOffset() * 60000);

            return fechaReservaUTC.getFullYear() === selectedUTC.getFullYear() &&
                fechaReservaUTC.getMonth() === selectedUTC.getMonth() &&
                fechaReservaUTC.getDate() === selectedUTC.getDate() &&
                (filtroHora === null || parseInt(reserva.hora_reserva.split(":")[0]) === filtroHora);
        }
    ) : [];

    const totalReservas = reservasDelDia.length;

    const handleFiltroHoraChange = (e) => {
        setFiltroHora(parseInt(e.target.value));
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <CardHeader>Calendario</CardHeader>
                            <CardBody>
                                <Calendar
                                    onChange={date => setSelectedDate(date)}
                                    value={selectedDate}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                Reservas para el {selectedDate.toLocaleDateString()} ({totalReservas} reservas)
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="filtroHora">Filtrar por hora:</Label>
                                        <Input type="select" name="filtroHora" id="filtroHora" value={filtroHora === null ? "" : filtroHora} onChange={handleFiltroHoraChange}>
                                            <option value="">Todas las horas</option>
                                            {[...Array(24).keys()].map(hour => (
                                                <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                                            ))}
                                            {[...Array(24).keys()].map(hour => (
                                                <option key={hour + 0.5} value={hour + 0.5}>{hour.toString().padStart(2, '0')}:30</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Form>
                                <ListGroup>
                                    {reservasDelDia.length > 0 ? (
                                        reservasDelDia.map((reserva, index) => (
                                            <ListGroupItem key={index}>
                                                {reserva.hora_reserva} -
                                                {reserva.client.name} {reserva.client.lastname} -
                                                Adultos: {reserva.cant_adultos} -
                                                Niños: {reserva.cant_ninos} 

                                                <button onClick={() => console.log(reserva)}>Ver detalle</button>
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
