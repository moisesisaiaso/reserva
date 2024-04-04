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
    Card,
    Button,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset } = useForm();

    const [client, getClients, getOneClient, createClient, , updateClient] = useCrud();

    // const [showClient, setShowClient] = useState();

    console.log(id);
    const dataEdit = async () => {
        if (id) {
            await getOneClient("/intimar/client/findById", id);
        }
    };

    useEffect(() => {
        dataEdit();
        getClients("/intimar/client");
    }, []);

    useEffect(() => {
        if (id) {
            const { name, lastname, age, email, cellphone, address, allergies } = client;
            reset({
                name,
                lastname,
                age,
                email,
                cellphone,
                address,
                allergies,
            });
        }
    }, [client]);

    const submit = (data) => {
        data.age = Number(data.age);

        console.log(data);

        if (id) {
            updateClient("/intimar/client", id, data);
        } else {
            createClient("/intimar/client", data);
        }

        reset({
            name: "",
            lastname: "",
            age: "",
            email: "",
            cellphone: "",
            address: "",
            allergies: "",
        });

        window.location.href = "/admin/clients";
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información de cliente</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-username">
                            Nombre
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Ingrese el Nombre"
                                type="text"
                                {...register("name")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-email">
                            Apellido
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Ingrese el Apellido"
                                type="text"
                                {...register("lastname")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-first-name">
                            Correo
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-first-name"
                                placeholder="Ingrese el correo"
                                type="email"
                                {...register("email")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Años
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese los años"
                                type="number"
                                {...register("age")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Alergias
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese las alergias"
                                type="text"
                                {...register("allergies")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <hr className="my-4" />
            {/* Address */}
            <h6 className="heading-small text-muted mb-4">Información de contacto</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-address">
                            Dirección
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Ingrese la dirección"
                                type="text"
                                {...register("address")}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-city">
                            Teléfono
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-city"
                                placeholder="Ingrese el teléfono"
                                type="text"
                                required
                                pattern="[0-9]{1,9}"
                                {...register("cellphone")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Crear Cliente
            </Button>
        </form>
    );
};
