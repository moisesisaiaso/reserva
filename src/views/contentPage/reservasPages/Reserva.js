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
import { set } from "date-fns";

const Reserva = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservas, getReservas, , deleteReserva] = useCrud();
    const [reservaList, setReservaList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredReservasCount, setFilteredReservasCount] = useState(0);
    const [filteredClientesCount, setFilteredClientesCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [listaFiltrada, setListaFiltrada] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        getReservas("/intimar/reserva");
    }, []);

    const itemsPerPage = 10;

    useEffect(() => {
        const totalItems = isFilter ? listaFiltrada?.length || 0 : reservas?.length || 0;
        setPages(Math.ceil(totalItems / itemsPerPage));
    }, [listaFiltrada, reservas, isFilter]);

    const getDataPaginate = (data) => {
        if (data) {
            const cutArray = getPaginatedData(data, currentPage, itemsPerPage);
            setReservaList(cutArray);
        }
    };

    useEffect(() => {
        if (isFilter) {
            setCurrentPage(1);
        }
    }, [listaFiltrada]);

    useEffect(() => {
        const data = isFilter ? listaFiltrada : reservas;
        if (data) {
            getDataPaginate(data);
            setFilteredReservasCount(data.length);
            //obtener la cantidad de personas por fecha
            let totalClientes = 0;
            data?.map(reserva => {
                totalClientes += reserva.cant_adultos + reserva.cant_ninos ;
            });
            console.log (totalClientes);
            setFilteredClientesCount(totalClientes);
            
            
        }
    }, [listaFiltrada, reservas, currentPage, isFilter]);

    const handleFilter = (filteredReservas) => {
        setListaFiltrada(filteredReservas);
        setIsFilter(true);
    };

    useEffect(() => {
        if (!isFilter) {
            getDataPaginate(reservas);
            setFilteredReservasCount(reservas?.length);
        } else {
            getDataPaginate(listaFiltrada);
            setFilteredReservasCount(listaFiltrada?.length); // Corregir aquí para contar los elementos filtrados
        }
    }, [listaFiltrada, reservas, currentPage]);

    // Función para ordenar las reservas por fecha y luego por hora
    const sortReservas = (a, b) => {
        // Ordenar por fecha (de más reciente a más antigua)
        const dateA = new Date(a.fecha_reserva).getTime();
        const dateB = new Date(b.fecha_reserva).getTime();
        if (dateA !== dateB) {
            return dateB - dateA;
        } else {
            // Ordenar por hora (de menor a mayor)
            const timeA = parseInt(a.hora_reserva.replace(":", ""));
            const timeB = parseInt(b.hora_reserva.replace(":", ""));
            return timeA - timeB;
        }
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
                                 Lista de Reservas ({filteredReservasCount} Reservas   
                                    {isFilter && ` / ${filteredClientesCount} Clientes`})
                                </h2>

                                <section>
                                    <Filters
                                        reservas={reservas}
                                        setListaFiltrada={handleFilter}
                                        setIsFilter={setIsFilter}
                                    />
                                </section>

                                <section className={myStyles.tableSpacing}>
                                    {reservaList && reservaList.length > 0 ? (
                                        isTable ? (
                                            <Table striped responsive>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre del Cliente</th>
                                                        <th>Fecha de reserva</th>
                                                        <th>Hora de reserva</th>
                                                        <th>N° adultos</th>
                                                        <th>N° niños</th>
                                                        <th>Estado de reserva</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reservaList
                                                        .sort(sortReservas)
                                                        .map((reserva, i) => (
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
                                            reservaList.map((reserva) => (
                                                <CardReserva key={reserva.id} reserva={reserva} />
                                            ))
                                        )
                                    ) : (
                                        <p>No hay reservas que mostrar</p>
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

