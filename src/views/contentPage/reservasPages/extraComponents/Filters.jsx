import { useRef, useState, useEffect } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Form, Input, Col, Row, Button, Label } from "reactstrap";

export const Filters = ({ reservas, setListaFiltrada, setIsFilter }) => {
    const inputMes = useRef();
    const inputDia = useRef();
    const inputEstado = useRef();
    const inputCliente = useRef();
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [diaEspecifico, setDiaEspecifico] = useState("");
    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");

    // Función para buscar reservas según los criterios de búsqueda
    function searchReserva() {
        const mes = mesSeleccionado;
        const dia = inputDia.current?.value;
        const estadoReserva = inputEstado.current?.value;
        const nombre = nombreCliente.toLowerCase();
        // Verificar si reservas está definido
        if (!reservas) {
            return;
        }

        // Filtrar por mes, día, hora, estado de reserva, cliente
        const filteredReservas = reservas.filter((reserva) => {
            let mesMatch = true;
            let diaMatch = true;
            let horaMatch = true;
            let estadoMatch = true;
            let clienteMatch = true;

            // Verificar si el mes coincide
            if (mes !== "") {
                mesMatch = reserva.fecha_reserva.includes(`-${mes}-`);
            }
            // Verificar si se proporciona un día específico y coincide
            if (dia !== "") {
                diaMatch = reserva.fecha_reserva.includes(`-${mes}-${dia}`);
            }
            // Verificar si la hora seleccionada coincide

            if (horaSeleccionada !== "") {
                const horaReserva = parseInt(reserva.hora_reserva.split(":")[0]);
                const horaInicio = parseInt(horaSeleccionada.split(":")[0]);
                const horaFin = horaInicio + 1;

                horaMatch = horaReserva >= horaInicio && horaReserva < horaFin;
            }

            // Verificar si el estado de reserva coincide
            if (estadoReserva !== "") {
                estadoMatch = reserva.estado_reserva === estadoReserva;
            }

            if (nombre !== "") {
                const clienteNombreCompleto =
                    `${reserva.client?.name} ${reserva.client?.lastname}`.toLowerCase();
                clienteMatch = clienteNombreCompleto.includes(nombre);
            }

            return mesMatch && diaMatch && horaMatch && estadoMatch && clienteMatch;
        });

        setListaFiltrada(filteredReservas);
        setIsFilter(true);
    }

    // Función para reiniciar la tabla y mostrar todas las reservas
    function resetTable() {
        setListaFiltrada(reservas);
        setIsFilter(false);
        inputMes.current.value = "";
        inputDia.current.value = "";
        inputEstado.current.value = "";
        inputCliente.current.value = "";
        setHoraSeleccionada("");
        setDiaEspecifico("");
        setMesSeleccionado("");
        setNombreCliente("");
    }

    // UseEffect para invocar la función de búsqueda al cambiar las opciones de búsqueda
    /* 
    useEffect(() => {
        searchReserva();
    }, [mesSeleccionado, diaEspecifico, horaSeleccionada, nombreCliente]);
 */
    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <label for="buscar">Buscar por: </label>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Label for="nombre_cliente"> Nombre del Cliente</Label>
                            <Input
                                type="text"
                                id="nombre_cliente"
                                placeholder="Nombre del cliente"
                                onChange={(e) => {
                                    setNombreCliente(e.target.value);
                                    searchReserva();
                                }}
                                innerRef={inputCliente}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Label for="mes_reserva"> Mes</Label>
                            <Input
                                type="select"
                                id="mes_reserva"
                                innerRef={inputMes}
                                onChange={(e) => {
                                    setMesSeleccionado(e.target.value);
                                    searchReserva();
                                }}
                            >
                                <option value="">Todos los meses</option>
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
                            <Label for="dia_reserva"> Día</Label>
                            <Input
                                type="text"
                                id="dia_reserva"
                                placeholder="Día específico"
                                innerRef={inputDia}
                                onChange={(e) => {
                                    setDiaEspecifico(e.target.value);
                                    searchReserva();
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={2}>
                        <FormGroup>
                            <Label for="hora_reserva"> Hora</Label>
                            <Input
                                type="select"
                                id="hora_reserva"
                                onChange={(e) => {
                                    setHoraSeleccionada(e.target.value);
                                    searchReserva();
                                }}
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
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Label for="estado_reserva"> Estado de Reserva</Label>
                            <Input
                                type="select"
                                id="estado_reserva"
                                innerRef={inputEstado}
                                onChange={searchReserva}
                            >
                                <option value="">Todos los estados</option>
                                <option value="Pendiente a confirmar">Pendiente a confirmar</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada">Cancelada</option>
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
