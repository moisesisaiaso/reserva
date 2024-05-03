import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Input, Col, Row, Button, Form } from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";

export const FormCreateEdit = ({ id, type }) => {
    const { handleSubmit, register, reset } = useForm();
    /* cuando reserva llega por id */
    const [reserva, setReserva] = useState();

    const [mesas, getMesas] = useCrud();
    const [reservas, getReservas, setMesas] = useCrud();
    const [mesasList, setMesaList] = useState();

    console.log("id: ", id);

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        /* cuando el id es de reservaId */
        if (id && reservas && type === "reserva") {
            let reserva = reservas.filter((reserva) => reserva.id === parseId);
            setReserva(reserva[0]);
        }

        /* muestra solo las mesas libres */
        if (mesas) {
            const mesasLibres = mesas.filter((mesa) => mesa.estado_mesa === true);
            console.log("mesasLibres: ", mesasLibres);
            setMesaList(mesasLibres);
        }
    }, [mesas, reservas]);

    const submit = async (data) => {
        console.log(data);
        const id = data.reservaId;
        delete data.reservaId;
        data = data.mesas;

        await setMesas(`/intimar/reserva/${id}/mesa`, data);

        reset({
            reservaId: "",
            mesas: "",
        });

        console.log(`id: ${id} --- mesas: ${data}`);

        window.location.href = "/admin/asignar-mesa";
    };

    console.log(reservas);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Selección de reserva</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-reserva">
                            Reservas en espera
                        </label>
                        <FormGroup>
                            <Input id="input-reservas" type="select" {...register("reservaId")}>
                                {/*cuando la reserva viene por id o selecciono la reserva*/}
                                {id && type === "reserva" && reserva ? (
                                    <option
                                        value={id}
                                    >{`${reserva?.client.name} ${reserva?.client.lastname} -- ${reserva.fecha_reserva} -- ${reserva.hora_reserva}`}</option>
                                ) : (
                                    reservas?.map((reserva) => {
                                        const { client, id, fecha_reserva, hora_reserva } = reserva;

                                        return (
                                            <option key={id} value={id}>
                                                {`${client?.name} ${client?.lastname} -- ${fecha_reserva} -- ${hora_reserva}`}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <h6 className="heading-small text-muted mb-4">Asignación de mesas</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-mesas">
                            Mesas
                        </label>
                        <FormGroup>
                            <Input id="input-mesas" type="select" multiple {...register("mesas")}>
                                {mesasList?.map((mesa) => {
                                    const { ubicacion_mesa, numero_mesa } = mesa;
                                    if (id && type === "mesa" && id === mesa.id) {
                                        return (
                                            <option key={mesa.id} value={mesa.id} selected>
                                                {`${mesa?.ubicacion_mesa} -- ${mesa?.numero_mesa}`}
                                            </option>
                                        );
                                    } else {
                                        return (
                                            <option key={mesa.id} value={mesa.id}>
                                                {`${mesa?.ubicacion_mesa} -- ${mesa?.numero_mesa}`}
                                            </option>
                                        );
                                    }
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" />
                Asignar mesa
            </Button>
        </form>
    );
};
