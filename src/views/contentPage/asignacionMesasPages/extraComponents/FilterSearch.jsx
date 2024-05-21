import { useEffect, useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Button,
    Col,
    Row,
} from "reactstrap";

export const FilterSearch = ({ mesas, setMesaList }) => {
    const inputEstado = useRef();

    // Función para buscar por nombre, mesa o teléfono

    let query = "";
    const handleSearch = () => {
        const value = inputEstado.current?.value;
        if (value === "Disponible") {
            query = true;
        } else if (value === "No disponible") {
            query = false;
        }

        const regex = new RegExp(query, "i"); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

        //filtrar por estado
        const filteredMesas = mesas?.filter((mesa) => {
            return regex.test(mesa.estado_mesa);
        });

        setMesaList(filteredMesas);
    };

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

    /*  useEffect(() => {
        setMesaList(mesas);
    }, []); */

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
