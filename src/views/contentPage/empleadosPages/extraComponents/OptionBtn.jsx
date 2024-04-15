import myStyles from "../../../../assets/css/myStyles.module.css";

import { Button } from "reactstrap";
import { useState } from "react";

export const OptionBtn = ({ setIsTable }) => {
    const [activeTabla, setActiveTabla] = useState("active");
    const [activeTarjeta, setActiveTarjeta] = useState("");

    const handleActive = (option) => {
        if (option === "tabla") {
            setActiveTabla("active");
            setActiveTarjeta("");
            setIsTable(true);
        } else {
            setActiveTarjeta("active");
            setActiveTabla("");
            setIsTable(false);
        }
    };

    const handleBtnCreate = () => {
        window.location.href = "/admin/employees/create";
    };

    return (
        // esta linea es para que el filtro aparezca a un lado del boton de agregar empleado
        <>
            <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
                <i className="ni ni-fat-add fa-2x" />
                <span>Agregar Empleado</span>
            </Button>
            <div>
                <Button
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={() => {
                        handleActive("tabla");
                    }}
                    className={activeTabla}
                >
                    Tabla
                </Button>
                <Button
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={() => {
                        handleActive("tarjeta");
                    }}
                    className={activeTarjeta}
                >
                    Tarjetas
                </Button>
            </div>
            </>
    );
};
