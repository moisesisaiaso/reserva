import myStyles from "../../../assets/css/myStyles.module.css";

import { useEffect, useState } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, UncontrolledTooltip, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";

import { PaginationComponent } from "views/generalComponents/PaginationComponent";

import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { OptionBtn } from "./extraComponents/OptionBtn";
// import { FilterSearch } from "./extraComponents/FilterSearch";
import { Filters } from "../mesasPages/extraComponents/Filters";
import { CardMesa } from "../mesasPages/extraComponents/CardMesa";

const AsignacionMesa = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservaList, setReservaList] = useState();
    const [mesaList, setMesaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [mesas, getMesas, , , updateMesa] = useCrud();
    const [mesasAsignadas, setMesasAsignadas] = useState();
    const [reservasAsignadas, setReservasAsignadas] = useState();
    const [reservas, getReservas, , , , removeAsignacion, finalizarReserva] = useCrud();
    const [updated, setUpdated] = useState(false);
    const [pages, setPages] = useState();
    const [listaFiltrada, setListaFiltrada] = useState();
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
    }, [updated]);

    console.log("liberado;", updated);

    console.log("paginaActual: ", currentPage);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;

    useEffect(() => {
        /* obtener solo las mesas con asignacion de mesa, este dato es para saber solo la cantidad de mesas asignadas */
        if (mesas) {
            const asignadas = mesas?.filter((mesa) => mesa.estado_mesa === false);
            setMesasAsignadas(asignadas);
        }

        if (reservas) {
            /* obtener solo las reservas donde su propiedad hora_llegada sea diferente de null y hora_salida sea igual a null  */
            const asignadas = reservas?.filter(
                (reserva) => reserva.hora_llegada !== null && reserva.hora_salida === null
            );
            setReservasAsignadas(asignadas);
        }
    }, [mesas, reservas, updated]);

    const estados = {
        reservas: reservasAsignadas,
        mesas,
    };

    const isMesaOrReserva = (nombreEstado) => {
        if (!isFilter) {
            setPages(
                Math.ceil(estados[nombreEstado]?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        } else {
            setPages(
                Math.ceil(listaFiltrada?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        }
    };

    /* obtengo la cantidad de paginas según la lista */
    useEffect(() => {
        if (isFilter || isTable) {
            isMesaOrReserva("reservas");
        } else {
            isMesaOrReserva("mesas");
        }
    }, [listaFiltrada, mesas, isFilter, reservas, isTable]);

    // función para obtener la lista cortada segun los items por pagina
    const getDataPaginate = (nombreEstado) => {
        /* paginación y actualización de clientes cuando se realiza un filtrado */
        let cutArray = [];
        if (!isFilter) {
            cutArray = getPaginatedData(estados[nombreEstado], currentPage, itemsPerPage);
        } else {
            cutArray = getPaginatedData(listaFiltrada, currentPage, itemsPerPage);
        }

        if (nombreEstado === "reservas") {
            setReservaList(cutArray);
        } else {
            setMesaList(cutArray);
        }
    };

    // pagina actual vuelve a ser 1 si se ha hecho un filtrado
    useEffect(() => {
        if (isFilter || isTable) {
            setCurrentPage(1);
        }
    }, [listaFiltrada, isTable]);

    // llama a la función getDataPaginate y envía la lista correspondiente del filtrado o los datos enteros
    useEffect(() => {
        if (isTable) {
            getDataPaginate("reservas");
        } else {
            getDataPaginate("mesas");
        }
    }, [listaFiltrada, mesas, reservas, currentPage, isTable]);

    console.log("lista de reserva con mesa:", reservasAsignadas);
    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className={myStyles.clientsHeader}>
                                <h1>Asignación de Mesas</h1>
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
                                    Lista de Mesas Asignadas ({mesasAsignadas?.length}
                                    mesas)
                                </h2>

                                {/* filtros */}
                                <section>
                                    {!isTable && (
                                        <Filters
                                            mesas={mesas}
                                            setListaFiltrada={setListaFiltrada}
                                            setIsFilter={setIsFilter}
                                        />
                                    )}
                                </section>
                                {/* <section>
                                    {isTable ? (
                                        <FilterSearch
                                            reservasAsignadas={reservasAsignadas}
                                            setReservaList={setReservaList}
                                        />
                                    ) : (
                                        <FilterSearch mesas={mesas} setMesaList={setMesaList} />
                                    )}
                                </section> */}

                                {/* tabla */}
                                <section className={myStyles.tableSpacing}>
                                    {isTable ? (
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombre del Cliente</th>
                                                    <th>Fecha de reserva</th>
                                                    <th>Hora de reserva</th>
                                                    <th>Hora de llegada</th>
                                                    <th>Ubicación de mesa</th>
                                                    <th>Número de mesa</th>
                                                    <th>Mozo</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservaList?.map((reserva, i) => (
                                                    <TableComponent
                                                        key={reserva.id}
                                                        reserva={reserva}
                                                        removeAsignacion={removeAsignacion}
                                                        lengthId={i}
                                                        currentPage={currentPage}
                                                        itemsPerPage={itemsPerPage}
                                                        setUpdated={setUpdated}
                                                        updated={updated}
                                                        setIsFilter={setIsFilter}
                                                        finalizarReserva={finalizarReserva}
                                                    />
                                                ))}
                                                {reservaList?.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5">
                                                            No hay reservas con asignaciones para
                                                            mostrar
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : mesaList?.length === 0 ? (
                                        <p className="text-center">No hay mesas para mostrar</p>
                                    ) : (
                                        mesaList?.map((mesa) => (
                                            <CardMesa
                                                key={mesa.id}
                                                mesa={mesa}
                                                reservasAsignadas={reservasAsignadas}
                                                updateMesa={updateMesa}
                                                setUpdated={setUpdated}
                                                updated={updated}
                                                finalizarReserva={finalizarReserva}
                                                setIsFilter={setIsFilter}
                                            />
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

export default AsignacionMesa;
