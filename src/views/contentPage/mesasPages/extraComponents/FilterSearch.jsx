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

    return (
        <div className={myStyles.inputFilters}>
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
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>

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
                            />
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
