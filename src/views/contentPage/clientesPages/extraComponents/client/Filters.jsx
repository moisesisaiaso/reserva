import myStyles from "../../../../../assets/css/myStyles.module.css";

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

export const Filters = () => {
    return (
        <Form>
            <Row>
                <Col md="4">
                    <FormGroup>
                        <InputGroup
                            className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="Buscar por nombre"
                                type="text"
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <InputGroup
                            className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="Buscar por email"
                                type="text"
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <InputGroup
                            className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="Buscar por teléfono"
                                type="text"
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};
