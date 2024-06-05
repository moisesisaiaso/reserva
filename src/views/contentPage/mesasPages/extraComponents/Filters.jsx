import React, { useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, InputGroup, Col, Row, Button } from "reactstrap";

export const Filters = ({ mesas, setListaFiltrada, setIsFilter }) => {
    const inputEstado = useRef();

    const handleSearch = () => {
        const value = inputEstado.current?.value;
        const query = value === "Disponible" ? true : value === "No disponible" ? false : "";

        const filteredMesas = mesas?.filter((mesa) => mesa.estado_mesa === query);

        setListaFiltrada(filteredMesas);
        setIsFilter(true);
    };

    const [selectedFilter, setSelectedFilter] = useState("Todos");
    const filterByUbicacion = (e, zona) => {
        e.preventDefault();
        setSelectedFilter(zona);
        const filteredMesas = mesas.filter((mesa) => mesa.ubicacion_mesa === zona);
        setListaFiltrada(filteredMesas);
        setIsFilter(true);
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
        </div>
    );
};
