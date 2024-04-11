import { useParams } from "react-router-dom";
import myStyles from "../../../assets/css/myStyles.module.css";
import { useLocation } from "react-router-dom";
import { FormCreateEdit } from "./extraComponents/FormCreateEdit";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
export const CreateReserva = () => {
    const { id } = useParams();
    const location = useLocation();
    const clientId = location.state;

    const [parameterId, setParameterId] = useState();
    const [reservarWithClientId, setReservarWithClientId] = useState();

    useEffect(() => {
        setReservarWithClientId(clientId);
        setParameterId(id);
    }, []);

    console.log(id);

    let textClient = "Crear";

    if (id) {
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
                            <CardBody>
                                {
                                    <FormCreateEdit
                                        parameterId={parameterId}
                                        reservarWithClientId={reservarWithClientId}
                                    />
                                }
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
