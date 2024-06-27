import React, { useRef, useState, useEffect } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import {
    FormGroup,
    Form,
    Input,
    Col,
    Row,
    Button,
} from "reactstrap";

export const Filters = ({ reservas, setListaFiltrada }) => {
    const inputMes = useRef(null);
    const inputDia = useRef(null);
    const inputEstado = useRef(null);
    const inputCliente = useRef(null);
    const inputIdReserva = useRef(null);
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [diaEspecifico, setDiaEspecifico] = useState("");
    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [idReserva, setIdReserva] = useState("");

    // Función para buscar reservas según los criterios de búsqueda
    function searchReserva() {
        if (!reservas) return; // Validar que reservas esté definido
        const filteredReservas = reservas.filter((reserva) => {
            let mesMatch = true;
            let diaMatch = true;
            let horaMatch = true;
            let estadoMatch = true;
            let clienteMatch = true;
            let fechaMatch = true;
            let idMatch = true; // Initialize ID match

            if (mesSeleccionado !== "") {
                mesMatch = reserva.fecha_reserva.includes(`-${mesSeleccionado}-`);
            }

            if (diaEspecifico !== "") {
                diaMatch = reserva.fecha_reserva.includes(`-${mesSeleccionado}-${diaEspecifico}`);
            }

            if (horaSeleccionada !== "") {
                const horaReserva = parseInt(reserva.hora_reserva.split(":")[0]);
                const horaInicio = parseInt(horaSeleccionada.split(":")[0]);
                const horaFin = horaInicio + 1;
                horaMatch = horaReserva >= horaInicio && horaReserva < horaFin;
            }

            if (inputEstado.current && inputEstado.current.value !== "") {
                estadoMatch = reserva.estado_reserva === inputEstado.current.value;
            }

            if (nombreCliente !== "") {
                const clienteNombreCompleto = `${reserva.client?.name} ${reserva.client?.lastname}`.toLowerCase();
                clienteMatch = clienteNombreCompleto.includes(nombreCliente.toLowerCase());
            }

            if (fechaSeleccionada !== "") {
                fechaMatch = reserva.fecha_reserva === fechaSeleccionada;
            }

            if (idReserva !== "") {
                idMatch = reserva.id.toString() === idReserva;
            }

            return mesMatch && diaMatch && horaMatch && estadoMatch && clienteMatch && fechaMatch && idMatch;
        });

        setListaFiltrada(filteredReservas);
    }

    // Función para reiniciar la tabla y mostrar todas las reservas
    function resetTable() {
        setListaFiltrada(reservas);
        setMesSeleccionado("");
        setDiaEspecifico("");
        setHoraSeleccionada("");
        setNombreCliente("");
        setFechaSeleccionada("");
        setIdReserva(""); // Reset reservation ID

        if (inputMes.current) inputMes.current.value = "";
        if (inputDia.current) inputDia.current.value = "";
        if (inputEstado.current) inputEstado.current.value = "";
        if (inputCliente.current) inputCliente.current.value = "";
        if (inputIdReserva.current) inputIdReserva.current.value = ""; // Reset ID input value
    }

    // UseEffect para invocar la función de búsqueda al cambiar las opciones de búsqueda
    useEffect(() => {
        searchReserva();
    }, [mesSeleccionado, diaEspecifico, horaSeleccionada, nombreCliente, fechaSeleccionada, idReserva]); // Include idReserva in dependencies

    // Define handleFechaSeleccionada function to set the selected date
    const handleFechaSeleccionada = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <Row>
                    <Col xs={12} sm={6} md={1}>
                        <FormGroup>
                            <Input
                                type="text"
                                id="id_reserva"
                                placeholder="Buscar por ID de reserva"
                                value={idReserva}
                                onChange={(e) => setIdReserva(e.target.value)}
                                innerRef={inputIdReserva}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Input
                                type="text"
                                id="nombre_cliente"
                                placeholder="Buscar por nombre del cliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                innerRef={inputCliente}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Input
                                type="date"
                                id="fecha_reserva"
                                placeholder="Buscar por fecha"
                                value={fechaSeleccionada}
                                onChange={(e) => handleFechaSeleccionada(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Input
                                type="select"
                                id="mes_reserva"
                                value={mesSeleccionado}
                                onChange={(e) => setMesSeleccionado(e.target.value)}
                                innerRef={inputMes}
                            >
                                <option value="">Buscar por meses</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Input
                                type="select"
                                id="hora_reserva"
                                value={horaSeleccionada}
                                onChange={(e) => setHoraSeleccionada(e.target.value)}
                            >
                                <option value="">Todas las horas</option>
                                <option value="11:00">11:00 am</option>
                                <option value="12:00">12:00 pm</option>
                                <option value="13:00">1:00 pm</option>
                                <option value="14:00">2:00 pm</option>
                                <option value="15:00">3:00 pm</option>
                                <option value="16:00">4:00 pm</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Input
                                type="select"
                                id="estado_reserva"
                                value={inputEstado.current ? inputEstado.current.value : ""}
                                onChange={() => searchReserva()}
                                innerRef={inputEstado}
                            >
                                <option value="">Todos los estados</option>
                                <option value="Pendiente a confirmar">Pendiente a confirmar</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada">Cancelada</option>
                                <option value="Lista de espera">Lista de espera</option>
                                <option value="En proceso">En proceso</option>
                                <option value="Finalizada">Finalizada</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
                        <Button color="secondary" onClick={resetTable} className="mb-2">
                            Reiniciar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
