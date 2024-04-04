import { useParams } from "react-router-dom";
import myStyles from "../../../assets/css/myStyles.module.css";
import { useLocation } from "react-router-dom";
// import { FormCreateEdit } from "./extraComponents/FormCreateEdit";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
export const CreateReserva = () => {
    const { id } = useParams();
    const location = useLocation();
    const otherValue = location.state;

    console.log(id);
    let textClient = otherValue;

    if (id && otherValue === undefined) {
        textClient = "Editar";
    }

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>{textClient} Reserva</h1>
                            </CardHeader>
                            <CardBody>{/* <FormCreateEdit id={id} /> */}</CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
