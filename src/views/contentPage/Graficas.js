import myStyles from "../../assets/css/myStyles.module.css";
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
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const reservasPorMes = meses.map((_, index) =>
      reservas.filter(
        (reserva) =>
          new Date(reserva.fecha_reserva).getMonth() === index
      ).length
    );
    return {
      labels: meses,
      datasets: [
        {
          label: "Reservas por Mes",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // White bars
          borderColor: "rgba(255, 255, 255, 1)", // White border
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 255, 255, 1)", // White hover
          hoverBorderColor: "rgba(255, 255, 255, 1)", // White hover border
          data: reservasPorMes,
        },
      ],
    };
  };

  const procesarClientesPorMes = () => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const adultosPorMes = new Array(12).fill(0);
    const ninosPorMes = new Array(12).fill(0);

    reservas.forEach((reserva) => {
      const mes = new Date(reserva.fecha_reserva).getMonth();
      const adultos = Number(reserva.cant_adultos) || 0;
      const ninos = Number(reserva.cant_ninos) || 0;
      adultosPorMes[mes] += adultos;
      ninosPorMes[mes] += ninos;
    });

    console.log('Adultos por mes:', adultosPorMes); // Log the processed data
    console.log('Niños por mes:', ninosPorMes); // Log the processed data

    return {
      labels: meses,
      datasets: [
        {
          label: "Adultos",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: adultosPorMes,
        },
        {
          label: "Niños",
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 159, 64, 0.8)",
          hoverBorderColor: "rgba(255, 159, 64, 1)",
          data: ninosPorMes,
        },
      ],
    };
  };

  const procesarHorariosFrecuentes = () => {
    const horas = Array.from({ length: 6 }, (_, i) => `${i + 11}:00`);
    const frecuenciaHoras = new Array(6).fill(0);

    reservas.forEach((reserva) => {
      if (reserva.hora_llegada) {
        const hora = new Date(`1970-01-01T${reserva.hora_llegada}Z`).getUTCHours();
        if (hora >= 11 && hora <= 16) {
          frecuenciaHoras[hora - 11]++;
        }
      }
    });

    const totalReservasConHoraLlegada = frecuenciaHoras.reduce((a, b) => a + b, 0);

    return {
      labels: horas,
      datasets: [
        {
          label: "Frecuencia de Horarios de Llegada",
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(153, 102, 255, 0.8)",
          hoverBorderColor: "rgba(153, 102, 255, 1)",
          data: frecuenciaHoras,
        },
      ],
    };
  };

  const procesarZonasOcupadasPorMes = () => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const ubicaciones = ["Playa", "Terraza", "Comedor", "Bar", "Patio"];
    const reservasPorUbicacionYMes = meses.map(() => new Array(5).fill(0));

    reservas.forEach((reserva) => {
      const mes = new Date(reserva.fecha_reserva).getMonth();
      reserva.mesas.forEach((mesa) => {
        const ubicacionIndex = ubicaciones.indexOf(mesa.ubicacion_mesa);
        if (ubicacionIndex !== -1) {
          reservasPorUbicacionYMes[mes][ubicacionIndex]++;
        }
      });
    });

    return {
      labels: meses,
      datasets: ubicaciones.map((ubicacion, index) => ({
        label: ubicacion,
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"][index],
        data: reservasPorUbicacionYMes.map(mes => mes[index]),
      }))
    };
  };



  return (
    <Container className={myStyles.content} fluid>
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
                  data={procesarClientesPorMes()}
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
      </Row>

      <Row className="mt-5">
       <Col xl="8">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Resumen</h6>
              <h2 className="mb-0">Zonas Ocupadas por Mes</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                {
                  reservas.length > 0 ? (
                    <Bar
                      data={procesarZonasOcupadasPorMes()}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                            stepSize: 1,
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>Aún no hay suficientes datos para procesar.</p>
                  )
                }
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Resumen</h6>
              <h2 className="mb-0">Horarios de llegada más frecuentes</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                {
                  reservas.length > 0 && reservas.some(reserva => reserva.hora_llegada) ? (
                    <Bar
                      data={procesarHorariosFrecuentes()}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                            stepSize: 1,
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>Aún no hay suficientes datos para procesar.</p>
                  )
                }
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Graficas;
