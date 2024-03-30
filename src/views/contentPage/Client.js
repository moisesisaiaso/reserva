import { useEffect, useState } from "react";
import myStyles from "../../assets/css/myStyles.module.css";
import { TableComponent } from "../generalComponents/TableComponent";

// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Button,
    Table,
} from "reactstrap";
import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { useCrud } from "hooks/useCrud";

const Client = () => {
    const [activeTabla, setActiveTabla] = useState("active");
    const [activeTarjeta, setActiveTarjeta] = useState("");
    const [clients, getClients, , deleteClient] = useCrud();

    useEffect(() => {
        getClients("/intimar/client");
    }, []);

    const handleActive = (option) => {
        if (option === "tabla") {
            setActiveTabla("active");
            setActiveTarjeta("");
        } else {
            setActiveTarjeta("active");
            setActiveTabla("");
        }
    };

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
                                <section className={myStyles.clientsSection}>
                                    <Button type="button" size="lg" className={myStyles.btCreate}>
                                        <i className="ni ni-fat-add fa-2x" />
                                        <span>Agregar Clientes</span>
                                    </Button>
                                    <div>
                                        <Button
                                            color="info"
                                            outline
                                            type="button"
                                            size="lg"
                                            aria-pressed={true}
                                            onClick={() => {
                                                handleActive("tabla");
                                            }}
                                            className={activeTabla}
                                        >
                                            Tabla
                                        </Button>
                                        <Button
                                            color="info"
                                            outline
                                            type="button"
                                            size="lg"
                                            aria-pressed={true}
                                            onClick={() => {
                                                handleActive("tarjeta");
                                            }}
                                            className={activeTarjeta}
                                        >
                                            Tarjetas
                                        </Button>
                                    </div>
                                </section>
                                <h2 className={myStyles.clientsH2}>Lista de Clientes (Clientes)</h2>
                                {/* table */}
                                <section>
                                    <Form>
                                        <Row>
                                            <Col md="4">
                                                <FormGroup>
                                                    <InputGroup
                                                        className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-zoom-split-in" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Buscar por nombre"
                                                            type="text"
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <InputGroup
                                                        className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-zoom-split-in" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Buscar por email"
                                                            type="text"
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <InputGroup
                                                        className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-zoom-split-in" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Buscar por teléfono"
                                                            type="text"
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </section>
                                <section className={myStyles.tableSpacing}>
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
                                            {clients?.data.map((client) => (
                                                <TableComponent
                                                    key={client.id}
                                                    client={client}
                                                    deleteClient={deleteClient}
                                                />
                                            ))}
                                        </tbody>
                                    </Table>
                                </section>
                            </CardBody>
                            {/* Paginación */}
                            <section>
                                <PaginationComponent />
                            </section>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Client;
