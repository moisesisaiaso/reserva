import myStyles from "../../../../assets/css/myStyles.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import { Button, Modal } from "reactstrap";

export const TableComponent = ({ client, deleteClient, lengthId, itemsPerPage, currentPage }) => {
    const { id, name, lastname, email, countryCode, cellphone } = client;

    const navigate = useNavigate();

    const [stateModal, setStateModal] = useState(false);

    const handleReserva = () => {
        navigate("/admin/reservas/create", { state: id });
    };

    const handleDetail = () => {
        window.location.href = `/admin/clients/detail/${id}`;
    };
    const handleEdit = () => {
        window.location.href = `/admin/clients/create/${id}`;
    };

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = () => {
        deleteClient("/intimar/client", id);
        toggleModal();
    };

    /* items clients */
    const pageActual = currentPage - 1;
    const groupPage = pageActual * itemsPerPage;

    return (
        <>
            <tr>
                <th scope="row">{lengthId + 1 + groupPage}</th>
                <td>
                    {name} {lastname}
                </td>
                <td>+{countryCode} {cellphone}</td>
                <td>{email || "N/A"} </td>
                <td className={myStyles.actions}>
                    <a onClick={handleReserva} className={myStyles.btnReserva}>
                        Reservar
                    </a>

                    <div>
                        <a onClick={handleDetail} className={myStyles.btnDetail}>
                            <i class="fa-regular fa-eye fa-2x"></i>
                        </a>
                        <a onClick={handleEdit} className={myStyles.btnEdit}>
                            <i class="fa-regular fa-pen-to-square fa-2x"></i>
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
                        Está seguró que desea eliminar al Cliente con nombre{" "}
                        <strong>
                            {name} {lastname}
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
