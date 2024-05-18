import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Label, Input, Container, Row, Card, CardHeader, CardBody } from "reactstrap";
import axiosInstance from "api/axiosInstance";
import myStyles from "assets/css/myStyles.module.css";

const Configuracion = () => {
    const [configuracion, setConfiguracion] = useState({});
    const [editConfig, setEditConfig] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [configId, setConfigId] = useState(null);

    useEffect(() => {
        const fetchConfiguracion = async () => {
            try {
                const response = await axiosInstance.get("/intimar/configuracion");
                const config = response.data.data;
                setConfiguracion(config);
                setConfigId(config.id);
            } catch (error) {
                console.error("Error fetching configuration data:", error);
            }
        };

        fetchConfiguracion();
    }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleEditClick = () => {
        setEditConfig(configuracion); 
        toggleModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditConfig({ ...editConfig, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axiosInstance.put(`/intimar/configuracion/${configId}`, editConfig);
            setConfiguracion(editConfig);
            toggleModal();
        } catch (error) {
            console.error("Error updating configuration:", error);
        }
    };

    return (
        <Container className={myStyles.content} fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader>
                            <h1>Configuración</h1>
                        </CardHeader>
                        <CardBody>
                            <div className="table-responsive">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Aforo por hora</th>
                                            <th>Duración de Reserva (horas)</th>
                                            <th>Hora Mínima</th>
                                            <th>Hora Máxima</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{configuracion.aforo !== undefined && configuracion.aforo !== null ? configuracion.aforo : 'N/A'}</td>
                                            <td>{configuracion.duracion_reserva !== undefined && configuracion.duracion_reserva !== null ? configuracion.duracion_reserva : 'N/A'}</td>
                                            <td>{configuracion.hora_min !== undefined && configuracion.hora_min !== null ? configuracion.hora_min : 'N/A'}</td>
                                            <td>{configuracion.hora_max !== undefined && configuracion.hora_max !== null ? configuracion.hora_max : 'N/A'}</td>
                                            <td>
                                                <Button color="primary" onClick={handleEditClick}>Editar</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <Modal isOpen={modalOpen} toggle={toggleModal}>
                                <ModalHeader toggle={toggleModal}>Editar Configuración</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="aforo">Aforo por hora</Label>
                                        <Input
                                            type="number"
                                            name="aforo"
                                            id="aforo"
                                            value={editConfig.aforo || ''}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="duracion_reserva">Duración de Reserva (horas)</Label>
                                        <Input
                                            type="number"
                                            name="duracion_reserva"
                                            id="duracion_reserva"
                                            value={editConfig.duracion_reserva || ''}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="hora_min">Hora Mínima</Label>
                                        <Input
                                            type="time"
                                            name="hora_min"
                                            id="hora_min"
                                            value={editConfig.hora_min || ''}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="hora_max">Hora Máxima</Label>
                                        <Input
                                            type="time"
                                            name="hora_max"
                                            id="hora_max"
                                            value={editConfig.hora_max || ''}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
                                    <Button color="primary" onClick={handleSave}>Guardar</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default Configuracion;
