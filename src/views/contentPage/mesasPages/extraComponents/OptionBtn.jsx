import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const OptionBtn = ({ setIsTable }) => {
    const [activeTarjeta, setActiveTarjeta] = useState("active");
    const [activeTabla, setActiveTabla] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        setIsTable(false);
    }, [setIsTable]);

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

    const handleBtnCreateAsignar = () => {
        navigate("/admin/mesas/crearAsignacion");
    };

    return (
        <>
            <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreateAsignar}>
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
                    onClick={() => handleActive("tarjeta")}
                    className={activeTarjeta}
                >
                    Mesas
                </Button>
                <Button
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={() => handleActive("tabla")}
                    className={activeTabla}
                >
                    Gestion de mesas
                </Button>
            </div>
        </>
    );
};


