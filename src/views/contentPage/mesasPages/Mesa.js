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
    const [mesas, getMesas, , deleteMesa, updateMesa] = useCrud();
    const [mesaList, setMesaList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [updated, setUpdated] = useState(false);
    const [pages, setPages] = useState();
    const [listaFiltrada, setListaFiltrada] = useState();
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        getMesas("/intimar/mesa");
    }, [updated]);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;
    /* obtengo la cantidad de paginas según la lista */
    useEffect(() => {
        if (!isFilter) {
            setPages(
                Math.ceil(mesas?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        } else {
            setPages(
                Math.ceil(listaFiltrada?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        }
    }, [listaFiltrada, mesas, isFilter]);

    // función para obtener la lista cortada segun los items por pagina
    const getDataPaginate = (data) => {
        const cutArray = getPaginatedData(data, currentPage, itemsPerPage);
        setMesaList(cutArray);
    };

    // pagina actual vuelve a ser 1 si se ha hecho un filtrado
    useEffect(() => {
        if (isFilter) {
            setCurrentPage(1);
        }
    }, [listaFiltrada]);

    // llama a la función getDataPaginate y envía la lista correspondiente del filtrado o los datos enteros
    useEffect(() => {
        /* paginación y actualización de clientes cuando se realiza un filtrado */
        if (!isFilter) {
            getDataPaginate(mesas);
        } else {
            getDataPaginate(listaFiltrada);
        }
    }, [listaFiltrada, mesas, currentPage]);

    console.log("paginaActual: ", currentPage);

    // useEffect(() => {
    //     /* Obtengo la frecuencia de cada ubicación */
    //     const frecuencia = {};

    //     mesas?.forEach((mesa) => {
    //         frecuencia[mesa.ubicacion_mesa] = (frecuencia[mesa.ubicacion_mesa] || 0) + 1;
    //     });

    //     console.log(frecuencia);
    //     /* obtengo el array por frecuencia */
    //     const ordenado = mesas?.sort((a, b) => {
    //         return frecuencia[b] - frecuencia[a];
    //     });

    // }, []);

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
                                        <FilterSearch
                                            mesas={mesas}
                                            setListaFiltrada={setListaFiltrada}
                                            setIsFilter={setIsFilter}
                                        />
                                    ) : (
                                        <Filters
                                            mesas={mesas}
                                            setListaFiltrada={setListaFiltrada}
                                            setIsFilter={setIsFilter}
                                        />
                                    )}
                                </section>

                                {/* tabla */}
                                <section className={myStyles.tableSpacing}>
                                    {isTable ? (
                                        <Table striped responsive>
                                            {/* Encabezados de la tabla */}
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
                                                {/* Verificar si hay mesas en la lista para mostrar */}
                                                {mesaList?.length > 0 ? (
                                                    mesaList.map((mesa, i) => (
                                                        <TableComponent
                                                            key={mesa.id}
                                                            mesa={mesa}
                                                            lengthId={i}
                                                            deleteMesa={deleteMesa}
                                                            currentPage={currentPage}
                                                            itemsPerPage={itemsPerPage}
                                                        />
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No hay mesas para mostrar
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        // Si no estás mostrando la tabla, mostrar las tarjetas
                                        mesaList?.length > 0 ? (
                                            mesaList.map((mesa) => (
                                                <CardMesa
                                                    key={mesa.id}
                                                    mesa={mesa}
                                                    updateMesa={updateMesa}
                                                    updated={updated}
                                                    setUpdated={setUpdated}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-center">No hay mesas para mostrar</p>
                                        )
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