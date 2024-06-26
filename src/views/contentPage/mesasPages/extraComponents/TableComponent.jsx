import myStyles from "../../../../assets/css/myStyles.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import { Button, Modal } from "reactstrap";

export const TableComponent = ({ mesa, deleteMesa, lengthId, itemsPerPage, currentPage }) => {
    const { id, ubicacion_mesa, numero_mesa, estado_mesa } = mesa;

    const navigate = useNavigate();

    const [stateModal, setStateModal] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        const estado = mesa.estado_mesa;
        setIsDisable(!estado);
    }, []);
    let buttonDisable = {};
    if (isDisable) {
        buttonDisable = {
            opacity: 0.5,
        };
    }

    const handleMesa = () => {
        if (!isDisable) {
            navigate("/admin/mesas/crearAsignacion", { state: { id, type: "mesa" } });
        }
    };

    const handleEdit = () => {
        navigate("/admin/mesas/create/", { state: id });
    };

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = () => {
        deleteMesa("/intimar/mesa", id);
        toggleModal();
    };

    // const handleDetail = () => {
    //     navigate("/admin/reservas/detail", { state: id });
    // };


    /* items mesas */
    const pageActual = currentPage - 1;
    const groupPage = pageActual * itemsPerPage;

    return (
        <>
            <tr>
                <th scope="row">{lengthId + 1 + groupPage}</th>
                <td>{ubicacion_mesa}</td>
                <td>{numero_mesa} </td>
                <td>{mesa.estado_mesa ? "Disponible" : "No disponible"}</td>
                <td className={myStyles.actions}>
                    <a onClick={handleMesa} className={myStyles.btnReserva} style={buttonDisable}>
                        Asignar mesa
                    </a>

                    <div>
                    {/* <a onClick={handleDetail} className={myStyles.btnDetail}>
                            <i class="fa-regular fa-eye fa-2x"></i>
                        </a> */}
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
                        Está seguró que desea eliminar la mesa
                        <strong># {numero_mesa}</strong>
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
