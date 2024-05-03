import { useEffect, useState } from "react";
import myStyles from "../../../assets/css/myStyles.module.css";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, UncontrolledTooltip, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";

import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardMesa } from "./extraComponents/CardMesa";
import { Filters } from "./extraComponents/Filters";
import { OptionBtn } from "./extraComponents/OptionBtn";
import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { FilterSearch } from "./extraComponents/FilterSearch";

const Mesa = () => {
    const [isTable, setIsTable] = useState(true);
    const [mesas, getMesas, , deleteMesa] = useCrud();
    const [mesaList, setMesaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getMesas("/intimar/mesa");
    }, []);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;

    let pages = Math.ceil(
        mesas?.length / itemsPerPage
    ); /* este dato es para utilizarlo en la paginación */

    console.log("paginaActual: ", currentPage);

    useEffect(() => {
        // Función para obtener los datos paginados
        const cutArray = getPaginatedData(mesas, currentPage, itemsPerPage);
        setMesaList(cutArray);
    }, [mesas, currentPage]);

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className={myStyles.clientsHeader}>
                                <h1>Administración de Mesas</h1>
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
                                    Lista de Mesas ({mesas?.length} Mesas)
                                </h2>

                                {/* filtros */}
                                <section>
                                    {isTable ? (
                                        <FilterSearch mesas={mesas} setMesaList={setMesaList} />
                                    ) : (
                                        <Filters mesas={mesas} setMesaList={setMesaList} />
                                    )}
                                </section>

                                {/* tabla */}
                                <section className={myStyles.tableSpacing}>
                                    {isTable ? (
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Ubicación de Mesa</th>
                                                    <th>Número de Mesa</th>
                                                    <th>Estado de Mesa</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mesaList?.map((mesa, i) => (
                                                    <TableComponent
                                                        key={mesa.id}
                                                        mesa={mesa}
                                                        lengthId={i}
                                                        deleteMesa={deleteMesa}
                                                        currentPage={currentPage}
                                                        itemsPerPage={itemsPerPage}
                                                    />
                                                ))}
                                                {mesaList?.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5">
                                                            No hay mesas para mostrar
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        mesaList?.map((mesa) => (
                                            <CardMesa key={mesa.id} mesa={mesa} />
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

export default Mesa;
