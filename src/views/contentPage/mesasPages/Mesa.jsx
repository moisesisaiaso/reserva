import myStyles from "../../../assets/css/myStyles.module.css";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
export const Mesa = () => {
    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>Administración de Clientes</h1>
                            </CardHeader>
                            <CardBody>
                                <h2>Lista de clientes (clientes)</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                                    ut rerum autem ad, animi neque quasi et quisquam illum debitis
                                    odit voluptas ipsa assumenda cum. Porro ad eius commodi autem.
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
