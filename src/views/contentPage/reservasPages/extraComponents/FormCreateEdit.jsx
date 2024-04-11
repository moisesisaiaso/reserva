import myStyles from "../../../../assets/css/myStyles.module.css";

import { FormGroup, Col, Row, Button, Collapse } from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormCreateEdit = ({ parameterId, reservarWithClientId }) => {
    const navigate = useNavigate();
    /* Collapse Anticipo */
    const adultosString = useRef();
    const ninosString = useRef();

    const [collapseIsOpen, setCollapseIsOpen] = useState(false);

    const handleTotalPeople = () => {
        let numberAdultos = parseInt(adultosString?.current?.value) || 0;
        let numberNinos = parseInt(ninosString?.current?.value) || 0;

        const totalPeoble = numberAdultos + numberNinos;

        if (totalPeoble >= 8) {
            setCollapseIsOpen(true);
        } else {
            setCollapseIsOpen(false);
        }
    };

    /*data input File */
    const infoFile = useRef();
    const [currentFile, setCurrentFile] = useState();

    const { handleSubmit, register, reset } = useForm();
    const [dataClient, setDataClient] = useState();
    const [clienteIdReserva, setClienteIdReserva] = useState();

    const [clients, getClients] = useCrud();
    const [reservas, getReservas, createReserva, , updateReserva] = useCrud();

    console.log(parameterId);

    useEffect(() => {
        getClients("/intimar/client");
        if (parameterId) {
            getReservas("/intimar/reserva");
        }
    }, []);

    let idClient = "";
    useEffect(() => {
        /* para obtener el cliente si existe su id */
        if (reservarWithClientId) {
            /* obtengo el cliente por su id para crear o editar una reserva */
            idClient = parseInt(reservarWithClientId);
            if (clients) {
                let clientEdit = clients.filter((element) => element.id === idClient);
                console.log(clientEdit);
                setDataClient(clientEdit[0]);
            }
        }

        if (parameterId && reservas) {
            /* obtengo la reserva por su id (editar la reserva)*/
            let idReserva = parseInt(parameterId);
            let reservaEdit = reservas.filter((element) => element.id === idReserva);

            const {
                fecha_reserva,
                hora_reserva,
                cant_adultos,
                cant_ninos,
                anticipo_required,
                motivo_reserva,
                clienteId,
                userId,
            } = reservaEdit[0];

            setClienteIdReserva(clienteId);
            setCollapseIsOpen(anticipo_required);

            /* si al momento de editar una reserva la propiedad anticipo_required es true, me despliega el formulario para editar el anticipo y esta condición me permite rellenar los campos de la reserva a editar solo con los compos que corresponden a cuando la reserva es con anticipo o no */
            if (collapseIsOpen) {
                const { anticipo } = reservaEdit[0];
                const { monto_anticipo, banco, moneda, estado_anticipo } = anticipo;
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
            } else {
                reset({
                    fecha_reserva,
                    hora_reserva,
                    cant_adultos,
                    cant_ninos,
                    anticipo_required,
                    motivo_reserva,
                    clienteId,
                    userId,
                });
            }
        }
    }, [clients, reservas]);

    const user = localStorage.getItem("user");

    /* varible a la que se le asigna la data puede ser (form data u objeto json) */
    let requestData;

    const submit = (data) => {
        if (reservarWithClientId) {
            data.clienteId = reservarWithClientId;
        } else {
            data.clienteId = Number(data.clienteId);
        }
        const { id } = JSON.parse(user);
        data.userId = Number(id);
        data.cant_adultos = Number(adultosString.current.value);
        data.cant_ninos = Number(ninosString.current.value);

        console.log("valor adultos: ", data.cant_adultos);
        console.log("valor niños: ", data.cant_ninos);

        if (collapseIsOpen) {
            data.anticipo.monto_anticipo = Number(data.anticipo.monto_anticipo);
        } else {
            delete data.anticipo;
            delete data.file;
        }

        data.anticipo_required = collapseIsOpen;

        /* cambiar a FORM DATA la data si existe el anticipo (cuando collapseIsOpen es true) de lo contrario mantener la data en formato json */

        if (collapseIsOpen) {
            const formData = new FormData();

            console.log("data anticipo: ", data.anticipo);

            // Primero, maneja el objeto anidado 'anticipo' si existe
            if (data.anticipo) {
                formData.append("anticipo", JSON.stringify(data.anticipo));
            }

            // Luego, maneja todas las demás claves que no están anidadas
            for (const key in data) {
                if (data.hasOwnProperty(key) && key !== "anticipo" && key !== "file") {
                    formData.append(key, data[key]);
                }
            }

            // Finalmente, añade el archivo si existe
            if (currentFile) {
                formData.append("file", currentFile);
            }

            requestData = formData;
            for (let [key, value] of requestData.entries()) {
                console.log(key, value);
            }
        } else {
            requestData = data;
        }

        /* peticiones para editar y crear reservas */
        if (parameterId) {
            updateReserva("/intimar/client", parameterId, requestData);
            console.log("Editar");
        } else {
            createReserva("/intimar/reserva", requestData);
            console.log("crear");
        }

        if (collapseIsOpen) {
            reset({
                fecha_reserva: "",
                hora_reserva: "",
                cant_adultos: "",
                cant_ninos: "",
                anticipo_required: "",
                motivo_reserva: "",
                clienteId: "",
                userId: "",
                file: "",
                anticipo: {
                    monto_anticipo: "",
                    banco: "",
                    moneda: "",
                    estado_anticipo: "",
                },
            });
        } else {
            reset({
                fecha_reserva: "",
                hora_reserva: "",
                cant_adultos: "",
                cant_ninos: "",
                anticipo_required: "",
                motivo_reserva: "",
                clienteId: "",
                userId: "",
            });
        }

        setCollapseIsOpen(false);

        // window.location.href = "/admin/reservas";

        // navigate("/admin/reservas/create", { state: false }); esta me sirve para el boton de crear reservas para eliminar el id del cliente que llega por estado de la url cuando accedo a crear una reserva apartir del boton reservar de la tabla clientes
    };

    /* datos de lo que viene en el campo file */
    const handleFileChange = () => {
        const selectedFile = infoFile.current.files[0];
        if (selectedFile) {
            setCurrentFile(selectedFile);
        }
    };

    /* Validando la HORA */
    const validarHora = (e) => {
        const hora = e.target.value; //formato 'HH:MM'
        const [horas, minutos] = hora.split(":").map((element) => Number(element));
        const totalMinutos = horas * 60 + minutos;

        // Convertir las horas de inicio y fin a minutos
        const inicio = 11 * 60; // 11:00 AM en minutos
        const fin = 16 * 60; //4:00 PM en minutos

        if (totalMinutos < inicio || totalMinutos > fin) {
            e.target.setCustomValidity("La hora debe estar entre las 11:00 y las 16:00.");
        } else {
            e.target.setCustomValidity("");
        }
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
                            >
                                {parameterId || reservarWithClientId ? (
                                    <option
                                        value={reservarWithClientId ? idClient : clienteIdReserva}
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
                                ref={adultosString}
                                onChange={handleTotalPeople}
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
                                ref={ninosString}
                                onChange={handleTotalPeople}
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
                                onChange={validarHora}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(e.target.validationMessage)
                                }
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
                    <Button disabled className={myStyles.btnChecked}>
                        {collapseIsOpen && <i class="fa-solid fa-check"></i>}
                    </Button>
                    <span>¿Anticipo Requerido?</span>
                </div>

                <Collapse isOpen={collapseIsOpen}>
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
                                        placeholder="Ingrese la cantidad en números"
                                        type="number"
                                        {...register("anticipo.monto_anticipo")}
                                        required={collapseIsOpen}
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
                                        required={collapseIsOpen}
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
                                        required={collapseIsOpen}
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
                                        required={collapseIsOpen}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <label className="form-control-label">Subir Comprobante</label>
                                <FormGroup
                                    className={
                                        myStyles.inputSearch +
                                        " " +
                                        myStyles.Inputgroup +
                                        " " +
                                        myStyles.inputFileGroup
                                    }
                                >
                                    {currentFile ? (
                                        <p>
                                            {currentFile.name} {currentFile.size} Kb
                                        </p>
                                    ) : (
                                        <p>No se ha seleccionado ningún archivo.</p>
                                    )}

                                    <input
                                        className={`form-control-alternative ${myStyles.inputFile}`}
                                        placeholder="Seleccione el archivo"
                                        type="file"
                                        {...register("file")}
                                        ref={infoFile}
                                        onChange={handleFileChange}
                                        required={collapseIsOpen}
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
