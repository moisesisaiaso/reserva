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
    const [employees, getEmployees, , , deleteEmployee] = useCrud(); // CRUD para empleados
    const [employeeList, setEmployeeList] = useState([]); // Lista de empleados a mostrar
    const [currentPage, setCurrentPage] = useState(1); // Página actual

    // Obtener empleados al montar el componente
    useEffect(() => {
        getEmployees("/intimar/employee");
    }, []);

    // Actualizar la lista de empleados cuando cambia la lista completa
    useEffect(() => {
        const itemsPerPage = 5;
        setCurrentPage(1); // Reiniciar la página actual al cambiar los empleados
        setEmployeeList(getPaginatedData(employees, 1, itemsPerPage)); // Paginar la lista de empleados
    }, [employees]);

    // Manejar el cambio de página
    const handlePageChange = (pageNumber) => {
        const itemsPerPage = 5;
        setCurrentPage(pageNumber);
        setEmployeeList(getPaginatedData(employees, pageNumber, itemsPerPage));
    };

    return (
        <Container className={myStyles.content} fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className={myStyles.employeeHeader}>
                            <h1>Administración de Empleados</h1>
                        </CardHeader>
                        <CardBody>
                            {/* crear - tabla, tarjetas */}
                            <section className={`${myStyles.employeeSection} mb-4`}>
                                <OptionBtn setIsTable={setIsTable} />
                            </section>

                            {/* Título de la lista de empleados */}
                            <h2 className={myStyles.employeesH2}>
                                Lista de Empleados ({employees?.length} Empleados)
                            </h2>

                            {/* Filtros */}
                            <section className="mb-4">
                                <Filters employees={employees} setEmployeeList={setEmployeeList} />
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
                                            {Array.isArray(employeeList) && employeeList.length > 0 ? (
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
                                                    <td colSpan="7">No hay empleados para mostrar</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                    // Mostrar las tarjetas de empleado si no se está utilizando la tabla
                                    employeeList ? (
                                        employeeList.map((employee, index) => (
                                            <CardEmployee key={index} employee={employee} />
                                        ))
                                    ) : (
                                        // Mostrar un mensaje si no hay empleados
                                        <p>No hay empleados para mostrar</p>
                                    )
                                )}
                            </section>

                            {/* Componente de paginación */}
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={Math.ceil(employees?.length / 5)}
                                onPageChange={handlePageChange}
                            />
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default Employee;
