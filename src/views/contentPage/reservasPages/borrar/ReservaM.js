import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";
import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardReserva } from "./extraComponents/CardReserva";
import { Filters } from "./extraComponents/Filters";
import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { OptionBtn } from "./extraComponents/OptionBtn";
import myStyles from "../../../assets/css/myStyles.module.css";

const Reserva = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservas, getReservas, , deleteReserva] = useCrud();
    const [reservaList, setReservaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredReservasCount, setFilteredReservasCount] = useState(0);
    const [pages, setPages] = useState();
    const [listaFiltrada, setListaFiltrada] = useState();
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        getReservas("/intimar/reserva");
    }, []);

    const itemsPerPage = 5;

    /* obtengo la cantidad de paginas según la lista */
    useEffect(() => {
        if (!isFilter) {
            setPages(Math.ceil(reservas?.length / itemsPerPage));
        } else {
            setPages(Math.ceil(listaFiltrada?.length / itemsPerPage));
        }
    }, [listaFiltrada, reservas, isFilter]);

    // función para obtener la lista cortada segun los items por pagina
    const getDataPaginate = (data) => {
        const cutArray = getPaginatedData(data, currentPage, itemsPerPage);
        setReservaList(cutArray);
    };

    // pagina actual vuelve a ser 1 si se ha hecho un filtrado
    useEffect(() => {
        if (isFilter) {
            setCurrentPage(1);
        }
    }, [listaFiltrada]);

    // llama a la función getDataPaginate y envía la lista correspondiente del filtrado o los datos enteros
    useEffect(() => {
        if (!isFilter) {
            getDataPaginate(reservas);
            setFilteredReservasCount(reservas?.length); // Actualizar el contador al número total de reservas
        } else {
            getDataPaginate(listaFiltrada);
            setFilteredReservasCount(listaFiltrada?.length); // Actualizar el contador al número total de reservas
        }
    }, [listaFiltrada, reservas, currentPage]);

    console.log("paginas: ", pages);

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
                                    <Filters
                                        reservas={reservas}
                                        setIsFilter={setIsFilter}
                                        setListaFiltrada={setListaFiltrada}
                                    />
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
                                                    <th>Cant. de adultos</th>
                                                    <th>Cant. de niños</th>
                                                    <th>Estado de reserva</th>
                                                    <th>Estado de anticipo</th>
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