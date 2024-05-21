import { useEffect, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCrud } from "hooks/useCrud";

export const CardMesa = ({ mesa, updateMesa, updated, setUpdated }) => {
    const { id, ubicacion_mesa, numero_mesa, estado_mesa } = mesa;
    const [estado, setEstado] = useState(estado_mesa ? "Disponible" : "No disponible");
    const navigate = useNavigate();

    useEffect(() => {
        if (estado_mesa) {
            setEstado("Disponible");
        } else {
            setEstado("No disponible");
        }
    }, [updated]);

    const handleMesaAsignar = () => {
        /* aquí enviamos a asignar mesa */
        navigate("/admin/asignar-mesa/create", { state: { id, type: "mesa" } });
    };

    const handleMesaLiberar = async () => {
        const data = { estado_mesa: true };
        /* aquí enviamos a liberar mesa */
        await updateMesa("intimar/mesa", id, data);
        setUpdated(!updated);
    };

    return (
        <>
            <div
                className={`my-2 ${myStyles.mesa} ${
                    estado === "No disponible" && myStyles.mesa__noDisponible
                }`}
                color="primary"
                outline
            >
                <CardHeader className={myStyles.cardTitle + " " + myStyles.mesaTitle}>
                    <h4> #{numero_mesa}</h4>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <ul className={myStyles.cardList}>
                            <li>
                                <i className="ni ni-pin-3" /> {ubicacion_mesa}
                            </li>
                            <li>
                                <i class="ni ni-bulb-61"></i> {estado}
                            </li>
                        </ul>
                    </CardText>
                    {estado === "Disponible" ? (
                        <Button
                            color="warning"
                            className={myStyles.cardButtonMesa}
                            onClick={handleMesaAsignar}
                        >
                            <i className="ni ni-send" /> Asignar mesa
                        </Button>
                    ) : (
                        <Button
                            color="warning"
                            className={myStyles.cardButtonMesa}
                            onClick={handleMesaLiberar}
                        >
                            <i className="ni ni-lock-circle-open" /> Liberar Mesa
                        </Button>
                    )}
                </CardBody>
            </div>
        </>
    );
};
