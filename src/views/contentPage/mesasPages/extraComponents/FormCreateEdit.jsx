import myStyles from "../../../../assets/css/myStyles.module.css";
import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row,
    Card,
    Button,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset } = useForm();

    const [mesa, getMesas, createMesa, , updateMesa] = useCrud();

    console.log(id);

    useEffect(() => {
        getMesas("/intimar/mesa");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && mesa) {
            let mesaEdit = mesa?.filter((element) => element.id === parseId);

            console.log(mesaEdit);

            const { ubicacion_mesa, numero_mesa, estado_mesa } = mesaEdit[0];
            reset({
                ubicacion_mesa,
                numero_mesa,
                estado_mesa: estado_mesa.toString(), 
            });
        }
    }, [mesa]);

    const submit = async (data) => {
        data.estado_mesa = data.estado_mesa === "true"; 

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

        window.location.href = "/admin/mesas";
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información de mesa</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-ubicacion-mesa">
                            Ubicación
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Ingrese la Ubicación"
                                type="text"
                                {...register("ubicacion_mesa")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-numero-mesa">
                            Número
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Ingrese el Número"
                                type="text"
                                {...register("numero_mesa")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-estado-mesa">
                            Estado
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-estado-mesa"
                                {...register("estado_mesa")}
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <hr className="my-4" />
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? "Editar Mesa" : "Crear Mesa"}
            </Button>
        </form>
    );
};
