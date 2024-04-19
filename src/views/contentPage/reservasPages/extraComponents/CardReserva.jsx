import React from "react";
import { Button, Card, CardBody, CardHeader, Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const CardReserva = ({ reserva }) => {
    const { id, fecha_reserva, hora_reserva, cant_adultos, cant_ninos, motivo_reserva, client, estado_reserva, anticipo } = reserva;

    const navigate = useNavigate();

    const handleDetail = () => {
        navigate("/admin/reservas/detail", { state: id });
    };

    const getEstadoReservaColor = () => {
        if (estado_reserva === "Pendiente a confirmar") {
            return "warning";
        } else if (estado_reserva === "Cancelada") {
            return "danger";
        } else if (estado_reserva === "Confirmada") {
            return "success";
        } else {
            return "primary";
        }
    };

    const getEstadoAnticipoColor = () => {
        if (anticipo && anticipo.estado_anticipo === "CANCELADO") {
            return "danger";
        } else if (anticipo && anticipo.estado_anticipo === "NO PAGADO") {
            return "warning";
        } else if (anticipo && anticipo.estado_anticipo === "EN ESPERA") {
            return "primary";
        } else {
            return "success";
        }
    };

    return (
        <Card className={`my-2 ${myStyles.card}`} color="primary" outline style={{ width: "18rem", height: "24rem" }}>
            <CardHeader className={myStyles.cardTitle}>
                <h4>
                    {client.name} {client.lastname}
                </h4>
            </CardHeader>
            <CardBody className="text-center">
                <ul className={myStyles.cardList}>
                    <li>
                        <i className="ni ni-calendar-grid-58" /> {fecha_reserva}
                    </li>
                    <li>
                        <i className="ni ni-watch-time" /> {hora_reserva}
                    </li>
                    <li>
                        <i className="fa-solid fa-user" /> Adultos: {cant_adultos}, Niños: {cant_ninos}
                    </li>
                    <li style={{ display: "flex", justifyContent: "center" }}> 
                        <Badge color={getEstadoReservaColor()} pill>
                            {estado_reserva}
                        </Badge>
                    </li>
                    {anticipo && (
                        <li>
                            <i className="fa-solid fa-money-check" />
                            Anticipo:
                            <Badge color={getEstadoAnticipoColor()} pill>
                                {anticipo.estado_anticipo}
                            </Badge>
                        </li>
                    )}
                    <li>
                        <i className="fa-solid fa-circle-exclamation" /> {motivo_reserva}
                    </li>
                </ul>
                <Button color="warning" className={myStyles.cardButton} onClick={handleDetail}>
                    <i className="ni ni-single-02" /> Ir al detalle
                </Button>
            </CardBody>
        </Card>
    );
};
