import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Input, Col, Row, Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormCreateEdit = ({ id, type }) => {
    const { handleSubmit, register, reset, setValue } = useForm({
        defaultValues: {
            reservaId: id && type === "reserva" ? { value: id } : null,
            mesas: id && type === "mesa" ? [id] : [],
        },
    });

    const [reserva, setReserva] = useState();
    const [mesas, getMesas] = useCrud();
    const [reservas, getReservas, setMesas] = useCrud();
    const [employees, getEmployees, setMozo] = useCrud();
    const [mesasList, setMesaList] = useState();
    const [reservasList, setReservasList] = useState();
    const employee = useRef();
    const [selectedReserva, setSelectedReserva] = useState(null);

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        if (reservas) {
            const disponibles = reservas.filter(
                (reserva) => reserva.hora_salida === null && reserva.estado_reserva !== "Cancelada"
            );
            console.log("disponibles", disponibles);
            setReservasList(disponibles);
        }

        if (mesas) {
            const mesasLibres = mesas.filter((mesa) => mesa.estado_mesa === true);
            setMesaList(mesasLibres);
        }
    }, [mesas, reservas]);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && reservasList && type === "reserva") {
            let reserva = reservasList.filter((reserva) => reserva.id === parseId);
            setReserva(reserva[0]);
            console.log("entra");
        }
    }, [reservasList]);

    console.log("reserva :", reserva);
    console.log("reservaList :", reservasList);

    useEffect(() => {
        if (id && type === "reserva" && reserva) {
            setSelectedReserva({
                value: reserva?.id,
                label: `${reserva?.client?.name} ${reserva?.client?.lastname} -- ${reserva?.fecha_reserva} -- ${reserva?.hora_reserva}`,
            });
        }
    }, [reserva]);

    const submit = async (data) => {
        const id = selectedReserva ? selectedReserva.value : null;
        if (!id) {
            toast.error("Debe seleccionar una reserva.");
            return;
        }
        delete data.reservaId;
        data = data.mesas;

        await setMesas(`/intimar/reserva/${id}/mesa`, data);
        toast.success("Mesa asignada con éxito");

        reset({
            reservaId: "",
            mesas: "",
        });

        const mozoId = employee.current.value;
        if (!mozoId) {
            toast.error("Debe seleccionar un mozo.");
            return;
        }
        let dataMozo = { mozoId };
        await setMozo(`intimar/reserva/${id}/mozo`, dataMozo);

        setTimeout(() => {
            window.location.href = "/admin/mesas";
        }, 1150);
    };

    useEffect(() => {
        console.log("reserva encontrada");
    }, [reserva]);

    const reservaOptions = reservasList?.map((reserva) => ({
        value: reserva.id,
        label: `${reserva?.client?.name} ${reserva?.client?.lastname} -- ${reserva?.fecha_reserva} -- ${reserva?.hora_reserva}`,
    }));

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Selección de reserva</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-reserva">
                            Buscar Reserva
                        </label>
                        <div style={{ width: "100%", height: "4rem" }}>
                            <Select
                                className={`form-control-alternative ${myStyles.input}`}
                                options={reservaOptions}
                                value={selectedReserva}
                                onChange={(selectedReserva) => {
                                    setSelectedReserva(selectedReserva);
                                    setValue(
                                        "reservaId",
                                        selectedReserva ? selectedReserva.value : ""
                                    );
                                }}
                                isDisabled={id && type === "reserva"}
                                placeholder="Seleccionar Reserva"
                            />
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-reserva">
                            Buscar Reserva
                        </label>
                        <div style={{ width: '100%', height: '4rem' }}>
                            <Select
                                className={`form-control-alternative ${myStyles.input}`}

                                options={reservasList?.map((reserva) => ({
                                    value: reserva.id,
                                    label: `${reserva?.client?.name} ${reserva?.client?.lastname} -- ${reserva?.fecha_reserva} -- ${reserva?.hora_reserva}`,
                                }))}
                                value={
                                    id &&
                                    type === "reserva" && {
                                        value: id,
                                        label: `${reserva?.client.name} ${reserva?.client.lastname} -- ${reserva?.fecha_reserva} -- ${reserva?.hora_reserva}`,
                                    }
                                }
                                onChange={(option) => setValue("reservaId", option)}
                                placeholder="Seleccionar Reserva"
                            />
                        </div>
                    </Col>
                </Row> */}
            </div>
            <h6 className="heading-small text-muted mb-4">Asignación de mesas</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-mesas">
                            Mesas
                        </label>
                        <FormGroup className={`${myStyles.Inputgroup} ${myStyles.selectContainer}`}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                type="select"
                                multiple                                
                                style={{ height: '3rem !important' }}
                                {...register("mesas")}
                            >
                                {mesasList?.map((mesa) => {
                                    if (id === mesa.id && type === "mesa") {
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
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-reserva">
                            Asignar Mozo
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                type="select"
                                ref={employee}
                            >
                                {employees?.map((employee) => {
                                    const { name, id, lastName } = employee;
                                    return (
                                        <option key={id} value={id}>
                                            {`${employee?.name} ${employee?.lastname}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" />
                Asignar mesa
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
};