import React from "react";
import { Button, Card, CardBody, CardHeader, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import myStyles from "../../../../assets/css/myStyles.module.css";

export const CardEmployee = ({ employee }) => {
    const navigate = useNavigate();

    // Verificar si employee está definido antes de desestructurarlo
    if (!employee) {
        return null; // O cualquier otro comportamiento deseado
    }

    // Desestructurar employee si está definido
    const { id, name, lastname, email, cellphone, roles } = employee;

    const handleDetail = () => {
        navigate(`/admin/employees/detail/${id}`);
    };

    return (
        <Card className={`my-2 ${myStyles.card}`} color="primary" outline style={{ width: "18rem" }}>
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
                            <i className="fa-solid fa-phone"></i> {cellphone}
                        </li>
                        <li>
                            <strong>Roles:</strong>
                            <ul>
                                {roles.map((role, index) => (
                                    <li key={index}>{role.name}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </CardText>
                <Button color="warning" className={myStyles.cardButton} onClick={handleDetail}>
                    <i className="ni ni-single-02" /> Ir al detalle
                </Button>
            </CardBody>
        </Card>
    );
};
