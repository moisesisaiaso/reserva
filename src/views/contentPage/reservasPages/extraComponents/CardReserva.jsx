import React from 'react';
import { Button, Card, CardBody, CardHeader, Badge } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import myStyles from '../../../../assets/css/myStyles.module.css';

export const CardReserva = ({ reserva = {} }) => {
  const {
    id = 'Desconocido',
    fecha_reserva = 'Sin fecha',
    hora_reserva = 'Sin hora',
    cant_adultos = 0,
    cant_ninos = 0,
    motivo_reserva = 'Sin motivo',
    client = { name: 'Desconocido', lastname: '' },
    estado_reserva = 'Sin estado',
    anticipo = null,
  } = reserva;

  const navigate = useNavigate();

  const handleDetail = () => {
    navigate('/admin/reservas/detail', { state: id });
  };

  const getEstadoReservaColor = () => {
    if (estado_reserva === "Pendiente a confirmar") {
        return "warning";
    } else if (estado_reserva === "Cancelada") {
        return "danger";
    } else if (estado_reserva === "Confirmada") {
        return "default";
    } else if (estado_reserva === "Lista de espera") {
        return "warning";
    } else if (estado_reserva === "En proceso") {
        return "primary";
    } else if (estado_reserva === "Finalizada") {
        return "dark";
    } else {
        return "default";
    }
};

  const getEstadoAnticipoColor = () => {
    if (anticipo?.estado_anticipo === 'Rechazado') {
      return 'danger';
    } else if (anticipo?.estado_anticipo === 'Pendiente') {
      return 'warning';
    } else {
      return 'default';
    }
  };

  return (
    <Card
      className={`my-2 ${myStyles.card}`}
      color="primary"
      outline
      style={{ width: '18rem', height: '24rem' }}
    >
      <CardHeader className={`${myStyles.cardTitle} ${myStyles.columnDirection}`}>
        <h3>
          <strong>ID Reserva: {id}</strong>
        </h3>
        <h3>
          {client?.name} {client?.lastname}
        </h3>
      </CardHeader>
      <CardBody className="text-center d-flex flex-column justify-content-between">
        <ul className={myStyles.cardList}>
          <li>
            <i className="ni ni-calendar-grid-58" /> {fecha_reserva}
          </li>
          <li>
            <i className="ni ni-watch-time" /> {hora_reserva}
          </li>
          <li>
            <i className="fa-solid fa-user" /> Adultos: {cant_adultos}, Niños: {cant_ninos}
          </li>
          {/* <li style={{ display: 'flex', justifyContent: 'center' }}> */}
          <li>
              <i className="fa-solid fa-circle-exclamation" />
              Reserva:
            <Badge color={getEstadoReservaColor()} pill>
              {estado_reserva}
            </Badge>
            </li>
          
          {/* </li> */}
          {anticipo && (
            <li>
              <i className="fa-solid fa-money-check" />
              Anticipo:
              <Badge color={getEstadoAnticipoColor()} pill>
                {anticipo?.estado_anticipo ?? 'No informado'}
              </Badge>
            </li>
          )}
          {/* {motivo_reserva && ( 
            <li>
              <i className="fa-solid fa-circle-exclamation" /> {motivo_reserva}
            </li>
          )} */}
        </ul>
        <Button
          color="warning"
          className={myStyles.cardButton}
          onClick={handleDetail}
        >
          <i className="ni ni-single-02" /> Ir al detalle
        </Button>
      </CardBody>
    </Card>
  );
};
