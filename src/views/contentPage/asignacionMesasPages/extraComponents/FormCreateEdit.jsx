import React, { useEffect, useState } from "react";
import { FormGroup, Col, Row, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const FormCreateEdit = ({ id }) => {
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm();
    const [mesa, getMesa, createMesa, , updateMesa] = useCrud();
    const [mesaData, setMesaData] = useState(null);

    useEffect(() => {
        const fetchMesaData = async () => {
            if (id) {
                try {
                    const data = await getMesa(`/intimar/mesa/${id}`);
                    if (data) {
                        setMesaData(data);
                        setValue("ubicacion_mesa", data.ubicacion_mesa);
                        setValue("numero_mesa", data.numero_mesa);
                    } else {
                        throw new Error("Mesa no encontrada");
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        };

        fetchMesaData();
    }, [id, getMesa, setValue]);

    const submit = async (data) => {
        try {
            if (!data.ubicacion_mesa || !data.numero_mesa) {
                throw new Error("Los campos de número y ubicación de mesa son requeridos.");
            }

            if (id) {
                await updateMesa(`/intimar/mesa/${id}`, data);
                toast.success("Mesa editada con éxito");
            } else {
                await createMesa("/intimar/mesa", data);
                toast.success("Mesa creada con éxito");
            }

            reset({
                ubicacion_mesa: "",
                numero_mesa: "",
            });
            setTimeout(() => {
                window.location.href = "/admin/mesas";
            }, 1250);
        } catch (error) {
            toast.error(error.message);
        }
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
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
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
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-numero-mesa">
                            Número
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                placeholder="Ingrese el Número"
                                type="text"
                                {...register("numero_mesa", { required: true })}
                            />
                            {errors.numero_mesa && <p className="text-danger">Número de mesa es requerido</p>}
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {id ? "Editar Mesa" : "Crear Mesa"}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
};
