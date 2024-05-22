import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
import { useNavigate } from "react-router-dom";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const TableComponent = ({ employee, deleteEmployee, lengthId, itemsPerPage, currentPage }) => {
    const navigate = useNavigate(); // Llama a useNavigate fuera de la estructura condicional

    // Define stateModal fuera de la estructura condicional
    const [stateModal, setStateModal] = useState(false);

    // Verificar si employee está definido antes de desestructurarlo
    if (!employee) {
        return null; // O cualquier otro comportamiento deseado
    }

    // Desestructurar employee si está definido
    const { id, name, lastname, email, cellphone, roles } = employee;

    const handleEmployee = () => {
        navigate("/admin/employees/create", { state: id });
    };

    const handleDetail = () => {
        window.location.href = `/admin/employees/detail/${id}`;
        
    };
    const handleEdit = () => {
        window.location.href = `/admin/employees/create/${id}`;
    };

    const toggleModal = () => {
        setStateModal(!stateModal);
    };

    const handleDelete = () => {
        deleteEmployee("/intimar/employee", id);
        toggleModal();
    };

    /* items clients */
    const pageActual = currentPage - 1;
    const groupPage = pageActual * itemsPerPage;

    return (
        <>
            <tr>
                {/* <th scope="row">{lengthId + 1 + groupPage}</th> */}
                <td>{id}</td>
                <td> {name}</td>
                <td> {lastname}</td>
                <td>{email} </td>
                <td>{cellphone}</td>
                <td>                 
                <ul>{employee.roles.map((role, index) => (
                <li key={index}>{role.name}</li>
                ))}
                </ul>
                </td>
                {/* <td> {roles}</td>  */}
                <td className={myStyles.actions}>
                    <div>
                        {/* <a onClick={handleDetail} className={myStyles.btnDetail}>
                            <i className="fa-regular fa-eye fa-2x"></i>
                        </a> */}
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
                        Está seguró que desea eliminar al Empleado con nombre{" "}
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
