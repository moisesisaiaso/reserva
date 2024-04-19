// reactstrap components
import { login } from "api/auth";
import myStyles from "../../assets/css/myStyles.module.css";
import { useForm } from "react-hook-form";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

const Login = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(data);
            reset({
                email: "",
                password: "",
            });
            setTimeout(() => {
                window.location.href = "/admin/home";
            }, 2000);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

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
                            {errors.email && <span className="text-danger">Este campo es requerido</span>}
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
                            {errors.password && <span className="text-danger">Este campo es requerido</span>}
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                                className="custom-control-input"
                                id="customCheckLogin"
                                type="checkbox"
                            />
                            <label className="custom-control-label" htmlFor="customCheckLogin">
                                <span className="text-muted">Recordarme</span>
                            </label>
                        </div>
                        <div className="text-center">
                            <Button className="my-4" color="primary" type="submit">
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            {/* <Row className="mt-3">
                    <Col xs="6">
                        <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row> */}
        </Col>
    );
};

export default Login;
