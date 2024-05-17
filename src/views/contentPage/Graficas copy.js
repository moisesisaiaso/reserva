import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';
import { Line, Bar } from 'react-chartjs-2';
import instance from "api/axiosInstance";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from 'variables/charts.js'; 


const defaultChart = {
  data: {
    labels: [],
    datasets: [],
  },
  options: {},
};

const Graficas = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await instance.get("/intimar/reserva", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setReservas(response.data.data);
      } catch (error) {
        console.error('Error fetching reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  // Process data for the chart
  const procesarDatosParaGrafico = () => {
    const meses = Array.from({ length: 12 }, (_, i) => i + 1);
    const reservasPorMes = meses.map((mes) =>
      reservas.filter(
        (reserva) =>
          new Date(reserva.fecha_reserva).getMonth() + 1 === mes
      ).length
    );
    return {
      labels: meses.map((mes) => `Mes ${mes}`),
      datasets: [
        {
          label: "Reservas por Mes",
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75,192,192,0.4)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: reservasPorMes,
        },
      ],
    };
  };

  return (
    <Container fluid>
      <Row>
        <Col xl="8">
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-light ls-1 mb-1">Resumen</h6>
              <h2 className="text-white mb-0">Reserva por meses</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar
                  data={procesarDatosParaGrafico()}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        stepSize: 1,
                      },
                    },
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Resumen</h6>
              <h2 className="mb-0">Clientes por meses</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar
                  data={chartExample2?.data || defaultChart.data}
                  options={chartExample2?.options || defaultChart.options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xl="8">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Resumen</h6>
              <h2 className="mb-0">Mesas asignadas por mes</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Line
                  data={chartExample3?.data || defaultChart.data}
                  options={chartExample3?.options || defaultChart.options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Resumen</h6>
              <h2 className="mb-0">Ingresos por mes</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar
                  data={chartExample4?.data || defaultChart.data}
                  options={chartExample4?.options || defaultChart.options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Graficas;
