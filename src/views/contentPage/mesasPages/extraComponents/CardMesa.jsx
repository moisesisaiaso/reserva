import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

const CardMesa = ({ mesa }) => {
    const handleEliminar = () => {
        console.log(`Eliminar mesa ${mesa.id}`);
    };

    return (
        <Card
        className={`my-2 ${myStyles.card}`}
        color="primary"
        outline
        style={{
            width: "18rem",
        }}
    >
        <CardHeader className={myStyles.cardTitle}>
                <h5 className="mb-0">Mesa {mesa.numero_mesa}</h5>
            </CardHeader>
            <CardBody>
               <CardText>
                        <ul className={myStyles.cardList}>
                            <li>
                                <i className="ni ni-pin-3" /> {mesa.ubicacion_mesa}
                            </li>

                        </ul>
                    </CardText>
                <Button color="warning" className={myStyles.cardButton} onClick={handleEliminar}>
                        <i className="ni ni-fat-remove" /> Eliminar
                    </Button>
            </CardBody>
        </Card>
    );
};

export default CardMesa;
