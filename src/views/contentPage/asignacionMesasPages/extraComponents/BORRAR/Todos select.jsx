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

    const [reservaOptions, setReservaOptions] = useState([]);
    const [mesaOptions, setMesaOptions] = useState([]);
    const [mesas, getMesas] = useCrud();
    const [reservas, getReservas, setMesas] = useCrud();
    const [employees, getEmployees, setMozo] = useCrud();
    const employee = useRef();

    useEffect(() => {
        getMesas("/intimar/mesa");
        getReservas("/intimar/reserva");
        getEmployees("/intimar/employee");
    }, []);

    useEffect(() => {
        if (reservas) {
            const options = reservas.map(reserva => ({
                value: reserva.id,
                label: `${reserva.client.name} ${reserva.client.lastname} -- ${reserva.fecha_reserva} -- ${reserva.hora_reserva}`
            }));
            setReservaOptions(options);
        }
    }, [reservas]);

    useEffect(() => {
        if (mesas) {
            const mesasLibres = mesas.filter(mesa => mesa.estado_mesa === true);
            setMesaOptions(mesasLibres.map(mesa => ({
                value: mesa.id,
                label: `${mesa.ubicacion_mesa} -- ${mesa.numero_mesa}`
            })));
        }
    }, [mesas]);

    const handleReservaChange = (selectedOption) => {
        setValue('reservaId', selectedOption ? selectedOption.value : '');
    };

    const handleMesaChange = (selectedOption) => {
        const values = selectedOption.map(option => option.value);
        setValue('mesas', values);
    };

    const submit = async (data) => {
        // Tu lógica de submit aquí
    };

    // Definición de las ubicaciones
    const ubicaciones = [
        "patio",
        "terraza",
        "patio",
        "frente",
        "patio",
        "piscina",
        "barco",
        "piscina",
        "frente",
    ];

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
                            <Select
                                options={reservaOptions}
                                className={`form-control-alternative ${myStyles.input}`}
                                classNamePrefix="select"
                                onChange={handleReservaChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <h6 className="heading-small text-muted mb-4">Asignación de mesas</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-ubicacion">
                            Ubicación de la mesa
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <Select
                                options={ubicaciones.map((ubicacion, index) => ({ value: index, label: ubicacion }))}
                                className={`form-control-alternative ${myStyles.input}`}
                                classNamePrefix="select"
                                onChange={(selectedOption) => {
                                    const ubicacionSeleccionada = selectedOption ? selectedOption.label : '';
                                    const mesasFiltradas = mesas.filter(mesa => mesa.ubicacion_mesa === ubicacionSeleccionada && mesa.estado_mesa === true);
                                    const options = mesasFiltradas.map(mesa => ({
                                        value: mesa.id,
                                        label: `${mesa.ubicacion_mesa} -- ${mesa.numero_mesa}`
                                    }));
                                    setMesaOptions(options);
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="12">
                        <label className="form-control-label" htmlFor="input-mesas">
                            Mesas
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <Select
                                isMulti
                                options={mesaOptions}
                                className={`form-control-alternative ${myStyles.input}`}
                                classNamePrefix="select"
                                onChange={handleMesaChange}
                            />
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
