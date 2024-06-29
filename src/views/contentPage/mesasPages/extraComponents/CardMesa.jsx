import { useEffect, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCrud } from "hooks/useCrud";

export const CardMesa = ({
    mesa,
    reservasAsignadas,
    updated,
    setUpdated,
    setIsFilter,
    finalizarReserva,
    liberada,
}) => {
    const { id, ubicacion_mesa, numero_mesa, estado_mesa } = mesa;
    const [estado, setEstado] = useState();
    const [reserva, setReserva] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (estado_mesa) {
            setEstado("Disponible");
        } else {
            setEstado("No disponible");
        }
    }, []);

    const handleMesaAsignar = () => {
        /* aquí enviamos a asignar mesa */
        navigate("/admin/mesas/crearAsignacion", { state: { id, type: "mesa" } });
    };

    useEffect(() => {
        if (estado !== "Disponible") {
            const reserva = reservasAsignadas?.find((reserva) =>
                reserva.mesas.some((mesa) => mesa.id === id)
            );
            setReserva(reserva);
            console.log("reserva: ", reserva);
        }
    }, [updated, reservasAsignadas]);

    const handleLiberar = async () => {
        await finalizarReserva(`intimar/reserva/${reserva?.id}/end`);
        liberada();
        setEstado("Disponible");
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
                    <h4>Mesa #{numero_mesa}</h4>
                    <p style={{ display: "flex", alignItems: "center", columnGap: "0.5rem" }}>
                        <i className="ni ni-pin-3" /> {ubicacion_mesa}
                    </p>
                </CardHeader>

                <CardBody>
                    {estado !== "Disponible" ? (
                        <CardText style={{ 
                            marginBottom: "2rem",
                            listStyle: "none",
                            padding: "0",
                        }}>
                            <ul className={myStyles.cardList} style={{ margin: "0", padding: "0", lineHeight: "1.1" }}>
                                {reserva ? (
                                    <>
                                        <li style={{ marginBottom: "0rem" }}>
                                            <i className="ni ni-single-02" /> {reserva?.client.name}{" "}
                                            {reserva?.client.lastname}
                                        </li>
                                        <li style={{ marginBottom: "0rem" }}>
                                            <i className="ni ni-watch-time"></i> {reserva?.hora_llegada}
                                        </li>
                                        <li style={{ marginBottom: "0rem" }}>
                                            <i className="ni ni-badge" /> {reserva?.mozo.name}
                                        </li>
                                    </>
                                ) : (
                                    <p style={{ marginBottom: "0rem" }}>Cargando...</p>
                                )}
                                {/* <li style={{ marginBottom: "0rem" }}>
                                    <i className="ni ni-fat-delete"></i> {estado}
                                </li> */}
                            </ul>
                        </CardText>

                    ) : (
                        <CardText style={{ marginBottom: "0.5rem" }}>
                            <ul
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "4rem",
                                    alignItems: "center",
                                    padding: "0",
                                    listStyle: "none",
                                }}
                            >
                                <li>
                                    <i class="ni ni-fat-delete"></i> {estado}
                                </li>
                            </ul>
                        </CardText>
                    )}
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
                            onClick={handleLiberar}
                        >
                            <i className="ni ni-lock-circle-open" /> Liberar mesa
                        </Button>
                    )}
                </CardBody>
            </div>
        </>
    );
};
