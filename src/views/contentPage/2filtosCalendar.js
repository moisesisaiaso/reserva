import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from "reactstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Header from "components/Headers/Header.js";
import { useCrud } from "hooks/useCrud";

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservas, getApi] = useCrud();
    const [filtroHoraInicio, setFiltroHoraInicio] = useState(11);
    const [filtroHoraFin, setFiltroHoraFin] = useState(16); // 16 para las 4pm

    useEffect(() => {
        getReservas();
    }, [selectedDate, filtroHoraInicio, filtroHoraFin]);

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
                parseInt(reserva.hora_reserva.split(":")[0]) >= filtroHoraInicio &&
                parseInt(reserva.hora_reserva.split(":")[0]) <= filtroHoraFin;
        }
    ) : [];

    const totalReservas = reservasDelDia.length;

    const handleFiltroHoraInicioChange = (e) => {
        setFiltroHoraInicio(parseInt(e.target.value));
    };

    const handleFiltroHoraFinChange = (e) => {
        setFiltroHoraFin(parseInt(e.target.value));
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
                                        <Label for="filtroHoraInicio">Filtrar desde:</Label>
                                        <Input type="select" name="filtroHoraInicio" id="filtroHoraInicio" value={filtroHoraInicio} onChange={handleFiltroHoraInicioChange}>
                                            {[...Array(16).keys()].map(hour => (
                                                <option key={hour + 1} value={hour + 1}>{(hour + 1).toString().padStart(2, '0')}:00</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="filtroHoraFin">Filtrar hasta:</Label>
                                        <Input type="select" name="filtroHoraFin" id="filtroHoraFin" value={filtroHoraFin} onChange={handleFiltroHoraFinChange}>
                                            {[...Array(16).keys()].map(hour => (
                                                <option key={hour + 1} value={hour + 1}>{(hour + 1).toString().padStart(2, '0')}:00</option>
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
