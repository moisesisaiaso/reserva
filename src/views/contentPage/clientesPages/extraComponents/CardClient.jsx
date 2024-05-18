import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

export const CardClient = ({ client }) => {
    const { id, name, lastname, email, cellphone, allergies } = client;

    const handleDetail = () => {
        window.location.href = `/admin/clients/detail/${id}`;
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
                        {name} {lastname}
                    </h4>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <ul className={myStyles.cardList}>
                            <li>
                                <i className="ni ni-email-83" /> {email}
                            </li>
                            <li>
                                <i class="fa-solid fa-phone"></i> {cellphone}
                            </li>
                            <li>
                                <i className="fa-solid fa-circle-exclamation"></i> Alergias: {allergies ? allergies : "Ninguna"}
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
