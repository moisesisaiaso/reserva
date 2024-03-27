// reactstrap components
import { login } from "api/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { handleSubmit, register, reset } = useForm();

    console.log("hola");
    const submit = (data) => {
        login(data);

        console.log(data);

        reset({
            email: "",
            password: "",
        });

        navigate("/admin/index");
    };

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <Form role="form" onSubmit={handleSubmit(submit)}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        {...register("email")}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        {...register("password")}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label className="custom-control-label" htmlFor=" customCheckLogin">
                                    <span className="text-muted">Remember me</span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit">
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
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
                </Row>
            </Col>
        </>
    );
};

export default Login;
