import { useEffect, useState } from "react";
import myStyles from "../../../assets/css/myStyles.module.css";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, UncontrolledTooltip, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";

import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardClient } from "./extraComponents/CardClient";
import { Filters } from "./extraComponents/Filters";
import { OptionBtn } from "./extraComponents/OptionBtn";
import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";

const Client = () => {
    const [isTable, setIsTable] = useState(true);
    const [clients, getClients, , deleteClient] = useCrud();
    const [clientList, setClientList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState();
    const [listaFiltrada, setListaFiltrada] = useState();
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        getClients("/intimar/client");
    }, []);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;

    /* obtengo la cantidad de paginas según la lista */
    useEffect(() => {
        if (!isFilter) {
            setPages(
                Math.ceil(clients?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        } else {
            setPages(
                Math.ceil(listaFiltrada?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        }
    }, [listaFiltrada, clients, isFilter]);

    // función para obtener la lista cortada segun los items por pagina
    const getDataPaginate = (data) => {
        const cutArray = getPaginatedData(data, currentPage, itemsPerPage);
        setClientList(cutArray);
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
            getDataPaginate(clients);
        } else {
            getDataPaginate(listaFiltrada);
        }
    }, [listaFiltrada, clients, currentPage]);

    console.log("paginaActual: ", currentPage);

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className={myStyles.clientsHeader}>
                                <h1>Administración de Clientes</h1>
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
                                    Lista de Clientes ({clients?.length} Clientes)
                                </h2>

                                {/* filtros */}
                                <section>
                                    <Filters
                                        clients={clients}
                                        setIsFilter={setIsFilter}
                                        setListaFiltrada={setListaFiltrada}
                                    />
                                </section>

                                {/* tabla */}
                                <section className={myStyles.tableSpacing}>
                                    {isTable ? (
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombre</th>
                                                    <th>Correo Electrónico</th>
                                                    <th>Teléfono</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientList?.map((client, i) => (
                                                    <TableComponent
                                                        key={client.id}
                                                        client={client}
                                                        lengthId={i}
                                                        deleteClient={deleteClient}
                                                        currentPage={currentPage}
                                                        itemsPerPage={itemsPerPage}
                                                    />
                                                ))}
                                                {clientList?.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5">
                                                            No hay clientes para mostrar
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        clientList?.map((client) => (
                                            <CardClient key={client.id} client={client} />
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

export default Client;
