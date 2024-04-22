import myStyles from "../../../../assets/css/myStyles.module.css";

import React, { useState } from "react";
import { Badge, Button, Modal } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import es from 'date-fns/locale/es'; 

export const TableComponent = ({ reserva, deleteReserva, lengthId, itemsPerPage, currentPage }) => {
    const { id, fecha_reserva, hora_reserva, cant_adultos, cant_ninos, motivo_reserva, client, estado_reserva, anticipo } = reserva;

    console.log("data client ", client?.name);

    let estadoAnticipo = anticipo ? anticipo.estado_anticipo : "-";

    const navigate = useNavigate();

    const [stateModal, setStateModal] = useState(false);

    const handleMesa = () => {
        navigate("/admin/mesas/create", { state: id });
    };

    const handleDetail = () => {
        navigate("/admin/reservas/detail", { state: id });
    };

    const handleEdit = () => {
        navigate(`/admin/reservas/create/${id}`);
    };

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = () => {
        deleteReserva("/intimar/reserva", id);
        toggleModal();
    };

    const pageActual = currentPage - 1;
    const groupPage = pageActual * itemsPerPage;

    const getEstadoReservaColor = () => {
        if (estado_reserva === "Pendiente a confirmar") {
            return "warning";
        } else if (estado_reserva === "Cancelada") {
            return "danger";
        } else if (estado_reserva === "Confirmada") {
            return "success";
        } else {
            return "primary";
        }
    };

    const fechaFormateada = format(new Date(fecha_reserva), 'dd-MM-yyyy', { locale: es });
    const horaFormateada = format(new Date(`1970-01-01T${hora_reserva}Z`), 'HH:mm');

    return (
        <>
            <tr>
                <th scope="row">{lengthId + 1 + groupPage}</th>
                <td>
                    {client?.name} {client?.lastname}
                </td>
                <td>{fechaFormateada}</td>
                <td>{horaFormateada}</td>
                <td>{cant_adultos}</td>
                <td>{cant_ninos}</td>
                <td>
                    <Badge color={getEstadoReservaColor()} pill>
                        {estado_reserva}
                    </Badge>
                </td>
                <td>{estadoAnticipo}</td>
                <td className={myStyles.actions}>
                    <a onClick={handleMesa} className={myStyles.btnReserva}>
                        Asignar Mesa
                    </a>

                    <div>
                        <a onClick={handleDetail} className={myStyles.btnDetail}>
                            <i className="fa-regular fa-eye fa-2x"></i>
                        </a>
                        <a onClick={handleEdit} className={myStyles.btnEdit}>
                            <i className="fa-regular fa-pen-to-square fa-2x"></i>
                        </a>

                        <a href="#" className={myStyles.btnDelete} onClick={toggleModal}>
                            <i className="fa-regular fa-trash-can fa-2x"></i>
                        </a>
                    </div>
                </td>
            </tr>

            {/* Modal */}
            <Modal className="modal-dialog-centered" isOpen={stateModal} toggle={toggleModal}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" color="warning">
                        ⚠️ Advertencia !!!
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h3>Se eliminará 1 registro</h3>
                    <p>
                        Está seguro que desea eliminar la reserva del cliente:
                        <strong>
                            {" "}
                            {client?.name} {client?.lastname}
                        </strong>
                    </p>
                </div>
                <div className="modal-footer">
                    <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleModal}
                    >
                        Cerrar
                    </Button>
                    <Button color="primary" type="button" onClick={handleDelete}>
                        Eliminar registro
                    </Button>
                </div>
            </Modal>
        </>
    );
};
