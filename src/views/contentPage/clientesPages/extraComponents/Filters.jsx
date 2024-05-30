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

export const Filters = ({ clients, setListaFiltrada, setIsFilter }) => {
    const inputName = useRef();
    const inputEmail = useRef();
    const inputCellphone = useRef();

    // Función para buscar por nombre, email o teléfono
    function searchClient() {
        const nameQuery = inputName.current.value.trim().toLowerCase();
        const emailQuery = inputEmail.current.value.trim().toLowerCase();
        const cellphoneQuery = inputCellphone.current.value.trim();

        const filteredClients = clients.filter((client) => {
            const nameMatch = client.name?.toLowerCase().includes(nameQuery);
            const emailMatch = client.email?.toLowerCase().includes(emailQuery);
            const cellphoneMatch = client.cellphone?.includes(cellphoneQuery);
            return nameMatch && emailMatch && cellphoneMatch;
        });

        setListaFiltrada(filteredClients);
        setIsFilter(true);
    }

    // Función para reiniciar la tabla
    function resetTable() {
        setListaFiltrada(clients); // Esto reinicia la lista de clientes al estado original
        setIsFilter(false);
        inputName.current.value = "";
        inputEmail.current.value = "";
        inputCellphone.current.value = "";
        searchClient(); 
    }

    // Función para manejar la tecla "Enter"
    function handleKeyPress(event, type) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (type === 'email') {
                resetTable();
            } else {
                searchClient();
            }
        }
    }

    return (
        <div className={myStyles.inputFilters}>
            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por nombre"
                                    type="text"
                                    ref={inputName}
                                    onChange={searchClient}
                                    onKeyDown={(e) => handleKeyPress(e, 'name')}
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

            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por teléfono"
                                    type="text"
                                    ref={inputCellphone}
                                    onChange={searchClient}
                                    onKeyDown={(e) => handleKeyPress(e, 'cellphone')}
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

            <Form>
                <Row>
                    <Col className={myStyles.inputContainer}>
                        <FormGroup>
                            <InputGroup className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Buscar por email"
                                    type="text"
                                    ref={inputEmail}
                                    onChange={searchClient}
                                    onKeyDown={(e) => handleKeyPress(e, 'email')}
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
