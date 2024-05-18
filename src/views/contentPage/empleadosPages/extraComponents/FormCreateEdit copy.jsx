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
    const [employee, getEmployees, createEmployee, , updateEmployee] = useCrud();

    console.log(id);

    useEffect(() => {
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && employee) {
            let employeeEdit = employee?.filter((element) => element.id === parseId);

            console.log(employeeEdit);

            const { name, lastname, email, cellphone, roles } = employeeEdit[0];
            reset({
                name,
                lastname,
                email,
                cellphone,
                roles: roles.join(","),
            });
        }
    }, [employee]);

    const submit = async (data) => {
        data.roles = data.roles.split(",");

        console.log(data);

        if (id) {
            await updateEmployee("/intimar/employee", id, data);
            console.log("Editado");
        } else {
            await createEmployee("/intimar/employee", data);
        }

        reset({
            name: "",
            lastname: "",
            email: "",
            password: "",
            cellphone: "",
            roles: "",
        });

        window.location.href = "/admin/employees";
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información de empleado</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-name">
                            Nombre
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-name"
                                placeholder="Ingrese el Nombre"
                                type="text"
                                {...register("name")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-lastname">
                            Apellido
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-lastname"
                                placeholder="Ingrese el Apellido"
                                type="text"
                                {...register("lastname")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-email">
                            Correo
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-email"
                                placeholder="Ingrese el correo"
                                type="email"
                                {...register("email")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-password">
                            Contraseña
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-password"
                                placeholder="Ingrese la contraseña"
                                type="password"
                                {...register("password")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-cellphone">
                            Teléfono
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-cellphone"
                                placeholder="Ingrese el teléfono"
                                type="text"
                                required
                                {...register("cellphone")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-roles">
                            Roles
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-roles"
                                placeholder="Ingrese los roles separados por coma (e.g., anfitrion,admin)"
                                type="text"
                                {...register("roles")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? "Editar Empleado" : "Crear Empleado"}
            </Button>
        </form>
    );
};
