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

export const Filters = ({ clients, setClientList }) => {
    const inputName = useRef();
    const inputEmail = useRef();
    const inputCellphone = useRef();

    // Función para buscar por nombre, email o teléfono
    function searchClient(e, type) {
        e.preventDefault();
        let query = "";
        if (type === "name") {
            query = inputName.current.value;
        } else if (type === "email") {
            query = inputEmail.current.value;
        } else {
            query = inputCellphone.current.value;
        }
        console.log(query);

        const regex = new RegExp(query, "i"); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

        // Filtrar por nombre, email o teléfono
        const filteredClients = clients.filter((client) => {
            return (
                regex.test(client.name) || regex.test(client.email) || regex.test(client.cellphone)
            );
        });

        setClientList(filteredClients);
    }

        // Función para reiniciar la tabla
        function resetTable() {
            // Reiniciar la tabla aquí
            // Por ejemplo:
            setClientList(clients); // Esto reinicia la lista de clientes al estado original
            inputName.current.value = ""; // Limpia el campo de búsqueda por nombre
            inputEmail.current.value = ""; // Limpia el campo de búsqueda por email
            inputCellphone.current.value = ""; // Limpia el campo de búsqueda por teléfono
        }
    
    

    return (
        <div className={myStyles.inputFilters}>
            <Form
                onSubmit={(e) => {
                    searchClient(e, "name");
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
                                    placeholder="Buscar por nombre"
                                    type="text"
                                    ref={inputName}
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
                    searchClient(e, "email");
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
                                    placeholder="Buscar por email"
                                    type="text"
                                    ref={inputEmail}
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
                    searchClient(e, "cellphone");
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
                                    placeholder="Buscar por teléfono"
                                    type="text"
                                    ref={inputCellphone}
                                />
                                <InputGroupAddon addonType="prepend">
                                    <button>
                                        <i class="fa-solid fa-magnifying-glass"></i>
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





