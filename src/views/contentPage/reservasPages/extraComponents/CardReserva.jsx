import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

export const CardReserva = ({ reserva }) => {
    const {
        id,
        fecha_reserva,
        hora_reserva,
        cant_adultos,
        cant_ninos,
        anticipo_required,
        motivo_reserva,
        clienteId,
        userId,
    } = reserva;

    const handleDetail = () => {
        window.location.href = `/admin/reservas/detail/${id}`;
    };

    return (
        <>
            <Card
                className={`my-2 ${myStyles.card}`}
                color="primary"
                outline
                style={{
                    width: "18rem",
                }}
            >
                <CardHeader className={myStyles.cardTitle}>
                    <h4>{/* {name} {lastname} */}</h4>
                </CardHeader>
                <CardBody>
                    <CardText>
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
                                    {reserva?.anticipo}
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
