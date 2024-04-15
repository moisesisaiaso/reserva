import { useParams } from "react-router-dom";
import myStyles from "../../../assets/css/myStyles.module.css";
import { FormCreate } from "./extraComponents/FormCreate";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
export const CreateMesa = () => {
    const { id } = useParams();

    console.log(id);
    let textClient = "Crear";

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>{textClient} Mesa</h1>
                            </CardHeader>
                            <CardBody>
                                <FormCreate id={id} />
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
