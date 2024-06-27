import myStyles from "../../../../assets/css/myStyles.module.css";

import { FormGroup, Col, Row, Button, Collapse } from "reactstrap";

import { useForm } from "react-hook-form";
import { useCrud } from "hooks/useCrud";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormCreateEdit = ({ parameterId, reservarWithClientId }) => {
    /* parameterId y asignarWithReservaId ambos me devuelven el id de la reserva, la diferencia es de donde vienen, asignarWithReservaId es el id de reserva que viene apartir de la tabla reserva de esta forma yo se que este dato solo va a utilizarse para rellenar  un campo del formulario de asignación de mesa en especifico el campo de reservaId; 
    cuando parameterId existe significa que este dato viene del parametro de la url cuando accedo a este formulario lo que significa que es para editar un registro, es decir con este parameterId obtengo todo los campos de esta asignación de mesa ya existente para poder mostrarlo en los campos y editar  */
    /* Collapse Anticipo */
    const adultosString = useRef();
    const ninosString = useRef();
    const [adultos, setAdultos] = useState();
    const [ninos, setNinos] = useState();

    const [collapseIsOpen, setCollapseIsOpen] = useState(false);

    const [currentFile, setCurrentFile] = useState();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [dataClient, setDataClient] = useState();
    const [clienteIdReserva, setClienteIdReserva] = useState();
    const [clients, getClients] = useCrud();
    const [reservas, getReservas, createReserva, , updateReserva] = useCrud();
    const [reserva, setReserva] = useState();
    const [filePreview, setFilePreview] = useState(null);
    const [fileUploadedMessage, setFileUploadedMessage] = useState("");

    const [clientName, setClientName] = useState();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        getClients("/intimar/client").then((fetchedClients) => {
            console.log("Fetched clients:", fetchedClients);
        });
        if (parameterId) {
            getReservas("/intimar/reserva").then((fetchedReservas) => {
                console.log("Fetched reservas:", fetchedReservas);
            });
        }
    }, [
        parameterId,
    ]); /* al no pasar el array de dependencia con un valor en este caso aunque si me llegara por props el parameterId la primera vez que se renderizaba el componente no me llegaba el valor y no obtenía los datos a editar por eso es bueno establecerlo en el array de dependencias */

    useEffect(() => {
        /* para obtener el cliente si existe su id cuando viene de la tabla clientes*/
        if (reservarWithClientId) {
            const idClient = parseInt(reservarWithClientId);
            if (clients && clients.length > 0) {
                // Se busca la reserva correspondiente en la lista de reservas utilizando el ID
                const clientEdit = clients.find((element) => element.id === idClient);
                if (clientEdit) {
                    setDataClient(clientEdit);
                    setSelectedOption({
                        value: clientEdit.id,
                        label: `${clientEdit.name} ${clientEdit.lastname}`,
                    });
                    setValue("clienteId", idClient); // Se establece el valor del campo "clienteId" en el formulario
                }
            }
        } else if (parameterId && reservas && reservas.length > 0) {
            const idReserva = parseInt(parameterId);
            const reservaEdit = reservas.find((element) => element.id === idReserva);
            setReserva(reservaEdit);
            if (reservaEdit) {
                const idClient = reservaEdit.clienteId;
                if (clients && clients.length > 0) {
                    const clientEdit = clients.find((element) => element.id === idClient);
                    if (clientEdit) {
                        setDataClient(clientEdit);
                        setSelectedOption({
                            value: clientEdit.id,
                            label: `${clientEdit.name} ${clientEdit.lastname}`,
                        });
                        setValue("clienteId", idClient);
                    }
                }
            }
        }
    }, [clients, parameterId, reservarWithClientId, reservas]);

    useEffect(() => {
        if (reserva) {
            const {
                fecha_reserva,
                hora_reserva,
                cant_adultos,
                cant_ninos,
                estado_reserva,
                anticipo_required,
                motivo_reserva,
                clienteId,
                file,
                client,
            } = reserva;
            setClientName(client);
            setClienteIdReserva(clienteId);
            setCollapseIsOpen(anticipo_required);

            /* En estos casos se tuvo que mandar directamente los valores a los campos con el atributo value ya que use Form no mostraba estos valores */
            setAdultos(reserva.cant_adultos);
            setNinos(reserva.cant_ninos);
            setValue("estado_reserva", estado_reserva);

            setCurrentFile(file);

            /* si al momento de editar una reserva la propiedad anticipo_required es true, me despliega el formulario para editar el anticipo y esta condición me permite rellenar los campos de la reserva a editar solo con los compos que corresponden a cuando la reserva es con anticipo o no */
            if (anticipo_required) {
                const { anticipo } = reserva;
                const { monto_anticipo, banco, moneda, estado_anticipo } = anticipo;
                reset({
                    fecha_reserva,
                    hora_reserva,
                    cant_adultos,
                    cant_ninos,
                    estado_reserva,
                    anticipo_required,
                    motivo_reserva,
                    clienteId,
                    file,
                    anticipo: { monto_anticipo, banco, moneda, estado_anticipo },
                });
            } else {
                reset({
                    fecha_reserva,
                    hora_reserva,
                    cant_adultos,
                    cant_ninos,
                    estado_reserva,
                    anticipo_required,
                    motivo_reserva,
                    clienteId,
                });
            }
        }
    }, [reserva, setValue]);

    const handleTotalPeople = () => {
        const numberAdultos = parseInt(adultosString?.current?.value) || 0;
        const numberNinos = parseInt(ninosString?.current?.value) || 0;
        setAdultos(numberAdultos);
        setNinos(numberNinos);
        const totalPeople = numberAdultos + numberNinos;
        setCollapseIsOpen(totalPeople >= 8);

        // Calcular el monto del anticipo
        let montoAnticipo = 0;
        if (totalPeople >= 8) {
            montoAnticipo = totalPeople * 20;
        }

        // Actualizar el valor del campo del monto de anticipo en el formulario
        setValue("anticipo.monto_anticipo", montoAnticipo);
    };

    /* datos de lo que viene en el campo file */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 10 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result); // Establece la vista previa del archivo
                setFileUploadedMessage("Imagen subida correctamente."); // Mensaje de éxito
            };
            reader.readAsDataURL(file); // Lee el archivo como URL para la vista previa
        } else {
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
        const fin = 17 * 60 + 30; // 5:30 PM en minutos

        if (totalMinutos < inicio || totalMinutos > fin) {
            toast.error("La hora de reserva debe estar entre las 11:00 y las 17:30."); // Mostrar notificación de error
            e.target.setCustomValidity(
                "La hora de reserva debe estar entre las 11:00 y las 17:30."
            );
        } else {
            e.target.setCustomValidity("");
        }
    };

    const removeEmptyFields = (data) => {
        return Object.entries(data)
            .filter(([key, value]) => value)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    };

    const submit = async (data) => {
        data = removeEmptyFields(data); // Filtra los campos vacíos
        try {
            if (!data.clienteId) {
                // Mostrar notificación de error si no se selecciona un cliente
                toast.error("Debe seleccionar un cliente.");
                return; // Salir de la función sin continuar con la creación de la reserva
            }

            // Validar hora de reserva
            const horaReserva = data.hora_reserva;
            const [horas, minutos] = horaReserva.split(":").map((element) => Number(element));
            const totalMinutos = horas * 60 + minutos;
            const inicio = 11 * 60; // 11:00 AM en minutos
            const fin = 17 * 60 + 30; // 5:30 PM en minutos

            if (totalMinutos < inicio || totalMinutos > fin) {
                toast.error("La hora de reserva debe estar entre las 11:00 y las 17:30.");
                return;
            }

            data.file = data.file[0];
            data.clienteId =
                reservarWithClientId ||
                (selectedOption ? selectedOption.value : Number(data.clienteId));
            data.cant_adultos = Number(adultosString.current.value);
            data.cant_ninos = Number(ninosString.current.value);
            data.anticipo_required = collapseIsOpen;

            /* varible a la que se le asigna la data puede ser (form data u objeto json) */
            let requestData;

            /* cambiar a FORM DATA la data si existe el anticipo (cuando collapseIsOpen es true) de lo contrario mantener la data en formato json */
            if (collapseIsOpen) {
                data.anticipo.monto_anticipo = Number(data.anticipo.monto_anticipo);
                data.anticipo.fecha_anticipo = new Date().toISOString().split("T")[0];
                const formData = new FormData();

                // Primero, maneja el objeto anidado 'anticipo' si existe
                // if (data.anticipo) {
                //     formData.append("anticipo", JSON.stringify(data.anticipo));
                // }
                if (data.anticipo) formData.append("anticipo", JSON.stringify(data.anticipo));
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
                // Edición de reserva existente
                if (reservarWithClientId) {
                    // Si hay un cliente específico asociado a la reserva, usar su ID
                    data.clienteId = reservarWithClientId;
                } else {
                    // Si no hay un cliente específico, usar el ID proporcionado en los datos
                    data.clienteId = Number(data.clienteId);
                }

                // Llamada para actualizar la reserva
                await updateReserva("/intimar/reserva", parameterId, requestData);
                toast.success("Reserva editada correctamente.");
            } else {
                // Creación de una nueva reserva
                // Aquí puedes mantener el mismo código para la creación de reserva
                const crear = await createReserva("/intimar/reserva", requestData);
                toast.success("Reserva creada correctamente.");
                console.log("respuesta de crear", crear?.data);
                console.log("crear");
            }

            setTimeout(() => {
                // window.location.href = "/admin/reservas";
            }, 1250);
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            toast.error("Hubo un error al procesar la solicitud");
        }
    };

    const clientOptions = clients?.map((client) => ({
        value: client?.id,
        label: `${client?.name} ${client?.lastname}`,
    }));

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h6 className="heading-small text-muted mb-4">Información requerida</h6>
            <div className="pl-lg-4">
                <Row>
                <Col lg="12" style={{ marginBottom: "1.5rem" }}>
                        <label className="form-control-label" htmlFor="input-username">
                            Cliente
                        </label>
                        <div style={{ width: "100%", height: "3rem" }}>
                            <Select
                                className={`form-control-alternative ${myStyles.input}`}
                                options={clientOptions}
                                value={selectedOption}
                                onChange={(selectedOption) => {
                                    console.log("Selected option:", selectedOption);
                                    setSelectedOption(selectedOption);
                                    setValue(
                                        "clienteId",
                                        selectedOption ? selectedOption.value : ""
                                    );
                                }}
                                isDisabled={
                                    (parameterId && !reservarWithClientId) || reservarWithClientId
                                }
                                placeholder="Buscar cliente"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: "100%",
                                    }),
                                }}
                            />
                        </div>
                        {errors.clienteId && (
                            <span className="text-danger">Debe seleccionar un cliente.</span>
                        )}
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
                            {errors.cant_adultos && (
                                <span className="text-danger">{errors.cant_adultos.message}</span>
                            )}
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
                                id="fecha_reserva"
                                className={`form-control ${myStyles.input} ${
                                    errors.fecha_reserva ? "is-invalid" : ""
                                }`}
                                type="date"
                                {...register("fecha_reserva", {
                                    required: "La fecha de la reserva es requerida",
                                })}
                                min={new Date().toISOString().split("T")[0]} // Establece la fecha mínima a la fecha de hoy
                            />
                            {errors.fecha_reserva && (
                                <span className="text-danger">{errors.fecha_reserva.message}</span>
                            )}
                        </FormGroup>
                    </Col>
                    <Col md="6">
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
                                // required
                            />
                            {errors.hora_reserva && (
                                <span className="text-danger">{errors.hora_reserva.message}</span>
                            )}
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

                    {parameterId && (
                        <Col lg="12">
                            <label className="form-control-label" htmlFor="estado_reserva">
                                Estado de reserva
                            </label>
                            <FormGroup className={myStyles.inputSearch + " " + myStyles.Inputgroup}>
                                <select
                                    className={`form-control-alternative ${myStyles.input}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    id="estado_reserva"
                                    {...register("estado_reserva")}
                                    // value={"Pendiente"}
                                    // defaultValue="Pendiente" // Cambiado de value a defaultValue
                                >
                                    <option value="">Seleccionar estado</option>
                                    <option value="Pendiente a confirmar">Pendiente a confirmar</option>
                                    <option value="Confirmada">Confirmada</option>
                                    <option value="Cancelada">Cancelada</option>
                                    <option value="Lista de espera">Lista de espera</option>
                                    <option value="En proceso">En proceso</option>
                                    <option value="Finalizada">Finalizada</option>
                                </select>
                            </FormGroup>
                        </Col>
                    )}
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
                                        defaultValue="PEN"
                                        required={collapseIsOpen}
                                    >
                                        <option value="">Seleccionar banco</option>
                                        <option value="Yape">Yape</option>
                                        <option value="Plin">Plin</option>
                                        <option value="BCP">BCP</option>
                                        <option value="Interbank">Interbank</option>
                                        <option value="Scotiabank">Scotiabank</option>
                                        <option value="BBVA">BBVA</option>
                                        <option value="BanBif">BanBif</option>
                                        <option value="Banco de la Nación">Banco de la Nación</option>
                                        <option value="Pichincha">Pichincha</option>
                                        <option value="Paypal">Paypal</option>
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
                                        defaultValue="PEN"
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
                                        {fileUploadedMessage || "No se ha seleccionado ningún archivo."}
                                        </label>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
            </div>

            <Button block color="primary" size="lg" type="submit">
                <i className="ni ni-send" /> {parameterId ? "Editar Reserva" : "Crear Reserva"}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
};
