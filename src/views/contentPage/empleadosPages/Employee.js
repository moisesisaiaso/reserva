import React, { useEffect, useState } from "react";
import myStyles from "../../../assets/css/myStyles.module.css";

// Componentes de Reactstrap
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";

// Importar el hook personalizado para el CRUD
import { useCrud } from "hooks/useCrud";

// Componentes extra
import { PaginationComponent } from "views/generalComponents/PaginationComponent";
import { CardEmployee } from "./extraComponents/CardEmployee";
import { Filters } from "./extraComponents/Filters";
import { OptionBtn } from "./extraComponents/OptionBtn";
import { TableComponent } from "./extraComponents/TableComponent";
import { getPaginatedData } from "views/generalComponents/getPaginatedData";

const Employee = () => {
    // Estados
    const [isTable, setIsTable] = useState(true); // Estado para alternar entre tabla y tarjetas
    const [employees, getEmployees, , deleteEmployee] = useCrud(); // CRUD para empleados
    const [employeeList, setEmployeeList] = useState([]); // Lista de empleados a mostrar
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [pages, setPages] = useState();
    const [listaFiltrada, setListaFiltrada] = useState();
    const [isFilter, setIsFilter] = useState(false);

    // Obtener empleados al montar el componente
    useEffect(() => {
        getEmployees("/intimar/employee");
    }, []);

    /* logica para la paginación */
    // Inicializa la página actual y la cantidad de elementos por página
    let itemsPerPage = 5;

    /* obtengo la cantidad de paginas según la lista */
    useEffect(() => {
        if (!isFilter) {
            setPages(
                Math.ceil(employees?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        } else {
            setPages(
                Math.ceil(listaFiltrada?.length / itemsPerPage)
            ); /* este dato es para utilizarlo en la paginación */
        }
    }, [listaFiltrada, employees, isFilter]);

    // función para obtener la lista cortada segun los items por pagina
    const getDataPaginate = (data) => {
        const cutArray = getPaginatedData(data, currentPage, itemsPerPage);
        setEmployeeList(cutArray);
    };

    // pagina actual vuelve a ser 1 si se ha hecho un filtrado
    useEffect(() => {
        if (isFilter) {
            setCurrentPage(1);
        }
    }, [listaFiltrada]);

    // llama a la función getDataPaginate y envía la lista correspondiente del filtrado o los datos enteros
    useEffect(() => {
        /* paginación y actualización de clientes cuando se realiza un filtrado */
        if (!isFilter) {
            getDataPaginate(employees);
        } else {
            getDataPaginate(listaFiltrada);
        }
    }, [listaFiltrada, employees, currentPage]);

    console.log("paginaActual: ", currentPage);

    return (
        <Container className={myStyles.content} fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className={myStyles.clientsHeader}>
                            <h1>Administración de Empleados</h1>
                        </CardHeader>
                        <CardBody>
                            {/* crear - tabla, tarjetas */}
                            <section className={myStyles.clientsSection}>
                                <OptionBtn setIsTable={setIsTable} />
                            </section>

                            {/* Título de la lista de empleados */}
                            <h2 className={myStyles.clientsH2}>
                                Lista de Empleados ({employees?.length} Empleados)
                            </h2>

                            {/* Filtros */}
                            <section className="mb-4">
                                <Filters
                                    employees={employees}
                                    setListaFiltrada={setListaFiltrada}
                                    setIsFilter={setIsFilter}
                                />
                            </section>

                            {/* tabla */}
                            <section className={myStyles.tableSpacing}>
                                {isTable ? (
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Correo Electrónico</th>
                                                <th>Teléfono</th>
                                                <th>Roles</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Mostrar una fila para cada empleado */}
                                            {Array.isArray(employeeList) &&
                                            employeeList.length > 0 ? (
                                                employeeList.map((employee, index) => (
                                                    <TableComponent
                                                        key={index}
                                                        employee={employee}
                                                        deleteEmployee={deleteEmployee}
                                                    />
                                                ))
                                            ) : (
                                                // Mostrar un mensaje si no hay empleados
                                                <tr>
                                                    <td colSpan="7">
                                                        No hay empleados para mostrar
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : // Mostrar las tarjetas de empleado si no se está utilizando la tabla
                                employeeList ? (
                                    employeeList.map((employee, index) => (
                                        <CardEmployee key={index} employee={employee} />
                                    ))
                                ) : (
                                    // Mostrar un mensaje si no hay empleados
                                    <p>No hay empleados para mostrar</p>
                                )}
                            </section>

                            {/* Paginación */}
                            <section>
                                <PaginationComponent
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pages={pages}
                                />
                            </section>
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default Employee;