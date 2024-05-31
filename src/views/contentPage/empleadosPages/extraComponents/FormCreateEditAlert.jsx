import React, { useRef, useState } from "react";
import { FormGroup, Form, Input, Col, Row, Button, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { toast } from 'react-toastify';

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, watch, setError, clearErrors, formState: { errors } } = useForm();
    const [employee, getEmployees, createEmployee, , updateEmployee] = useCrud();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [notification, setNotification] = useState("");

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
                setSelectedRoles(roles.map((role) => role.name));

            }
        }
    }, [employee, id, reset]);

    const handleRoleChange = (e) => {
        const { value } = e.target;
        if (selectedRoles.includes(value)) {
            setSelectedRoles(selectedRoles.filter(role => role !== value));
        } else {
            setSelectedRoles([...selectedRoles, value]);
        }
    };

    const submit = async (data) => {
        if (selectedRoles.length === 0) {
            toast.error('Debe asignar al menos un rol');
            return;
        }

        if (data.password.length < 8) {
            toast.error('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Las contraseñas no coinciden",
            });
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            data.roles = selectedRoles;

            if (id) {
                // Logica para actualizar empleado
                await updateEmployee(`/intimar/employee/${id}`, data);
            } else {
                // Logica para crear nuevo empleado
                await createEmployee("/intimar/auth/signup", data);
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

            toast.success(id ? 'Empleado actualizado correctamente' : 'Empleado registrado correctamente');
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error al procesar la solicitud');
        }
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
                                {...register("name", {
                                    required: "El nombre es obligatorio",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "El nombre solo puede contener letras",
                                    },
                                })}
                            />
                            {errors.name && <Alert color="danger">{errors.name.message}</Alert>}
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
                                {...register("lastname", {
                                    required: "El apellido es obligatorio",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "El apellido solo puede contener letras",
                                    },
                                })}
                            />
                            {errors.lastname && <Alert color="danger">{errors.lastname.message}</Alert>}
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
                                {...register("cellphone", {
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "El teléfono solo puede contener números",
                                    },
                                })}
                            />
                            {errors.cellphone && <Alert color="danger">{errors.cellphone.message}</Alert>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-roles">
                            Roles
                        </label>
                        <FormGroup className={" " + myStyles.Inputgroup}>
                            <div >
                                <input
                                    type="checkbox"
                                    value="anfitrion"
                                    checked={selectedRoles.includes("anfitrion")}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="anfitrion" style={{ marginLeft: "0.5rem" }}>Anfitrión</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    value="recepcionista"
                                    checked={selectedRoles.includes("recepcionista")}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="recepcionista" style={{ marginLeft: "0.5rem" }}>Recepcionista</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    value="administrador"
                                    checked={selectedRoles.includes("administrador")}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="administrador" style={{ marginLeft: "0.5rem" }}>Administrador</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    value="mesero"
                                    checked={selectedRoles.includes("mesero")}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="mesero" style={{ marginLeft: "0.5rem" }}> Mesero</label>
                            </div>
                        </FormGroup>
                        {errors.roles && <Alert color="danger">Debe seleccionar al menos un rol</Alert>}
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
                                {...register("email", { required: "El correo es obligatorio" })}
                            />
                            {errors.email && <Alert color="danger">{errors.email.message}</Alert>}
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
                                {...register("password")}
                            />
                            {errors.password && <Alert color="danger">{errors.password.message}</Alert>}
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
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <Alert color="danger">{errors.confirmPassword.message}</Alert>}
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