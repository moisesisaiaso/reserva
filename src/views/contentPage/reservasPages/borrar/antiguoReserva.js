import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";
import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardReserva } from "../extraComponents/CardReserva";
import { Filters } from "../extraComponents/Filters";
import { TableComponent } from "../extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { OptionBtn } from "../extraComponents/OptionBtn";
import myStyles from "../../../assets/css/myStyles.module.css";

const Reserva = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservas, getReservas, , deleteReserva] = useCrud();
    const [reservaList, setReservaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredReservasCount, setFilteredReservasCount] = useState(0);

    useEffect(() => {
        getReservas("/intimar/reserva");
    }, []);

    const itemsPerPage = 5;
    const pages = Math.ceil(reservas?.length / itemsPerPage);

    useEffect(() => {
        const cutArray = getPaginatedData(reservas, currentPage, itemsPerPage);
        setReservaList(cutArray);
        setFilteredReservasCount(reservas?.length); // Actualizar el contador al número total de reservas
    }, [reservas, currentPage]);

    const handleFilter = (filteredReservas) => {
        setReservaList(filteredReservas);
        setFilteredReservasCount(filteredReservas.length);
    };

    return (
        <>
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
                                <section className={myStyles.clientsSection}>
                                    <OptionBtn setIsTable={setIsTable} />
                                </section>

                                <h2 className={myStyles.clientsH2}>
                                    Lista de Reservas ({filteredReservasCount} Reservas)
                                </h2>

                                <section>
                                    <Filters reservas={reservas} setReservaList={handleFilter} />
                                </section>

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
                                                    <th>N° adultos</th>
                                                    <th>N° niños</th>
                                                    <th>Estado de reserva</th>
                                                    {/* <th>Estado de anticipo</th> */}
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
