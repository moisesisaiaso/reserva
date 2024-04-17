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
} from "reactstrap";

export const Filters = ({ mesas, setMesaList }) => {
    const inputUbicacion = useRef();
    const inputMesa = useRef();
    const inputEstado = useRef();

    // Función para buscar por nombre, mesa o teléfono
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

        // Filtrar por nombre, mesa o teléfono
        const filteredMesas = mesas.filter((mesa) => {
            return (
                regex.test(mesa.ubicacion_mesa) ||
                regex.test(mesa.numero_mesa) ||
                regex.test(mesa.estado_mesa)
            );
        });

        setMesaList(filteredMesas);
    }

    return (
        <div classubicacion={myStyles.inputFilters}>
            <Form
                onSubmit={(e) => {
                    searchMesa(e, "ubicacion");
                }}
            >
                <Row>
                    <Col classubicacion={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                classubicacion={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <input
                                    classubicacion={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por ubicación"
                                    type="text"
                                    ref={inputUbicacion}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button>
                                        <i class="fa-solid fa-magnifying-glass"></i>
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
                    <Col classubicacion={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                classubicacion={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <input
                                    classubicacion={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por mesa"
                                    type="text"
                                    ref={inputMesa}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button>
                                        <i class="fa-solid fa-magnifying-glass"></i>
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
                    <Col classubicacion={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup
                                classubicacion={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                            >
                                <input
                                    classubicacion={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por estado"
                                    type="text"
                                    ref={inputEstado}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button>
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
