import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
    const [reservas, getReservas] = useCrud();
    const [mesas, getMesas] = useCrud();
    const [clients, getClientes] = useCrud();
    const [aforo, setAforo] = useState(0);
    const [porcentajeCapacidad, setPorcentajeCapacidad] = useState();
    const [totalAsignadas, setTotalAsignadas] = useState(0);
    const [mesasDisponibles, setMesasDisponibles] = useState(0);
    const [clientesEnMesas, setClientesEnMesas] = useState(0); // Nuevo estado

    useEffect(() => {
        getReservas("intimar/reserva");
        getMesas("intimar/mesa");
        getClientes("intimar/client");
    }, []);

    useEffect(() => {
        let aforoByReserva = 0;
        let clientesTotal = 0; // Variable temporal para contar clientes
        if (reservas) {
            /* obtener solo las reservas donde su propiedad hora_llegada sea diferente de null y hora_salida sea igual a null  */
            const asignadas = reservas?.filter(
                (reserva) => reserva.hora_llegada !== null && reserva.hora_salida === null
            );

            asignadas.forEach((reserva) => {
                const adultos = parseInt(reserva.cant_adultos);
                const ninos = parseInt(reserva.cant_ninos);

                aforoByReserva += adultos + ninos;
                clientesTotal += adultos + ninos; // Sumar clientes por reserva
            });

            setClientesEnMesas(clientesTotal); // Actualizar estado con total de clientes en mesas

            for (let i = 0; i <= aforoByReserva; i++) {
                setTimeout(() => {
                    setAforo(i);
                }, i * 100); /* con i * 100 permite que cada que se llame a setAforo es decir cuando i llegue a el seter se le de un tiempo distinto a cada acceso de esta manera no se ejecuta todos al mismo tiempo*/
            }

            /* porcentaje de capacidad total */
            const porcentaje = (aforoByReserva / 60) * 100;
            console.log("porcentaje: ", porcentaje);
            for (let i = 0; i <= porcentaje; i++) {
                setTimeout(() => {
                    setPorcentajeCapacidad(i);
                }, i * 100);
            }

            setTotalAsignadas(asignadas.length);
        }
    }, [reservas]);

    useEffect(() => {
        if (mesas) {
            const asignadas = mesas?.filter((mesa) => mesa.estado_mesa === true);
            setMesasDisponibles(asignadas.length);
        }
    }, [mesas]);

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Aforo máximo
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">60</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-right" />{" "}
                                                {porcentajeCapacidad} %
                                            </span>{" "}
                                            <span className="text-nowrap">de cap. total</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Aforo actual
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {aforo}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-right" /> De{" "}
                                                {totalAsignadas}
                                            </span>
                                            <span className="text-nowrap">Reservas</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-rightpercase text-muted mb-0"
                                                >
                                                    MESAS DISPONIBLES
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {mesasDisponibles}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-pie" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-danger mr-2">
                                                <i className="fas fa-arrow-right" /> Ocupadas:{" "}
                                                {totalAsignadas}
                                            </span>{" "}
                                            <span className="text-nowrap">Mesas</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Clientes Totales
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {clients?.length}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-warning mr-2">
                                                <i className="fas fa-arrow-right" /> .
                                            </span>{" "}
                                            <span className="text-nowrap">este mes </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
