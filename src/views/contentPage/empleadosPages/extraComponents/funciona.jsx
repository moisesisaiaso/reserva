import { FormGroup, Form, Input, Col, Row, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, watch, setError, clearErrors, formState: { errors } } = useForm();
    const [employee, getEmployees, createEmployee, , updateEmployee] = useCrud();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && employee) {
            let employeeEdit = employee?.filter((element) => element.id === parseId);

            console.log(employeeEdit);

            if (employeeEdit.length > 0) {
                const { name, lastname, email, cellphone, roles } = employeeEdit[0];
                reset({
                    name,
                    lastname,
                    email,
                    cellphone,
                    roles: roles.map((role) => role.name),
                    password: "",  
                    confirmPassword: ""
                });
            }
        }
    }, [employee, id, reset]);

    const submit = (data) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Las contraseñas no coinciden",
            });
            return;
        }

        if (id) {
            // Logica para actualizar empleado
            updateEmployee(`/intimar/employee/${id}`, data);
        } else {
            // Logica para crear nuevo empleado
            createEmployee("/intimar/auth/signup", data);
        }

        reset({
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            cellphone: "",
            roles: [],
        });

        // window.location.href = "/admin/employees";
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información del empleado</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-name">
                            Nombre
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
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
                                placeholder="Ingrese el Apellido"
                                type="text"
                                {...register("lastname")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-cellphone">
                            Teléfono
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                placeholder="Ingrese el Teléfono"
                                type="text"
                                {...register("cellphone")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-roles">
                            Roles
                        </label>
                        <FormGroup className={" " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative  ${myStyles.input}`}
                                type="select"
                                multiple
                                {...register("roles")}
                            >
                                <option value="anfitrion" >Anfitrión</option>
                                <option value="recepcionista">Recepcionista</option>
                                <option value="administrador">Administrador</option>
                                <option value="mesero">Mesero</option>
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <br></br>
            
            <h6 className="heading-small text-muted mb-4">Crear Usuario</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-email">
                            Correo Electrónico
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                placeholder="Ingrese el Correo Electrónico"
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
                                placeholder="Ingrese la Contraseña"
                                type="password"
                                {...register("password", {
                                    onChange: (e) => setPassword(e.target.value),
                                })}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6"></Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-confirm-password">
                            Confirmar Contraseña
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                placeholder="Confirme la Contraseña"
                                type="password"
                                {...register("confirmPassword", {
                                    onChange: (e) => setConfirmPassword(e.target.value),
                                })}
                            />
                            {errors.confirmPassword && (
                                <div className="text-danger mt-2">
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <br></br>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? 'Actualizar Empleado' : 'Registrar Empleado'}
            </Button>
        </Form>
    );
};
