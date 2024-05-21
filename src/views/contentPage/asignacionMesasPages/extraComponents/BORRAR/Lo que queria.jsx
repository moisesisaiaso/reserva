import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Col, Row, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useRef, useState } from "react";
import Select from 'react-select';

export const FormCreateEdit = ({ id, type }) => {
    const { handleSubmit, register, reset, setValue } = useForm({
        defaultValues: {
            reservaId: id && type === "reserva" ? [id] : [],
            mesas: id && type === "mesa" ? [id] : [],
        },
    });

    const [reserva, setReserva] = useState();
    const [mesas, getMesas] = useCrud();
    const [reservas, getReservas, setMesas] = useCrud();
    const [employees, getEmployees, setMozo] = useCrud();
    const [mesasList, setMesaList] = useState([]);
    const employee = useRef();

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        let parseId = parseInt(id);
        if (id && reservas && type === "reserva") {
            let reserva = reservas.filter((reserva) => reserva.id === parseId);
            setReserva(reserva[0]);
        }

        if (mesas) {
            const mesasLibres = mesas.filter((mesa) => mesa.estado_mesa === true);
            setMesaList(mesasLibres.map(mesa => ({
                value: mesa.id,
                label: `${mesa.ubicacion_mesa} -- ${mesa.numero_mesa}`
            })));
        }
    }, [mesas, reservas]);

    const submit = async (data) => {
        const id = data.reservaId;
        delete data.reservaId;
        data = data.mesas;

        await setMesas(`/intimar/reserva/${id}/mesa`, data);

        reset({
            reservaId: "",
            mesas: "",
        });

        const mozoId = employee.current.value;
        let dataMozo = { mozoId };
        await setMozo(`intimar/reserva/${id}/mozo`, dataMozo);

        window.location.href = "/admin/asignar-mesa";
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Selección de reserva</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-reserva">
                            Reservas en espera
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                {...register("reservaId")}
                            >
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
                            </select>
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
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <Select
                                isMulti
                                options={mesasList}
                                className={`form-control-alternative ${myStyles.input}`}
                                classNamePrefix="select"
                                onChange={(selectedOptions) => {
                                    const values = selectedOptions.map(option => option.value);
                                    setValue('mesas', values);
                                }}
                            />
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
        </form>
    );
};
