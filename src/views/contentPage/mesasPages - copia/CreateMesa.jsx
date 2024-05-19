import { useParams } from "react-router-dom";
import myStyles from "../../../assets/css/myStyles.module.css";
import { useLocation } from "react-router-dom";
import { FormCreateEdit } from "./extraComponents/FormCreateEdit";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
export const CreateMesa = () => {
    const location = useLocation();
    const id = location.state;

    let textMesa = "Crear";

    if (id) {
        textMesa = "Editar";
    }

    return (
        <>
            {/* Page content */}
            <Container className={myStyles.content} fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader>
                                <h1>{textMesa} Mesa</h1>
                            </CardHeader>
                            <CardBody>{<FormCreateEdit id={id} />}</CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
