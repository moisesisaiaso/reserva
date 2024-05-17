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
const AsignacionMesa = () => {
    const [isTable, setIsTable] = useState(true);
    const [reservaList, setReservaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [mesas, getMesas] = useCrud();
    const [mesasAsignadas, setMesasAsignadas] = useState();
    const [reservasAsignadas, setReservasAsignadas] = useState();
    const [reservas, getReservas, , , , removeAsignacion] = useCrud();
    const [actualizar, setActualizar] = useState(false);

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
    }, [actualizar]);

    console.log("paginaActual: ", currentPage);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;

    useEffect(() => {
        /* obtener solo las mesas con asignacion de mesa */
        if (mesas) {
            const asignadas = mesas?.filter((mesa) => mesa.estado_mesa === false);
            setMesasAsignadas(asignadas);
        }

        if (reservas) {
            /* obtener solo las reservas con asignaciones */
            const asignadas = reservas?.filter((reserva) => reserva.mesas.length > 0);
            setReservasAsignadas(asignadas);
        }
    }, [mesas, reservas, actualizar]);

    useEffect(() => {
        // Función para obtener los datos paginados
        if (reservasAsignadas) {
            const cutArray = getPaginatedData(reservasAsignadas, currentPage, itemsPerPage);
            console.log("array cortado", cutArray);
            setReservaList(cutArray);
        }
    }, [reservasAsignadas, currentPage]);

    let pages = Math.ceil(
        reservasAsignadas?.length / itemsPerPage
    ); /* este dato es para utilizarlo en la paginación */

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
                                    Lista de Mesas Asignadas x Reserva ({mesasAsignadas?.length}
                                    mesas)
                                </h2>

                                {/* filtros */}
                                <section>
                                    <Filters
                                        reservasAsignadas={reservasAsignadas}
                                        setReservaList={setReservaList}
                                    />
                                </section>

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
                                                        setActualizar={setActualizar}
                                                        actualizar={actualizar}
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

export default AsignacionMesa;
