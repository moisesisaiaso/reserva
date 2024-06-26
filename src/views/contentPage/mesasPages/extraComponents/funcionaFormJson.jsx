import React, { useEffect, useState } from 'react';
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Col, Row, Button, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm();
    const [mesa, getMesas, createMesa, , updateMesa] = useCrud();
    const [serverErrors, setServerErrors] = useState({});
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        getMesas("/intimar/mesa");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && mesa) {
            let mesaEdit = mesa?.find((element) => element.id === parseId);

            if (mesaEdit) {
                const { ubicacion_mesa, numero_mesa } = mesaEdit;
                reset({
                    ubicacion_mesa,
                    numero_mesa
                });
                setValue('ubicacion_mesa', ubicacion_mesa);
                setValue('numero_mesa', numero_mesa);
            }
        }
    }, [id, mesa, reset, setValue]);

    const removeEmptyFields = (data) => {
        return Object.entries(data)
            .filter(([key, value]) => value)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    };

    const submit = async (data) => {
        data = removeEmptyFields(data);

        if (!data.ubicacion_mesa || !data.numero_mesa) {
            toast.error("Por favor, ingresa la ubicación y el número de la mesa.");
            return;
        }

        setServerErrors({});
        setShowError(false);

        const ubicacionMesaExists = mesa.some((m) => m.ubicacion_mesa === data.ubicacion_mesa && m.numero_mesa === data.numero_mesa && m.id !== parseInt(id));

        if (ubicacionMesaExists) {
            setShowError(true);
            return;
        }

        try {
            if (id) {
                await updateMesa("/intimar/mesa", id, data);
                toast.success("Mesa editada correctamente");
            } else {
                await createMesa("/intimar/mesa", data);
                toast.success("Mesa creada correctamente");

                reset({
                    ubicacion_mesa: "",
                    numero_mesa: ""
                });
            }
            setTimeout(() => {
                window.location.href = "/admin/mesas";
            }, 1250);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un error al procesar la solicitud");
        }
    };

    const handleError = (errors) => {
        for (const [field, error] of Object.entries(errors)) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit, handleError)}>
            <h6 className="heading-small text-muted mb-4">Información de la mesa</h6>
            <div className="pl-lg-4">
                <Row>
                <Col md="6">
                        <label className="form-control-label" htmlFor="input-ubicacion-mesa">
                            Ubicación de la mesa
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                id="input-ubicacion-mesa"
                                {...register("ubicacion_mesa", { required: true })}
                            >
                                <option value="">Seleccione la Ubicación</option>
                                <option value="Playa">Playa</option>
                                <option value="Terraza">Terraza</option>
                                <option value="Comedor">Comedor</option>
                                <option value="Bar">Bar</option>
                                <option value="Poltrona">Poltrona</option>
                                <option value="Embarcación">Embarcación</option>
                                <option value="Cafetin">Cafetin</option>
                            </select>
                            {errors.ubicacion_mesa && <p className="text-danger">Ubicación de mesa es requerida</p>}
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="input-numero_mesa">
                                Número de la mesa
                            </label>
                            <div className={`${myStyles.inputSearch} ${myStyles.Inputgroup}`}>
                                <input
                                    className={`form-control-alternative ${myStyles.input}`}
                                    id="input-numero_mesa"
                                    placeholder="Ingrese el Número de la Mesa"
                                    type="text"
                                    {...register("numero_mesa", {
                                        required: "Número de la mesa es requerido",
                                        // pattern: {
                                        //     value: /^[0-9]*$/,
                                        //     message: "El número de la mesa solo debe contener números"
                                        // }
                                    })}
                                />
                            </div>
                            {errors.numero_mesa && <span className="text-danger">{errors.numero_mesa.message}</span>}
                        </div>
                    </Col>
                </Row>
                {showError && (
                    <Alert color="danger">
                        Esta mesa ya existe. Por favor, introduzca una ubicación y número de mesa diferentes.
                    </Alert>
                )}
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? "Editar Mesa" : "Crear Mesa"}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
};
