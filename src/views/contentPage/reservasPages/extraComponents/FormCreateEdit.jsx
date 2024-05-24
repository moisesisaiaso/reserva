import myStyles from "../../../../assets/css/myStyles.module.css";

import { FormGroup, Col, Row, Button, Collapse } from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useRef, useState } from "react";
import { json } from "react-router-dom";

export const FormCreateEdit = ({ parameterId, reservarWithClientId }) => {
    /* parameterId y asignarWithReservaId ambos me devuelven el id de la reserva, la diferencia es de donde vienen, asignarWithReservaId es el id de reserva que viene apartir de la tabla reserva de esta forma yo se que este dato solo va a utilizarse para rellenar el un campo del formulario de asignación de mesa en especifico el campo de reservaId; 
    cuando parameterId existe significa que este dato viene del parametro de la url cuando accedo a este formulario lo que significa que es para editar un registro, es decir con este parameterId obtengo todo los campos de esta asignación de mesa ya existente para poder mostrarlo en los campos y editar  */
    /* Collapse Anticipo */
    const adultosString = useRef();
    const ninosString = useRef();
    const [adultos, setAdultos] = useState();
    const [ninos, setNinos] = useState();

    const [collapseIsOpen, setCollapseIsOpen] = useState(false);
    const [showSelectDropdown, setShowSelectDropdown] = useState(true);

    const handleTotalPeople = () => {
        let numberAdultos = parseInt(adultosString?.current?.value) || 0;
        let numberNinos = parseInt(ninosString?.current?.value) || 0;

        setAdultos(numberAdultos);
        setNinos(numberNinos);

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
    const [reserva, setReserva] = useState();
    const [filePreview, setFilePreview] = useState(null);
    const [imageHeight, setImageHeight] = useState(null);
    const [clientName, setClientName] = useState();

    console.log(parameterId);

    useEffect(() => {
        getClients("/intimar/client");

        if (parameterId) {
            getReservas("/intimar/reserva");
        }
    }, [
        parameterId,
    ]); /* al no pasar el array de dependencia con un valor en este caso aunque si me llegara por props el parameterId la primera vez que se renderizaba el componente no me llegaba el valor y no obtenía los datos a editar por eso es bueno establecerlo en el array de dependencias */

    let idClient = "";
    useEffect(() => {
        /* para obtener el cliente si existe su id cuando viene de la tabla clientes*/
        if (reservarWithClientId) {
            /* obtengo el cliente por su id para crear una reserva */
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

            setReserva(reservaEdit[0]);
        }
    }, [clients, parameterId, reservas]);

    useEffect(() => {
        if (reserva) {
            const {
                fecha_reserva,
                hora_reserva,
                cant_adultos,
                cant_ninos,
                anticipo_required,
                motivo_reserva,
                clienteId,
                file,
                client,
            } = reserva;

            console.log("holaa: ", client);

            setClientName(client);
            setClienteIdReserva(clienteId);
            setCollapseIsOpen(anticipo_required);

            /* En estos casos se tuvo que mandar directamente los valores a los campos con el atributo value ya que use Form no mostraba estos valores */
            setAdultos(reserva.cant_adultos);
            setNinos(reserva.cant_ninos);

            setCurrentFile(file);

            /* si al momento de editar una reserva la propiedad anticipo_required es true, me despliega el formulario para editar el anticipo y esta condición me permite rellenar los campos de la reserva a editar solo con los compos que corresponden a cuando la reserva es con anticipo o no */

            if (anticipo_required) {
                setCollapseIsOpen(anticipo_required);
                const { anticipo } = reserva;
                const { monto_anticipo, banco, moneda, estado_anticipo } = anticipo;
                reset({
                    fecha_reserva,
                    hora_reserva,
                    cant_adultos,
                    cant_ninos,
                    anticipo_required,
                    motivo_reserva,
                    clienteId,
                    file,
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
                });
            }
        }
    }, [reserva]);

    /* varible a la que se le asigna la data puede ser (form data u objeto json) */
    let requestData;

    const submit = async (data) => {
        try {
            console.log("data: ", data.file[0]);
            data.file = data.file[0];
            if (reservarWithClientId) {
                data.clienteId = reservarWithClientId;
            } else {
                data.clienteId = Number(data.clienteId);
            }

            data.cant_adultos = Number(adultosString.current.value);
            data.cant_ninos = Number(ninosString.current.value);

            console.log("valor adultos: ", data.cant_adultos);
            console.log("valor niños: ", data.cant_ninos);

            data.anticipo_required = collapseIsOpen;

            /* cambiar a FORM DATA la data si existe el anticipo (cuando collapseIsOpen es true) de lo contrario mantener la data en formato json */

            if (collapseIsOpen) {
                data.anticipo.monto_anticipo = Number(data.anticipo.monto_anticipo);
                let fechaHoy = new Date().toISOString().split("T")[0];
                data.anticipo.fecha_anticipo = fechaHoy;

                const formData = new FormData();

                console.log("data anticipo: ", data.anticipo);

                // Primero, maneja el objeto anidado 'anticipo' si existe
                // if (data.anticipo) {
                //     formData.append("anticipo", JSON.stringify(data.anticipo));
                // }
                if (data.anticipo) {
                    const anticipoConArchivo = {
                        ...data.anticipo,
                    };
                    formData.append("anticipo", JSON.stringify(anticipoConArchivo));
                }

                // Luego, maneja todas las demás claves que no están anidadas
                for (const key in data) {
                    if (data.hasOwnProperty(key) && key !== "anticipo") {
                        formData.append(key, data[key]);
                    }
                }

                // Finalmente, añade el archivo si existe
                // if (currentFile) {
                //     formData.append("file", currentFile);
                // }

                requestData = formData;

                for (let [key, value] of requestData.entries()) {
                    console.log(key, value);
                }
            } else {
                delete data.anticipo;
                delete data.file;
                requestData = data;
            }

            /* peticiones para editar y crear reservas */
            if (parameterId) {
                await updateReserva("/intimar/client", parameterId, requestData);
                console.log("Editar");
            } else {
                const crear = await createReserva("/intimar/reserva", requestData);
                console.log("respuesta de crear", crear?.data);
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
                });
            }

            setCollapseIsOpen(false);

            // window.location.href = "/admin/reservas";
        } catch (error) {
            console.log(error);
        }
    };

    /* datos de lo que viene en el campo file */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Verifica si el tamaño del archivo es menor o igual a 10 MB
        if (file && file.size <= 10 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Si el tamaño excede los 10 MB, muestra una alerta
            alert("El tamaño del archivo no puede superar los 10 MB.");
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
                                    >
                                        {reservarWithClientId
                                            ? `${dataClient?.name} ${dataClient?.lastname}`
                                            : clientName?.name}
                                    </option>
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
                                value={adultos}
                                ref={adultosString}
                                onChange={handleTotalPeople}
                                required
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
                                value={ninos}
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
                                required
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
                                onChange={validarHora}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(e.target.validationMessage)
                                }
                                {...register("hora_reserva")}
                                required
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
                                    <select
                                        className={`form-control-alternative ${myStyles.input}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        id="input-city"
                                        {...register("anticipo.banco")}
                                        required={collapseIsOpen}
                                    >
                                        <option value="">Seleccionar banco</option>
                                        <option value="yaoe">Yape</option>
                                        <option value="Plin">Plin</option>
                                        <option value="BCP">BCP</option>
                                        <option value="Interbank">Interbank</option>
                                        <option value="Scotiabank">Scotiabank</option>
                                        <option value="BBVA">BBVA</option>
                                        <option value="BanBif">BanBif</option>
                                    </select>
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-city">
                                    Moneda
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <select
                                        className={`form-control-alternative ${myStyles.input}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        id="input-city"
                                        {...register("anticipo.moneda")}
                                        required={collapseIsOpen}
                                    >
                                        <option value="">Seleccionar ...</option>
                                        <option value="PEN">PEN</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <label className="form-control-label" htmlFor="input-city">
                                    Estado Anticipo
                                </label>
                                <FormGroup
                                    className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                                >
                                    <select
                                        className={`form-control-alternative ${myStyles.input}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        id="input-city"
                                        {...register("anticipo.estado_anticipo")}
                                        required={collapseIsOpen}
                                    >
                                        <option value="">Seleccionar ...</option>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Aprobado">Aprobado</option>
                                        <option value="Rechazado">Rechazado</option>
                                    </select>
                                </FormGroup>
                            </Col>

                            <Col md="12">
                                <label className="form-control-label">Subir Comprobante</label>
                                <FormGroup className="input-group">
                                    {filePreview && (
                                        <img
                                            src={filePreview}
                                            alt="File Preview"
                                            style={{ maxWidth: "100px", marginRight: "2rem" }}
                                        />
                                    )}
                                    <div className="custom-file">
                                        <input
                                            className="custom-file-input"
                                            id="customFile"
                                            type="file"
                                            {...register("file")}
                                            onChange={handleFileChange}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            No se ha seleccionado ningún archivo.
                                        </label>
                                    </div>
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
