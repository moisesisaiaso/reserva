import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "api/auth";
import myStyles from "../../assets/css/myStyles.module.css";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Spinner,
} from "reactstrap";

const Login = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [redirecting, setRedirecting] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(data);
            // Si el inicio de sesión es exitoso, redirige al dashboard
            setRedirecting(true);
            navigate("/admin/home");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError(error.message || "Error desconocido al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    if (redirecting) {
        return <div>Redirigiendo al home...</div>;
    }

    return (
        <Col lg="5" md="7" className={myStyles.cardLogin}>
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small> Iniciar sesión con credenciales </small>
                    </div>
                    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <input
                                    className={`${myStyles.inputs} form-control`}
                                    placeholder="Email"
                                    type="email"
                                    {...register("email", { required: true })}
                                />
                            </InputGroup>
                            {errors.email && (
                                <span className="text-danger">Este campo es requerido</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <input
                                    className={`${myStyles.inputs} form-control`}
                                    placeholder="Password"
                                    type="password"
                                    {...register("password", { required: true })}
                                />
                            </InputGroup>
                            {errors.password && (
                                <span className="text-danger">Este campo es requerido</span>
                            )}
                        </FormGroup>
                        {error && (
                            <div className="text-center text-danger mb-3">
                                <small>{error}</small>
                            </div>
                        )}
                        <div className="text-center">
                            <Button className="my-4" color="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" /> : "Iniciar sesión"}
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Login;
