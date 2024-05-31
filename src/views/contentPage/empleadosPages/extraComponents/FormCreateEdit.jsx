import { FormGroup, Form, Input, Col, Row, Button, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, setError, formState: { errors } } = useForm();
    const [employee, getEmployees, createEmployee, , updateEmployee] = useCrud();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [serverErrors, setServerErrors] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && employee) {
            let employeeEdit = employee?.filter((element) => element.id === parseId);

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
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Las contraseñas no coinciden",
            });
            return;
        }

        if (!data.name || !data.lastname || !data.cellphone || !data.email) {
            toast.error("Por favor, ingresa nombre, apellido, teléfono y correo electrónico.");
            return;
        }

        if (data.cellphone.length < 9) {
            toast.error("El número de teléfono debe tener al menos 9 dígitos.");
            return;
        }

        if (selectedRoles.length === 0) {
            toast.error("Debe seleccionar al menos un rol.");
            return;
        }

        const payload = {
            ...data,
            roles: selectedRoles
        };

        setServerErrors({});
        
        try {
            if (id) {
                await updateEmployee(`/intimar/employee/${id}`, payload);
                toast.success("Empleado actualizado correctamente");
            } else {
                await createEmployee("/intimar/auth/signup", payload);
                toast.success("Empleado creado correctamente");
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
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.data) {
                setServerErrors(error.response.data);
                Object.keys(error.response.data).forEach(key => {
                    setError(key, {
                        type: "manual",
                        message: error.response.data[key]
                    });
                });
            } else {
                toast.error("Hubo un error al procesar la solicitud");
            }
        }
    };

    const handleKeyDown = (event, type) => {
        if (type === "name" || type === "lastname") {
            // Permitir solo letras y espacios
            if (!/^[A-Za-z\s]*$/.test(event.key)) {
                event.preventDefault();
            }
        } else if (type === "cellphone") {
            // Permitir solo números y teclas especiales de borrar
            if (!/^\d*$/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
                event.preventDefault();
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información del empleado</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-name">
                                Nombre
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Ingrese el Nombre"
                                    type="text"
                                    {...register("name", {
                                        required: "Nombre es requerido",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "El nombre solo debe contener letras y espacios"
                                        }
                                    })}
                                    onKeyDown={(e) => handleKeyDown(e, "name")}
                                />
                            </div>
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-lastname">
                                Apellidos
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Ingrese el Apellido"
                                    type="text"
                                    {...register("lastname", {
                                        required: "Apellido es requerido",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "El apellido solo debe contener letras y espacios"
                                        }
                                    })}
                                    onKeyDown={(e) => handleKeyDown(e, "lastname")}
                                />
                            </div>
                            {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-cellphone">
                                Teléfono
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Ingrese el Teléfono"
                                    type="text"
                                    {...register("cellphone", {
                                        required: "Teléfono es requerido",
                                        minLength: {
                                            value: 9,
                                            message: "El teléfono debe tener al menos 9 dígitos"
                                        }
                                    })}
                                    onKeyDown={(e) => handleKeyDown(e, "cellphone")}
                                />
                            </div>
                            {errors.cellphone && <span className="text-danger">{errors.cellphone.message}</span>}
                        </div>
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
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">
                                Correo Electrónico
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Ingrese el Correo Electrónico"
                                    type="email"
                                    {...register("email", {
                                        required: "Correo Electrónico es requerido",
                                    })}
                                />
                            </div>
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-password">
                                Contraseña
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Ingrese la Contraseña"
                                    type="password"
                                    {...register("password", {
                                        required: "Contraseña es requerida",
                                        minLength: {
                                            value: 8,
                                            message: "La contraseña debe tener al menos 8 caracteres"
                                        }
                                    })}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-confirm-password">
                                Confirmar Contraseña
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    placeholder="Confirme la Contraseña"
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Confirmar Contraseña es requerido",
                                        validate: value => value === password || "Las contraseñas no coinciden"
                                    })}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                        </div>
                    </Col>
                </Row>
            </div>
            <br></br>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? 'Actualizar Empleado' : 'Registrar Empleado'}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </Form>
    );
};
