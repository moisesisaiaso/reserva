import { useRef, useState } from "react";

import myStyles from "../../../../assets/css/myStyles.module.css";
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  Button,
} from "reactstrap";

export const Filters = ({ employees, setListaFiltrada, setIsFilter }) => {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputCellphone = useRef();
  const inputRole = useRef();

  // Función para buscar por nombre, email, teléfono o rol
  function searchEmployee() {
    const queryName = inputName.current.value;
    const queryEmail = inputEmail.current.value;
    const queryCellphone = inputCellphone.current.value;
    const queryRole = inputRole.current.value;

    const filteredEmployees = employees.filter((employee) => {
      const nameMatch = queryName === "" || new RegExp(queryName, "i").test(employee.name);
      const emailMatch =
        queryEmail === "" || new RegExp(queryEmail, "i").test(employee.email);
      const cellphoneMatch =
        queryCellphone === "" || new RegExp(queryCellphone, "i").test(employee.cellphone);
      const roleMatch =
        queryRole === "" ||
        employee.roles.some((role) => role.name.toLowerCase() === queryRole.toLowerCase());
      return nameMatch && emailMatch && cellphoneMatch && roleMatch;
    });

    setListaFiltrada(filteredEmployees);
    setIsFilter(true);
  }

  // Manejar el cambio de selección de rol
  const handleRoleChange = (e) => {
    searchEmployee();
  };

  // Obtener roles únicos de los empleados
  let roles = [];
  if (employees) {
    roles = Array.from(
      new Set(employees.flatMap((employee) => employee.roles.map((role) => role.name)))
    );
  }

  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
    cellphone: "",
    role: ""
  });

  // Manejar el cambio en los campos de búsqueda
  const handleInputChange = (e) => {
    setSearchParams({
     ...searchParams,
      [e.target.name]: e.target.value
    });
    searchEmployee(); // Llamar a searchEmployee aquí
  };

  const resetTable = () => {
    setListaFiltrada(employees);
    setIsFilter(false);
    setSearchParams({
      name: "",
      email: "",
      cellphone: "",
      role: ""
    });
    // Limpiar los campos de búsqueda directamente
    inputName.current.value = "";
    inputEmail.current.value = "";
    inputCellphone.current.value = "";
    inputRole.current.value = "";
  };
  return (
    <div className={myStyles.inputFilters}>
      <Form>
        <Row>
          <Col xs="12" sm="6" lg="3" className={myStyles.inputContainer}>
            <FormGroup>
              <InputGroup
                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
              >
                <input
                  className={`form-control-alternative ${myStyles.input} ${myStyles.inputFilters}`}
                  placeholder="Nombre"
                  type="text"
                  ref={inputName}
                  onChange={handleInputChange} 
                />
                <InputGroupAddon addonType="prepend">
                  <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" lg="3" className={myStyles.inputContainer}>
            <FormGroup>
              <InputGroup
                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
              >
                <input
                  className={`form-control-alternative ${myStyles.input} ${myStyles.inputFilters}`}
                  placeholder="Email"
                  type="text"
                  ref={inputEmail}
                  onChange={handleInputChange} 
                />
                <InputGroupAddon addonType="prepend" className={myStyles.buttonSearch}>
                  <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
                    <Col xs="12" sm="6" lg="3" className={myStyles.inputContainer}>
            <FormGroup>
              <InputGroup
                className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
              >
                <input
                  className={`form-control-alternative ${myStyles.input} ${myStyles.inputFilters}`}
                  placeholder="Teléfono"
                  type="text"
                  ref={inputCellphone}
                  onChange={handleInputChange}
                />
                <InputGroupAddon addonType="prepend">
                  <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" lg="3" className={myStyles.inputContainer}>
            <FormGroup>
              <InputGroup className={`mb-4 ${myStyles.inputSearch}`}>
                <select
                  className={`form-select form-select-sm ${myStyles.selectInput} ${myStyles.inputFilters}`}
                  aria-label=".form-select-sm example"
                  ref={inputRole}
                  onChange={handleRoleChange}
                >
                  <option value="">Buscar por rol</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <InputGroupAddon addonType="prepend">
                  <button style={{ marginRight: "20px" }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={12} className="d-flex justify-content-end">
            <Button color="secondary" onClick={resetTable} className="mb-2">
              Reiniciar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};