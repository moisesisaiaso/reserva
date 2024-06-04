import { useRef } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row,
    Button,
} from "reactstrap";

export const FilterSearch = ({ mesas, setListaFiltrada, setIsFilter }) => {
    const inputUbicacion = useRef();
    const inputMesa = useRef();
    const inputEstado = useRef();

    // Función para buscar por nombre, mesa o teléfono
    const handleSearch = (type) => {
        let query = "";
        if (type === "ubicacion") {
            query = inputUbicacion.current?.value;
        } else if (type === "mesa") {
            query = inputMesa.current?.value;
        } else {
            const value = inputEstado.current?.value;
            if (value === "Disponible") {
                query = true;
            } else if (value === "No disponible") {
                query = false;
            }
        }
        console.log(query);
        console.log(type);

        const regex = new RegExp(query, "i"); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

        // Filtrar por nombre, mesa o teléfono
        const filteredMesas = mesas?.filter((mesa) => {
            return (
                regex.test(mesa.ubicacion_mesa) ||
                regex.test(mesa.numero_mesa) ||
                regex.test(mesa.estado_mesa)
            );
        });

        setListaFiltrada(filteredMesas);
        setIsFilter(true);
    };

    function resetTable() {
        setListaFiltrada(mesas);
        inputUbicacion.current.value = "";
        inputMesa.current.value = "";
        inputEstado.current.value = "";
    }

    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por ubicación"
                                    type="text"
                                    ref={inputUbicacion}
                                    onChange={() => handleSearch("ubicacion")}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSearch("ubicacion");
                                        }
                                    }}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button type="button">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por mesa"
                                    type="text"
                                    ref={inputMesa}
                                    onChange={() => handleSearch("mesa")}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSearch("mesa");
                                        }
                                    }}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button type="button">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <select
                                    className={`form-select form-select-sm ${myStyles.selectInput} ${myStyles.inputFilters}`}
                                    ref={inputEstado}
                                    onChange={() => handleSearch("estado")}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSearch("estado");
                                        }
                                    }}
                                >
                                    <option value="" disabled selected hidden>Seleccione un estado</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                                <InputGroupAddon addonType="prepend">
                                    <button type="button"  style={{ marginRight: "20px" }}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
                        <Button color="secondary" onClick={resetTable} className="mb-2">
                            Reiniciar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};