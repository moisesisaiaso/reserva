import React, { useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, InputGroup, Col, Row, Button } from "reactstrap";

export const Filters = ({ mesas, setMesaList }) => {
    const [selectedFilter, setSelectedFilter] = useState("Todos"); 
    const filterByUbicacion = (e, zona) => {
        e.preventDefault();
        setSelectedFilter(zona);
        const filteredMesas = mesas.filter((mesa) => mesa.ubicacion_mesa === zona);
        setMesaList(filteredMesas);
    };

    const showAllMesas = (e) => {
        e.preventDefault();
        setSelectedFilter("Todos"); 
        setMesaList(mesas);
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
                                className={getButtonClass("Playa")} // Aplicar clase condicional
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
                                className={getButtonClass("Terraza")} // Aplicar clase condicional
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
                                className={getButtonClass("Comedor")} // Aplicar clase condicional
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
                                className={getButtonClass("Bar")} // Aplicar clase condicional
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
                                className={getButtonClass("Poltrona")} // Aplicar clase condicional
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
                                className={getButtonClass("Embarcación")} // Aplicar clase condicional
                            >
                                Embarcación
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};


