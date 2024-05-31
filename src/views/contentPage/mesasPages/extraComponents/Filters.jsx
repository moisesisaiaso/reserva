import React, { useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, InputGroup, Col, Row, Button } from "reactstrap";

export const Filters = ({ mesas, setListaFiltrada, setIsFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState("Todos");

    const inputEstado = useRef();
    const handleSearch = () => {
        const value = inputEstado.current?.value;
        const query = value === "Disponible" ? true : value === "No disponible" ? false : "";

        const filteredMesas = mesas?.filter((mesa) => mesa.estado_mesa === query);

        setListaFiltrada(filteredMesas);
        setIsFilter(true);
    };
    const filterByUbicacion = (e, zona) => {
        e.preventDefault();
        setSelectedFilter(zona);
        const filteredMesas = mesas && mesas.filter((mesa) => mesa.ubicacion_mesa === zona);
        setListaFiltrada(filteredMesas || []);
        setIsFilter(true);
    };
    

    const showAllMesas = (e) => {
        e.preventDefault();
        setSelectedFilter("Todos");
        setListaFiltrada(mesas);
        setIsFilter(false);
    };

    const getButtonClass = (zona) => {
        // Asignar estilo adicional si es el filtro activo
        return selectedFilter === zona
            ? `${myStyles.button} ${myStyles.selected}`
            : myStyles.button;
    };

    return (
        <div className={myStyles.inputFilters}>
            <Row>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={showAllMesas}
                                className={getButtonClass("Todos")}
                            >
                                Todos
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Playa")}
                                className={getButtonClass("Playa")} 
                            >
                                Playa
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Terraza")}
                                className={getButtonClass("Terraza")} 
                            >
                                Terraza
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Comedor")}
                                className={getButtonClass("Comedor")} 
                            >
                                Comedor
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Bar")}
                                className={getButtonClass("Bar")} 
                            >
                                Bar
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Poltrona")}
                                className={getButtonClass("Poltrona")} 
                            >
                                Poltrona
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Embarcación")}
                                className={getButtonClass("Embarcación")} 
                            >
                                Embarcación
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Cafetin")}
                                className={getButtonClass("Cafetin")} 
                            >
                                Cafetin
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className={myStyles.inputContainer}>
                    <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                        <select
                            className={`form-control-alternative ${myStyles.input}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "11.5rem",
                            }}
                            type="select"
                            ref={inputEstado}
                            onChange={handleSearch}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};
