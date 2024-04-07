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
    Button,
    Collapse,
    CardBody,
    Card,
} from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useState } from "react";

export const FormCreateEdit = ({ parameterId,reservarWithClientId }) => {
    /* Collapse Anticipo */
    const [collapse, setCollapse] = useState(false);
    const toggle = () => setCollapse(!collapse);

    const { handleSubmit, register, reset } = useForm();
    const [dataClient, setDataClient] = useState();
   

    const [clients, getClients] = useCrud();
    const [reservas,getReservas, createReserva, , updateReserva ] = useCrud();

    console.log(parameterId);

    useEffect(() => {
        getClients("/intimar/client");
        if(parameterId){
            getReservas("/intimar/reserva");
        }
    }, []); 

    useEffect(() => {
        /* para obtener el cliente si existe su id */
        if (reservarWithClientId || parameterId) {
            const idClient = reservarWithClientId? reservarWithClientId : parameterId
            /* obtengo el cliente por su id para crear o editar una reserva */
            let parseId = parseInt(idClient);
          if(clients){
              let clientEdit = clients.filter((element) => element.id === parseId);
              console.log(clientEdit);
              setDataClient(clientEdit[0]);
          }


        }
        
        if(parameterId && reservas) {
            /* obtengo la reserva por su id (editar la reserva)*/
            let parseId = parseInt(parameterId);
            let reservaEdit = reservas.filter((element) => element.id === parseId)
            
            const { fecha_reserva, hora_reserva, cant_adultos, cant_ninos,anticipo_required,motivo_reserva,clienteId,userId,anticipo} = reservaEdit[0];

            const { monto_anticipo, banco, moneda, estado_anticipo,} = anticipo;

            reset({
                fecha_reserva,
                hora_reserva,
                cant_adultos,
                cant_ninos,
                anticipo_required,
                motivo_reserva,
                clienteId,
                userId,
                anticipo: {
                    monto_anticipo,
                    banco,
                    moneda,
                    estado_anticipo,
                },
            });

           
        }
    }, [clients, reservas]);

    const user = localStorage.getItem("user");

    const submit = (data) => {
        if (reservarWithClientId) {
            data.clienteId = reservarWithClientId;
        } else {
            data.clienteId = Number(data.clienteId);
        }
        const { id } = JSON.parse(user);
        data.userId = Number(id);
        data.cant_adultos = Number(data.cant_adultos);
        data.cant_ninos = Number(data.cant_ninos);
        data.anticipo.monto_anticipo = Number(data.anticipo.monto_anticipo);
        data.anticipo_required = collapse;

        console.log(data);

        if (parameterId) {
            updateReserva("/intimar/client", parameterId, data);
            console.log("Editado");
            
        } else {
            createReserva("/intimar/reserva", data);
        }

        reset({
            fecha_reserva: "",
            hora_reserva: "",
            cant_adultos: "",
            cant_ninos: "",
            anticipo_required: "",
            motivo_reserva: "",
            clienteId: "",
            userId: "",
            anticipo: {
                monto_anticipo: "",
                banco: "",
                moneda: "",
                estado_anticipo: "",
            },
        });

        // window.location.href = "/admin/clients";
    };

    console.log("typo de dato de id cliente: ", typeof reservarWithClientId);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información requerida</h6>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-username">
                            Cliente
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <select
                                className={`form-control-alternative ${myStyles.input}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                type="select"
                                {...register("clienteId")}
                                disabled
                            >
                                {parameterId || reservarWithClientId ? (
                                    <option
                                        value={reservarWithClientId? reservarWithClientId : parameterId }
                                        selected
                                    >{`${dataClient?.name} ${dataClient?.lastname}`}</option>
                                ) : (
                                    clients?.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {`${client.name} ${client.lastname}`}
                                        </option>
                                    ))
                                )}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-email">
                            Motivo de reserva
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id=""
                                placeholder="Describa el motivo"
                                type="text"
                                {...register("motivo_reserva")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-first-name">
                            Cantidad de Adultos
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-first-name"
                                placeholder="Ingrese la cantidad en números"
                                type="number"
                                {...register("cant_adultos")}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Cantidad de Niños
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                placeholder="Ingrese la cantidad en números"
                                type="number"
                                {...register("cant_ninos")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Fecha de reserva
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                type="date"
                                {...register("fecha_reserva")}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <label className="form-control-label" htmlFor="input-last-name">
                            Hora de Reserva
                        </label>
                        <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                            <input
                                className={`form-control-alternative ${myStyles.input}`}
                                id="input-last-name"
                                type="time"
                                {...register("hora_reserva")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <hr className="my-4" />
            {/* Address */}
            <h6 className="heading-small text-muted mb-4">Información de Anticipo</h6>

            {/* ANTICIPO COLAPSE */}
            <div>
                <div className={myStyles.btnCheckedContainer}>
                    <Button onClick={toggle} className={myStyles.btnChecked}>
                        {collapse && <i class="fa-solid fa-check"></i>}
                    </Button>
                    <span>¿Anticipo Requerido?</span>
                </div>

                <Collapse isOpen={collapse}>
                    {/* FORM */}
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-address">
                                    Monto Anticipo
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <input
                                        className={`form-control-alternative ${myStyles.input}`}
                                        id=""
                                        placeholder="Ingrese la cantidad en números"
                                        type="number"
                                        {...register("anticipo.monto_anticipo")}
                                    />
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-city">
                                    Banco
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <input
                                        className={`form-control-alternative ${myStyles.input}`}
                                        id="input-city"
                                        placeholder="Ingrese el Banco"
                                        type="text"
                                        {...register("anticipo.banco")}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-city">
                                    Moneda
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <input
                                        className={`form-control-alternative ${myStyles.input}`}
                                        id="input-city"
                                        placeholder="Ingrese la moneda"
                                        type="text"
                                        {...register("anticipo.moneda")}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-city">
                                    Estado Anticipo
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <input
                                        className={`form-control-alternative ${myStyles.input}`}
                                        id="input-city"
                                        placeholder="Ingrese el estado del anticipo"
                                        type="text"
                                        {...register("anticipo.estado_anticipo")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
            </div>

            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> Crear Reserva
            </Button>
        </form>
    );
};
