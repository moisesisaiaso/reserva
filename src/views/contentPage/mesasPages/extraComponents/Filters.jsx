import React, { useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, Button, Modal, ModalBody } from "reactstrap";
import imagen from "../../../../assets/img/theme/zonas.png";

export const Filters = ({ mesas, setListaFiltrada, setIsFilter, showCroquis }) => {
    const inputEstado = useRef();
    const [selectedFilter, setSelectedFilter] = useState("Todos");
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearch = () => {
        const value = inputEstado.current?.value;
        const query = value === "Disponible" ? true : value === "No disponible" ? false : "";

        const filteredMesas = mesas?.filter((mesa) => mesa.estado_mesa === query);

        setListaFiltrada(filteredMesas);
        setIsFilter(true);
    };

    const filterByUbicacion = (e, zona) => {
        e.preventDefault();
        setSelectedFilter(zona);

        // Verificar si mesas está definido antes de filtrar
        if (mesas) {
            const filteredMesas = mesas.filter((mesa) => mesa.ubicacion_mesa === zona);
            setListaFiltrada(filteredMesas);
            setIsFilter(true);
        }
    };

    const showAllMesas = (e) => {
        e.preventDefault();
        setSelectedFilter("Todos");
        setListaFiltrada(mesas);
        setIsFilter(false);
    };

    const getButtonClass = (zona) => {
        // Asignar estilo adicional si es el filtro activo
        return selectedFilter === zona
            ? `${myStyles.button} ${myStyles.selected}`
            : myStyles.button;
    };
    const toggleModal = () => setModalOpen(!modalOpen);
    const zonas = [
        "Playa",
        "Terraza",
        "Comedor",
        "Bar",
        "Poltrona",
        "Embarcación",
        "Cafetin",
        "Extra",
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                marginBottom: "2rem",
            }}
        >
            <FormGroup
                className={myStyles.inputSearch + " " + myStyles.Inputgroup}
                style={{ height: "3.2rem", marginRight: "1rem", marginTop: "0.5rem" }}
            >
                <select
                    className={`form-control-alternative ${myStyles.input}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "11.5rem",
                    }}
                    type="select"
                    ref={inputEstado}
                    onChange={handleSearch}
                >
                    <option value="Disponible">Disponible</option>
                    <option value="No disponible">No disponible</option>
                </select>
            </FormGroup>

            <Button
                style={{ height: "3.2rem", marginTop: "0.5rem" }}
                color="info"
                outline
                type="button"
                size="lg"
                aria-pressed={true}
                onClick={showAllMesas}
                className={getButtonClass("Todos")}
            >
                Todos
            </Button>

            {zonas.map((zona, i) => (
                <Button
                    style={{ height: "3.2rem", marginTop: "0.5rem" }}
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={(e) => filterByUbicacion(e, zona)}
                    className={getButtonClass(zona)}
                    key={i}
                >
                    {zona}
                </Button>
            ))}

        {showCroquis && (
                <div style={{
                    alignSelf: "flex-end",
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                }}>
                    <a href="#" onClick={toggleModal}>Ver croquis</a>
                </div>
            )}

            {showCroquis && (
                <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" className={myStyles.fullScreenOverlay}>
                    <ModalBody className={myStyles.modalBody}>
                        <img src={imagen} alt="imagen" className={myStyles.fullScreenImage} />
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
};
