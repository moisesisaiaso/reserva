import { useParams } from "react-router-dom";
import myStyles from "../../../assets/css/myStyles.module.css";
import { FormCreateEdit } from "./extraComponents/FormCreateEdit";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
export const CreateClient = () => {
    const { id } = useParams();

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
                                <h1>{textClient} Cliente</h1>
                            </CardHeader>
                            <CardBody>
                                <FormCreateEdit id={id} />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
