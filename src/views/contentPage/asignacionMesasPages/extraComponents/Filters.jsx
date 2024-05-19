import { useRef, useState, useEffect } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Form, Input, Col, Row, Button, Label } from "reactstrap";
import { useCrud } from "hooks/useCrud";

export const Filters = ({ reservasAsignadas, setReservaList }) => {
    const inputMes = useRef();
    const inputDia = useRef();
    const inputEstado = useRef();
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [diaEspecifico, setDiaEspecifico] = useState("");
    const [mesSeleccionado, setMesSeleccionado] = useState("");

    // Función para buscar reservas según los criterios de búsqueda
    function searchMesa() {
        const mes = mesSeleccionado;
        const dia = inputDia.current?.value;
        const estadoReserva = inputEstado.current?.value;

        // Verificar si reservasAsignadas está definido
        if (!reservasAsignadas) {
            return;
        }

        // Filtrar por mes, día, hora y estado de reserva
        const filteredMesa = reservasAsignadas.filter((mesa) => {
            let mesMatch = true;
            let diaMatch = true;
            let horaMatch = true;
            let estadoMatch = true;

            // Verificar si el mes coincide
            if (mes !== "") {
                mesMatch = mesa.reserva.fecha_reserva.includes(`-${mes}-`);
            }

            // Verificar si se proporciona un día específico y coincide
            if (dia !== "") {
                diaMatch = mesa.reserva.fecha_reserva.includes(`-${mes}-${dia}`);
            }

            // Verificar si la hora seleccionada coincide
            if (horaSeleccionada !== "") {
                const horaReserva = parseInt(mesa.reserva.hora_reserva.split(":")[0]);
                const horaInicio = parseInt(horaSeleccionada.split(":")[0]);
                const horaFin = horaInicio + 1;

                horaMatch = horaReserva >= horaInicio && horaReserva < horaFin;
            }

            // Verificar si el estado de reserva coincide
            if (estadoReserva !== "") {
                estadoMatch = mesa.reserva.estado_reserva === estadoReserva;
            }

            return mesMatch && diaMatch && horaMatch && estadoMatch;
        });

        setReservaList(filteredMesa);
    }

    // Función para reiniciar la tabla y mostrar todas las reservasAsignadas
    function resetTable() {
        setReservaList(reservasAsignadas);
        // Reiniciar valores de los campos de búsqueda
        inputMes.current.value = "";
        inputDia.current.value = "";
        inputEstado.current.value = "";
        setHoraSeleccionada("");
        setDiaEspecifico("");
        setMesSeleccionado("");
    }

    // UseEffect para invocar la función de búsqueda al cambiar las opciones de búsqueda
    useEffect(() => {
        searchMesa();
    }, [mesSeleccionado, diaEspecifico, horaSeleccionada]);

    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Label for="mes_reserva">Buscar por Mes</Label>
                            <Input
                                type="select"
                                id="mes_reserva"
                                innerRef={inputMes}
                                onChange={(e) => setMesSeleccionado(e.target.value)}
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
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Label for="dia_reserva">Buscar por Día</Label>
                            <Input
                                type="text"
                                id="dia_reserva"
                                placeholder="Día específico"
                                onChange={(e) => setDiaEspecifico(e.target.value)}
                                innerRef={inputDia}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        searchMesa();
                                    }
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <FormGroup>
                            <Label for="hora_reserva">Buscar por Hora</Label>
                            <Input
                                type="select"
                                id="hora_reserva"
                                onChange={(e) => {
                                    setHoraSeleccionada(e.target.value);
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
                            <Label for="estado_reserva">Buscar por Mesa</Label>
                            <Input
                                type="select"
                                id="estado_reserva"
                                innerRef={inputEstado}
                                onChange={searchMesa}
                            >
                                <option value="">Todas las mesas</option>
                                {reservasAsignadas?.map((mesa) => {
                                    return (
                                        <option key={mesa.id} value={mesa.numero_mesa}>
                                            {mesa.ubicacion_mesa} {mesa.numero_mesa}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
                        {/*<Button color="primary" onClick={searchMesa} className="mr-2 mb-2">  Buscar</Button>*/}
                        <Button color="secondary" onClick={resetTable} className="mb-2">
                            Reiniciar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
