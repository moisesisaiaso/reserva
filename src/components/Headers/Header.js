import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";
import axiosInstance from "api/axiosInstance";

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
    const [reservas, getReservas] = useCrud();
    const [mesas, getMesas] = useCrud();
    const [clients, getClientes] = useCrud();
    const [aforo, setAforo] = useState(0);
    const [porcentajeCapacidad, setPorcentajeCapacidad] = useState();
    const [totalAsignadas, setTotalAsignadas] = useState(0);
    const [mesasDisponibles, setMesasDisponibles] = useState(0);
    const [mesasOcupadas, setMesasOcupadas] = useState(0); // Nuevo estado
    const [configuracion, setConfiguracion] = useState({});
    const [totalClientesHoy, setTotalClientesHoy] = useState(0);

    useEffect(() => {
        getReservas("intimar/reserva");
        getMesas("intimar/mesa");
        getClientes("intimar/client");
    }, []);
    useEffect(() => {
        const fetchConfiguracion = async () => {
            try {
                const response = await axiosInstance.get("/intimar/configuracion");
                const config = response.data.data;
                setConfiguracion(config);
            } catch (error) {
                console.error("Error fetching configuration data:", error);
            }
        };

        fetchConfiguracion();
    }, []);

    useEffect(() => {
        let aforoByReserva = 0;
        // Variable temporal para contar clientes
        if (reservas) {
            /* obtener solo las reservas donde su propiedad hora_llegada sea diferente de null y hora_salida sea igual a null  */
            const asignadas = reservas?.filter(
                (reserva) => reserva.hora_llegada !== null && reserva.hora_salida === null
            );

            asignadas.forEach((reserva) => {
                const adultos = parseInt(reserva.cant_adultos);
                const ninos = parseInt(reserva.cant_ninos);

                aforoByReserva += adultos + ninos;
            });

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
            const disponibles = mesas?.filter((mesa) => mesa.estado_mesa === true);
            setMesasDisponibles(disponibles.length);

            const ocupadas = mesas.length - disponibles.length;
            setMesasOcupadas(ocupadas);
        }
    }, [mesas]);


    // Obtener la cantidad de clientes acumulados del día
    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
        const yyyy = today.getFullYear();
        const diaActual = `${yyyy}-${mm}-${dd}`;

        if (reservas) {
            console.log("Reservas:", reservas);
            const reservasHoy = reservas.filter(
                (reserva) => reserva.fecha_reserva === diaActual && (reserva.estado_reserva === "Finalizada" || reserva.estado_reserva === "En proceso")
            );
            console.log("Reservas de hoy:", reservasHoy);
            let totalClientes = 0;
            reservasHoy.forEach((reserva) => {
                totalClientes += reserva.cant_adultos + reserva.cant_ninos;
            });
            console.log("Total clientes hoy:", totalClientes);
            setTotalClientesHoy(totalClientes);
        }
    }, [reservas]);



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
                                                <span className="h2 font-weight-bold mb-0">{configuracion.aforo}</span> 
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
                                                {mesasOcupadas}
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
                                                    {totalClientesHoy}
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
                                            <span className="text-nowrap">hoy </span>
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
