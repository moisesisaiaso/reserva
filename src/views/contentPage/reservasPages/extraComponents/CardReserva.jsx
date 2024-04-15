import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CardReserva = ({ reserva }) => {
    const { id, fecha_reserva, hora_reserva, cant_adultos, cant_ninos, motivo_reserva, client } =
        reserva;

    const navigate = useNavigate();
    const handleDetail = () => {
       navigate("/admin/reservas/detail",{state: id});
    };

    return (
        <>
            <Card
                className={`my-2 ${myStyles.card}`}
                color="primary"
                outline
                style={{
                    width: "18rem",
                    height: "24rem",
                }}
            >
                <CardHeader className={myStyles.cardTitle}>
                    <h4>
                        {client.name} {client.lastname}
                    </h4>
                </CardHeader>
                <CardBody>
                    <CardText style={{ height: "13rem" }}>
                        <ul className={myStyles.cardList}>
                            <li>
                                <i className="ni ni-email-83" /> {fecha_reserva}
                            </li>
                            <li>
                                <i className="ni ni-email-83" /> {hora_reserva}
                            </li>
                            <li>
                                <i class="fa-solid fa-phone"></i> {cant_adultos}
                            </li>
                            <li>
                                <i class="fa-solid fa-circle-exclamation"></i>
                                {cant_ninos}
                            </li>
                            {reserva.anticipo && (
                                <li>
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    {reserva?.anticipo.estado_anticipo}
                                </li>
                            )}
                            <li>
                                <i class="fa-solid fa-circle-exclamation"></i>
                                {motivo_reserva}
                            </li>
                        </ul>
                    </CardText>
                    <Button color="warning" className={myStyles.cardButton} onClick={handleDetail}>
                        <i className="ni ni-single-02" /> Ir al detalle
                    </Button>
                </CardBody>
            </Card>
        </>
    );
};
