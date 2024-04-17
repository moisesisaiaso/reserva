import myStyles from "../../../../assets/css/myStyles.module.css";

import { FormGroup, Col, Row, Button } from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect } from "react";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset } = useForm();

    const [mesas, getMesas, createMesa, , updateMesa] = useCrud();

    console.log(id);

    useEffect(() => {
        if (id) {
            getMesas("/intimar/mesa");
        }
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && mesas) {
            let mesasEdit = mesas?.filter((element) => element.id === parseId);

            console.log(mesasEdit);

            const { ubicacion_mesa, numero_mesa, estado_mesa } = mesasEdit[0];
            reset({
                ubicacion_mesa,
                numero_mesa,
                estado_mesa,
            });
        }
    }, [mesas]);

    const submit = async (data) => {
        console.log(data);

        if (id) {
            await updateMesa("/intimar/mesa", id, data);
            console.log("Editado");
        } else {
            await createMesa("/intimar/mesa", data);
        }

        reset({
            ubicacion_mesa: "",
            numero_mesa: "",
            estado_mesa: "",
        });

        // window.location.href = "/admin/mesass";
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información de mesas</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Ubicación de mesa
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese la ubicación"
                                type="text"
                                {...register("ubicacion_mesa")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Número de mesa
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese el número de la mesa"
                                type="text"
                                {...register("numero_mesa")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Estado de mesa
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese su estado"
                                type="text"
                                {...register("estado_mesa")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>

            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Crear mesa
            </Button>
        </form>
    );
};
