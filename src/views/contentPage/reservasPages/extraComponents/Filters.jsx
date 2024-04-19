import { useRef, useState, useEffect } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row,
    Button,
    Label,
} from "reactstrap";

export const Filters = ({ reservas, setReservaList }) => {
    const inputMes = useRef();
    const inputDia = useRef();
    const inputEstado = useRef();
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [diaEspecifico, setDiaEspecifico] = useState("");
    const [mesSeleccionado, setMesSeleccionado] = useState("");

    // Función para buscar reservas según los criterios de búsqueda
    function searchReserva() {
        const mes = mesSeleccionado;
        const dia = inputDia.current?.value;
        const estadoReserva = inputEstado.current?.value;

        // Verificar si reservas está definido
        if (!reservas) {
            return;
        }

        // Filtrar por mes, día, hora y estado de reserva
        const filteredReservas = reservas.filter((reserva) => {
            let mesMatch = true;
            let diaMatch = true;
            let horaMatch = true;
            let estadoMatch = true;

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

            return mesMatch && diaMatch && horaMatch && estadoMatch;
        });

        setReservaList(filteredReservas);
    }

    // Función para reiniciar la tabla y mostrar todas las reservas
    function resetTable() {
        setReservaList(reservas);
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
        searchReserva();
    }, [mesSeleccionado, diaEspecifico, horaSeleccionada]);

    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <Row>
                    <Col>
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
                    <Col>
                        <FormGroup>
                            <Label for="dia_reserva">Buscar por Día</Label>
                            <Input
                                type="text"
                                id="dia_reserva"
                                placeholder="Día específico"
                                onChange={(e) => setDiaEspecifico(e.target.value)}
                                innerRef={inputDia}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        searchReserva();
                                    }
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
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
                    <Col>
                        <FormGroup>
                            <Label for="estado_reserva">Buscar por Estado de Reserva</Label>
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
                </Row>
                <Col>
                        <div className="text-right"> {/* Envuelve los botones en un div y aplica la clase text-right */}
                            {/* <Button color="primary" onClick={searchReserva}>
                                Buscar
                            </Button> */}
                            <Button color="secondary" onClick={resetTable}>
                                Reiniciar
                            </Button>
                        </div>
                    </Col>
            </Form>
        </div>
    );
};
