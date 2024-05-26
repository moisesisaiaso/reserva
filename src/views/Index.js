import myStyles from "../assets/css/myStyles.module.css";
import Header from "components/Headers/Header.js";

import { useEffect, useState } from "react";
import { CardMesa } from "./contentPage/asignacionMesasPages/extraComponents/CardMesa";
import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { FilterSearch } from "./contentPage/asignacionMesasPages/extraComponents/FilterSearch";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";
import { useCrud } from "hooks/useCrud";
import { useNavigate } from "react-router-dom";

import { chartOptions, parseOptions, chartExample1, chartExample2 } from "variables/charts.js";
import Chart from "chart.js";

import AsignacionMesa from "views/contentPage/asignacionMesasPages/AsignacionMesa";

import { Button, Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

const Index = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const navigate = useNavigate();
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

    const handleBtnCreate = () => {
        navigate("/admin/asignar-mesa/create");
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-12 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <Col>
                                        <h2 className="ms-3">Mesas asignacion</h2>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button
                                            type="button"
                                            size="lg"
                                            className={myStyles.btCreate}
                                            onClick={handleBtnCreate}
                                        >
                                            <i className="ni ni-fat-add fa-2x" />
                                            <span>Asignar Mesa</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <section
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <FilterSearch
                                        mesas={mesas}
                                        setListaFiltrada={setListaFiltrada}
                                        setIsFilter={setIsFilter}
                                    />
                                </section>

                                <section className={myStyles.tableSpacing}>
                                    {mesaList && mesaList.length > 0 ? (
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
                                    )}
                                </section>

                                <section className={myStyles.tableSpacing}>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pages={pages}
                                    />
                                </section>

                                {/* Other components */}
                                {/* <AsignacionMesa /> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
