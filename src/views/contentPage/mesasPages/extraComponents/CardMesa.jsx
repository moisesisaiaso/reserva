import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

export const CardMesa = ({ mesa }) => {
    const { id, ubicacion_mesa, numero_mesa, estado_mesa} = mesa;

    const handleMesa = () => {
        /* aquí enviamos a asignar mesa */
        // window.location.href = `/admin/clients/detail/${id}`;
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
                    <h4>
                        Mesa #{numero_mesa}
                    </h4>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <ul className={myStyles.cardList}>
                            <li>
                                <i className="ni ni-email-83" /> {ubicacion_mesa}
                            </li>
                            <li>
                                <i class="fa-solid fa-phone"></i> {estado_mesa}
                            </li>
                            
                        </ul>
                    </CardText>
                    <Button color="warning" className={myStyles.cardButton} onClick={handleMesa}>
                        <i className="ni ni-single-02" /> Asignar mesa
                    </Button>
                </CardBody>
            </Card>
        </>
    );
};
