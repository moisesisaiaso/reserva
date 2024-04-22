import myStyles from "../../../assets/css/myStyles.module.css";

import { useEffect, useState } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, UncontrolledTooltip, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";

import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardReserva } from "./extraComponents/CardReserva";
import { Filters } from "./extraComponents/Filters";

import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { OptionBtn } from "./extraComponents/OptionBtn";

const Reserva = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservas, getReservas, , deleteReserva] = useCrud();
    const [reservaList, setReservaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getReservas("/intimar/reserva");
    }, []);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    const itemsPerPage = 5;

    const pages = Math.ceil(
        reservas?.length / itemsPerPage
    ); /* este dato es para utilizarlo en la paginación */

    console.log("paginaActual: ", currentPage);

    useEffect(() => {
        // Función para obtener los datos paginados
        const cutArray = getPaginatedData(reservas, currentPage, itemsPerPage);
        setReservaList(cutArray);
    }, [reservas, currentPage]);

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className={myStyles.clientsHeader}>
                                <h1>Administración de Reservas</h1>
                                <a href="">
                                    <i className="ni ni-collection fa-2x" />
                                </a>
                            </CardHeader>
                            <CardBody>
                                {/* crear - tabla, tarjetas */}
                                <section className={myStyles.clientsSection}>
                                    <OptionBtn setIsTable={setIsTable} />
                                </section>

                                <h2 className={myStyles.clientsH2}>
                                    Lista de Reservas ({reservas?.length} Reservas)
                                </h2>

                                {/* filtros */}
                                <section>
                                    <Filters reservas={reservas} setReservaList={setReservaList} />
                                </section>

                                {/* Tabla o tarjetas */}
                                <section className={myStyles.tableSpacing}>
                                    {reservaList && reservaList.length === 0 ? (
                                        <p>No hay reservas que mostrar</p>
                                    ) : isTable ? (
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombre del Cliente</th>
                                                    <th>Fecha de reserva</th>
                                                    <th>Hora de reserva</th>
                                                    <th>Cant. de adultos</th>
                                                    <th>Cant. de niños</th>
                                                    <th>Estado de reserva</th>
                                                    <th>Estado de anticipo</th>
                                                    {/* <th>Motivo de reserva</th> */}
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservaList?.map((reserva, i) => (
                                                    <TableComponent
                                                        key={reserva.id}
                                                        reserva={reserva}
                                                        lengthId={i}
                                                        deleteReserva={deleteReserva}
                                                        currentPage={currentPage}
                                                        itemsPerPage={itemsPerPage}
                                                    />
                                                ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        reservaList?.map((reserva) => (
                                            <CardReserva key={reserva.id} reserva={reserva} />
                                        ))
                                    )}
                                </section>

                                {/* Paginación */}
                                <section>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pages={pages}
                                    />
                                </section>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Reserva;
