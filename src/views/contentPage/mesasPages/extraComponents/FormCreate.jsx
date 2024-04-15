import { useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap"; // Importa Form de reactstrap
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import myStyles from "../../../../assets/css/myStyles.module.css";
export const FormCreate = ({ id }) => {
    const { handleSubmit, register } = useForm();
    const [mesa, createMesa] = useCrud();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            await createMesa("/intimar/mesa", data);
            alert("Mesa creada exitosamente");
        } catch (error) {
            console.error("Error al crear la mesa:", error);
            alert("Hubo un error al crear la mesa. Por favor, inténtalo de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}> 
            <h6 className="heading-small text-muted mb-4">Crear Mesa</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <Label className="form-control-label" htmlFor="ubicacion_mesa">
                            Ubicación de la Mesa
                        </Label>
                        <FormGroup className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                            <Input                   
                                className={`form-control-alternative ${myStyles.input}`}
                                type="select"
                                name="ubicacion_mesa"
                                id="ubicacion_mesa"
                                {...register("ubicacion_mesa", { required: true })}
                            >
                                <option value="Playa">Playa</option>
                                <option value="Terraza">Terraza</option>
                                <option value="Comedor">Comedor</option>
                                <option value="Bar">Bar</option>
                                <option value="Portronas">Portronas</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <Label className="form-control-label" htmlFor="numero_mesa">
                            Número de Mesa
                        </Label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                             <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="numero_mesa"
                                placeholder="Ingrese el número de mesa"
                                type="text"
                                {...register("numero_mesa", { required: true })}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Crear Mesa
            </Button>
        </Form>
    );
};
export default FormCreate;