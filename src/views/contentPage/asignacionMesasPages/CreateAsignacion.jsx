import myStyles from "../../../assets/css/myStyles.module.css";
import { useLocation } from "react-router-dom";
import { FormCreateEdit } from "./extraComponents/FormCreateEdit";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
export const CreateAsignacion = () => {
    const location = useLocation();
    const estado =
        location.state; /* state no se puede desestructurar directamente, ya que como es asincrono no existirían las propiedades */

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>Asignar Mesa</h1>
                            </CardHeader>
                            <CardBody>
                                <FormCreateEdit id={estado?.id} type={estado?.type} />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
