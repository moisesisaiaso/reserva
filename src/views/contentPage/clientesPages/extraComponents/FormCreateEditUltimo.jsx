import myStyles from "../../../../assets/css/myStyles.module.css";
import {
    FormGroup,
    Col,
    Row,
    Button,
    Alert 
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [client, getClients, createClient, , updateClient] = useCrud();
    const [serverErrors, setServerErrors] = useState({});
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        getClients("/intimar/client");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && client) {
            let clientEdit = client?.filter((element) => element.id === parseId);

            const { name, lastname, age, email, cellphone, address, allergies } = clientEdit[0];
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

    const submit = async (data) => {
        if (!client) {
          // Manejar el caso donde el cliente aún no está inicializado
            return;
        }

        setServerErrors({});
        setShowError(false); // Reiniciamos el estado de showError

        data.age = Number(data.age);

        // Verificamos si ya existe un cliente con el mismo nombre y apellido
        const nameExists = client.some((c) => c.name === data.name && c.lastname === data.lastname && c.id !== parseInt(id));

        if (nameExists) {
            setShowError(true); // Mostramos el mensaje de error
            return; // Evitamos crear el cliente
        }

        const emailExists = client.some((c) => c.email === data.email && c.id !== parseInt(id));
        const cellphoneExists = client.some((c) => c.cellphone === data.cellphone && c.id !== parseInt(id));

        if (emailExists || cellphoneExists) {
            setServerErrors({
                email: emailExists ? "Este correo ya existe" : "",
                cellphone: cellphoneExists ? "Este teléfono ya existe" : "",
            });
            return;
        }


        try {
            if (id) {
                await updateClient("/intimar/client", id, data);
                toast.success("Cliente editado correctamente");
            } else {
                await createClient("/intimar/client", data);
                toast.success("Cliente creado correctamente");
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

            setTimeout(() => {
                window.location.href = "/admin/clients";
            }, 1250);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error al procesar la solicitud");
        }
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
                                id="input-username"
                                placeholder="Ingrese el Nombre"
                                type="text"
                                {...register("name", { required: "Nombre es requerido" })}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
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
                                {...register("lastname", { required: "Apellido es requerido" })}
                            />
                            {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}
                        </FormGroup>
                    </Col>
                </Row>
                {showError && (
                    <Alert color="danger">
                        Este cliente ya existe. Por favor, introduzca un nombre y apellido diferentes.
                    </Alert>
                )}
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
                            <div className="text-danger">{errors.email && errors.email.message}</div>
                            <div className="text-danger">{serverErrors.email}</div>
                        </FormGroup>
                    </Col>
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
                                {...register("cellphone", {
                                    required: "Teléfono es requerido",
                                    pattern: {
                                        value: /^[0-9]{1,9}$/,
                                        message: "Teléfono debe ser un número de hasta 9 dígitos"
                                    }
                                    
                                })}
                            />
                            <div className="text-danger">{errors.cellphone && errors.cellphone.message}</div>
                            <div className="text-danger">{serverErrors.cellphone}</div>
                        </FormGroup>
                    </Col>
                    
                    <Col md="12">
                        <label className="form-control-label mt-4" htmlFor="input-allergies">
                            Alergias
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-allergies"
                                placeholder="Ingrese las alergias"
                                type="text"
                                {...register("allergies")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">Información adicional</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-address">
                            Dirección
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-address"
                                placeholder="Ingrese la dirección"
                                type="text"
                                {...register("address")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Crear Cliente
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
};
