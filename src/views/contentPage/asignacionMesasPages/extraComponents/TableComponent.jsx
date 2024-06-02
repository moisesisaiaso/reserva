import myStyles from "../../../../assets/css/myStyles.module.css";

import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCrud } from "hooks/useCrud";

export const TableComponent = ({
    reserva,
    removeAsignacion,
    lengthId,
    itemsPerPage,
    currentPage,
    setUpdated,
    updated,
    setIsFilter,
    finalizarReserva,
}) => {
    const { id, client, fecha_reserva, hora_reserva, hora_llegada, mesas, mozo } = reserva;

    const navigate = useNavigate();

    const [stateModal, setStateModal] = useState(false);

    const handleFinalizar = async () => {
        await finalizarReserva(`intimar/reserva/${id}/end`);
        setUpdated(!updated);
        setIsFilter(true);
    };

    const handleDetail = () => {
        navigate("/admin/reservas/detail", { state: id });
    };

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = async () => {
        await removeAsignacion(`/intimar/reserva/${id}/mesa`);
        toggleModal();
        setUpdated(!updated);
        setIsFilter(true);
    };

    /* items asignaciones */
    const pageActual = currentPage - 1;
    const groupPage = pageActual * itemsPerPage;

    return (
        <>
            <tr>
                <th scope="row">{lengthId + 1 + groupPage}</th>
                <td>
                    {client?.name} {client?.lastname}
                </td>
                <td>{fecha_reserva}</td>
                <td>{hora_reserva}</td>
                <td>{hora_llegada}</td>
                <td>
                    <ul>
                        {mesas?.map((mesa) => (
                            <li>{mesa.ubicacion_mesa}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <ul>
                        {mesas?.map((mesa) => (
                            <li>{mesa.numero_mesa}</li>
                        ))}
                    </ul>
                </td>
                <td>{`${mozo?.name} ${mozo?.lastname}`}</td>
                <td className={myStyles.actions}>
                    <a onClick={handleFinalizar} className={myStyles.btnReserva}>
                        Finalizar Reserva
                    </a>

                    <div>
                        <a onClick={handleDetail} className={myStyles.btnDetail}>
                            <i class="fa-regular fa-eye fa-2x"></i>
                        </a>

                        <a href="#" className={myStyles.btnDelete} onClick={toggleModal}>
                            <i class="fa-regular fa-trash-can fa-2x"></i>
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
                        Está seguro que desea eliminar la asignacion de la mesa del cliente:
                        <strong>
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
