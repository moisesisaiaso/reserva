import { useEffect, useState } from "react";
import myStyles from "../../../assets/css/myStyles.module.css";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, UncontrolledTooltip, Table } from "reactstrap";
import { useCrud } from "hooks/useCrud";

import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardClient } from "./extraComponents/client/CardClient";
import { Filters } from "./extraComponents/client/Filters";
import { OptionBtn } from "./extraComponents/client/OptionBtn";
import { TableComponent } from "./extraComponents/client/TableComponent";

const Client = () => {
    const [isTable, setIsTable] = useState(true);
    const [clients, getClients, , deleteClient] = useCrud();
    const [clientList, setClientList] = useState();

    useEffect(() => {
        getClients("/intimar/client");
    }, []);

    useEffect(() => {
        setClientList(clients);
    }, [clients]);

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
                                    <Filters />
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
                                                    />
                                                ))}
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
                                    <PaginationComponent />
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
