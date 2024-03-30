import { useState } from "react";
import myStyles from "../../assets/css/myStyles.module.css";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col,
} from "reactstrap";

export const TableComponent = ({ client, deleteClient }) => {
    const { id, name, lastname, email, cellphone } = client;

    const [stateModal, setStateModal] = useState(false);

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = () => {
        deleteClient("/intimar/client", id);
        toggleModal();
    };

    return (
        <>
            <tr>
                <th scope="row">{id}</th>
                <td>
                    {name} {lastname}
                </td>
                <td>{email} </td>
                <td>{cellphone}</td>
                <td className={myStyles.actions}>
                    <a href="#" className={myStyles.btnReserva}>
                        Reservar
                    </a>

                    <div>
                        <a href="#" className={myStyles.btnEdit}>
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
