import myStyles from "../../../assets/css/myStyles.module.css";
import { useEffect, useState } from "react";


import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import { useCrud } from "hooks/useCrud";


import {OptionBtn} from "./extraComponents/OptionBtn";
import CardMesa from "./extraComponents/CardMesa";

const Mesa = () => {
    const [ubicacion, setUbicacion] = useState("Comedor");
    const [mesas, getMesas] = useCrud();
    const [mesasFiltradas, setMesasFiltradas] = useState([]);

    useEffect(() => {
        getMesas("/intimar/mesa");
    }, []);

    useEffect(() => {
        if (mesas) {
            const filteredMesas = mesas.filter(mesa => mesa.ubicacion_mesa === ubicacion);
            setMesasFiltradas(filteredMesas);
        }
    }, [mesas, ubicacion]);

    return (
      <Container className={myStyles.content} fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                    <CardHeader className={myStyles.clientsHeader}>
                            <h1>Administración de Mesas</h1>
                        </CardHeader>

                        <CardBody>
                          {/* crear - tabla, tarjetas */}
                          <section className={myStyles.clientsSection}>
                          <OptionBtn setUbicacion={setUbicacion} />
                                </section>
                                <h2 className={myStyles.clientsH2}>
                                    Lista de Clientes ({mesas?.length} Mesas)
                                </h2>
                          {/* tarjetas */}
                            <div className="row">
                                {mesasFiltradas.map(mesa => (
                                    <div key={mesa.id} className="col-md-3">
                                        <CardMesa mesa={mesa} />
                                    </div>
                                ))}

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default Mesa;
