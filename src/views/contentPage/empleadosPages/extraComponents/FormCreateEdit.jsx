import {
    FormGroup,
    Form,
    Input,
    Col,
    Row,
    Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect } from "react";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset } = useForm();
    const [employee, getEmployees, createEmployee, , updateEmployee] = useCrud();

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
                roles: roles.map((role) => role.name), 
            });
        }
    }, [employee]);

    const submit = (data) => {
        console.log(data);
        if (data.roles) {
            // Crear objeto con los roles en formato esperado por la API
            const roles = data.roles.map((role) => ({ name: role }));
    
            const formData = {
                ...data,
                roles,
            };
    
            createEmployee("/intimar/auth/signup", formData);
        } else {
            console.error("No se proporcionaron roles.");
        }

        reset({
            name: "",
            lastname: "",
            email: "",
            password: "",
            cellphone: "",
            roles: [],
        });
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
                        <FormGroup>
                            <Input
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
                        <FormGroup>
                            <Input
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
                            Correo Electrónico
                        </label>
                        <FormGroup>
                            <Input
                                id="input-email"
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
                        <FormGroup>
                            <Input
                                id="input-password"
                                placeholder="Ingrese la Contraseña"
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
                        <FormGroup>
                            <Input
                                id="input-cellphone"
                                placeholder="Ingrese el Teléfono"
                                type="text"
                                {...register("cellphone")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-roles">
                            Roles
                        </label>
                        <FormGroup>
                            <Input
                                id="input-roles"
                                type="select"
                                multiple 
                                {...register("roles")}
                            >
                                {/* Opciones de roles */}
                                <option value="anfitrion">Anfitrión</option>
                                <option value="recepcionista">Recepcionista</option>
                                <option value="administrador">Administrador</option>
                                <option value="mesero">Mesero</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Registrar Empleado
            </Button>
        </Form>
    );
};
