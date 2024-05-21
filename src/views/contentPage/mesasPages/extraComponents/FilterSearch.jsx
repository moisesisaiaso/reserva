import { useRef } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroup,
    Col,
    Row,
    Button,
} from "reactstrap";

export const FilterSearch = ({ mesas, setMesaList }) => {
    const inputUbicacion = useRef();
    const inputMesa = useRef();
    const inputEstado = useRef();

    // Función para buscar por ubicación, mesa o estado
    function searchMesa(e, type) {
        e.preventDefault();
        let query = "";
        if (type === "ubicacion") {
            query = inputUbicacion.current.value;
        } else if (type === "mesa") {
            query = inputMesa.current.value;
        } else {
            query = inputEstado.current.value;
        }
        console.log(query);

        const regex = new RegExp(query, "i"); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

        // Filtrar por ubicación, mesa o estado
        const filteredMesas = mesas.filter((mesa) => {
            if (type === "ubicacion") {
                return regex.test(mesa.ubicacion_mesa);
            } else if (type === "mesa") {
                return regex.test(mesa.numero_mesa);
            } else {
                return regex.test(mesa.estado_mesa);
            }
        });

        setMesaList(filteredMesas);
    }

    function resetTable() {
        setMesaList(mesas);
        inputUbicacion.current.value = "";
        inputMesa.current.value = "";
        inputEstado.current.value = "";
    }

    return (
        <div className={myStyles.inputFilters}>
            <Form
                onSubmit={(e) => {
                    searchMesa(e, "ubicacion");
                }}
            >
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
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button type="submit">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Form
                onSubmit={(e) => {
                    searchMesa(e, "mesa");
                }}
            >
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
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button type="submit">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Form
                onSubmit={(e) => {
                    searchMesa(e, "estado");
                }}
            >
                <Row>
                    <Col className={myStyles.inputContainer}>
                    <InputGroup className={`mb-4 ${myStyles.inputSearch}`}>

                        <FormGroup>
                            <select
                                className={`form-select form-select-sm ${myStyles.selectInput} ${myStyles.inputFilters}`}

                                ref={inputEstado}
                                onChange={(e) => searchMesa(e, "estado")}
                            >
                                <option value="">Seleccione un estado</option>
                                <option value="Disponible">Disponible</option>
                                <option value="No disponible">No disponible</option>
                            </select>
                        </FormGroup>
                    </InputGroup>
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
