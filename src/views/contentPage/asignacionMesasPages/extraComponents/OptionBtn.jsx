import myStyles from "../../../../assets/css/myStyles.module.css";

import { Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OptionBtn = ({ setIsTable }) => {
    const navigate = useNavigate();
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
        navigate("/admin/mesas/crearAsignacion");
    };

    return (
        <>
            <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
                <i className="ni ni-fat-add fa-2x" />
                <span>Asignar Mesa</span>
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
                    Asignadas
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
                    Mesas
                </Button>
            </div>
        </>
    );
};
