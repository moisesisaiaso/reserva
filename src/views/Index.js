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
import Chart from 'chart.js';

import AsignacionMesa from "views/contentPage/asignacionMesasPages/AsignacionMesa";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
} from "reactstrap";


const Index = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [mesas, setMesas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [apiData, getApi, postApi, deleteApi, updateApi, removeApi] = useCrud();
    const [mesaList, setMesaList] = useState([]);
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getApi("/intimar/mesa");
        };
        fetchData();
    }, [updated]);

    useEffect(() => {
        if (apiData) {
            setMesas(apiData);
        }
    }, [apiData]);

    useEffect(() => {
        if (mesas) {
            const paginatedData = getPaginatedData(mesas, currentPage, itemsPerPage);
            setMesaList(paginatedData);
        }
    }, [mesas, currentPage, itemsPerPage]);

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    const totalPages = mesas ? Math.ceil(mesas.length / itemsPerPage) : 0;
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
                                    <h2>Mesas asignacion</h2>
                                </Row>
                            </CardHeader>
                            <CardBody>
                            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <FilterSearch mesas={mesas} setMesaList={setMesaList} />
                                    <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
                                        <i className="ni ni-fat-add fa-2x" />
                                        <span>Asignar Mesa</span>
                                    </Button>
                                </section>

                                <Row>
                                    {mesaList && mesaList.length > 0 ? (
                                        mesaList.map((mesa) => (
                                            <Col lg="4" key={mesa.id}>
                                                <CardMesa
                                                    mesa={mesa}
                                                    updateMesa={updateApi}
                                                    updated={updated}
                                                    setUpdated={setUpdated}
                                                />
                                            </Col>
                                        ))
                                    ) : (
                                        <Col>
                                            <p className="text-center">No hay mesas para mostrar</p>
                                        </Col>
                                    )}
                                </Row>

                                <section className={myStyles.tableSpacing}>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pages={totalPages}
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
