import React, { useRef, useState } from "react";
import myStyles from "../../../../assets/css/myStyles.module.css";
import { FormGroup, InputGroup, Col, Row, Button } from "reactstrap";

export const Filters = ({ mesas, setMesaList }) => {
    const [selectedFilter, setSelectedFilter] = useState("Todos"); 
    const filterByUbicacion = (e, zona) => {
        e.preventDefault();
        setSelectedFilter(zona);
        const filteredMesas = mesas.filter((mesa) => mesa.ubicacion_mesa === zona);
        setMesaList(filteredMesas);
    };

    const showAllMesas = (e) => {
        e.preventDefault();
        setSelectedFilter("Todos"); 
        setMesaList(mesas);
    };

    const getButtonClass = (zona) => {
        // Asignar estilo adicional si es el filtro activo
        return selectedFilter === zona
            ? `${myStyles.button} ${myStyles.selected}` 
            : myStyles.button;
    };

    return (
        <div className={myStyles.inputFilters}>
            <Row>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={showAllMesas}
                                className={getButtonClass("Todos")} 
                            >
                                Todos
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Playa")}
                                className={getButtonClass("Playa")} // Aplicar clase condicional
                            >
                                Playa
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Terraza")}
                                className={getButtonClass("Terraza")} // Aplicar clase condicional
                            >
                                Terraza
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Comedor")}
                                className={getButtonClass("Comedor")} // Aplicar clase condicional
                            >
                                Comedor
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Bar")}
                                className={getButtonClass("Bar")} // Aplicar clase condicional
                            >
                                Bar
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col className={myStyles.inputContainer}>
                    <FormGroup>
                        <InputGroup className={`input-group-alternative mb-4`}>
                            <Button
                                color="info"
                                outline
                                type="button"
                                size="lg"
                                aria-pressed={true}
                                onClick={(e) => filterByUbicacion(e, "Portronas")}
                                className={getButtonClass("Portronas")} // Aplicar clase condicional
                            >
                                Portronas
                            </Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};



//filtrado por buscar
// import { useRef } from "react";
// import myStyles from "../../../../assets/css/myStyles.module.css";

// import {
//     FormGroup,
//     Form,
//     Input,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroup,
//     Col,
//     Row,
// } from "reactstrap";

// export const Filters = ({ mesas, setMesaList }) => {
//     const inputUbicacion = useRef();
//     const inputMesa = useRef();
//     const inputEstado = useRef();

//     // Función para buscar por nombre, email o teléfono
//     function searchMesa(e, type) {
//         e.preventDefault();
//         let query = "";
//         if (type === "ubicacion") {
//             query = inputUbicacion.current.value;
//         } else if (type === "mesa") {
//             query = inputMesa.current.value;
//         } else {
//             query = inputEstado.current.value;
//         }
//         console.log(query);

//         const regex = new RegExp(query, "i"); // 'i' para hacer la búsqueda insensible a mayúsculas/minúsculas

//         // Filtrar por nombre, mesa o teléfono
//         const filteredMesas = mesas.filter((mesa) => {
//             return (
//                 regex.test(mesa.ubicacion_mesa) ||
//                 regex.test(mesa.numero_mesa) ||
//                 regex.test(mesa.estado_mesa)
//             );
//         });


//         setMesaList(filteredMesas);
//     }

//     return (
//         <div className={myStyles.inputFilters}>
//             <Form
//                 onSubmit={(e) => {
//                     searchMesa(e, "ubicacion");
//                 }}
//             >
//                 <Row>
//                     <Col className={myStyles.inputContainer}>
//                         <FormGroup>
//                             <InputGroup
//                                 className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
//                             >
//                                 <input
//                                     className={`form-control-alternative ${myStyles.input}`}
//                                     placeholder="Buscar por ubicación"
//                                     type="text"
//                                     ref={inputUbicacion}
//                                 />
//                                 <InputGroupAddon addonType="prepend">
//                                     <button>
//                                         <i class="fa-solid fa-magnifying-glass"></i>
//                                     </button>
//                                 </InputGroupAddon>
//                             </InputGroup>
//                         </FormGroup>
//                     </Col>
//                 </Row>
//             </Form>
//             <Form
//                 onSubmit={(e) => {
//                     searchMesa(e, "email");
//                 }}
//             >
//                 <Row>
//                     <Col className={myStyles.inputContainer}>
//                         <FormGroup>
//                             <InputGroup
//                                 className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
//                             >
//                                 <input
//                                     className={`form-control-alternative ${myStyles.input}`}
//                                     placeholder="Buscar por mesa"
//                                     type="text"
//                                     ref={inputMesa}
//                                 />
//                                 <InputGroupAddon addonType="prepend">
//                                     <button>
//                                         <i class="fa-solid fa-magnifying-glass"></i>
//                                     </button>
//                                 </InputGroupAddon>
//                             </InputGroup>
//                         </FormGroup>
//                     </Col>
//                 </Row>
//             </Form>
//             <Form
//                 onSubmit={(e) => {
//                     searchMesa(e, "estado");
//                 }}
//             >
//                 <Row>
//                     <Col className={myStyles.inputContainer}>
//                         <FormGroup>
//                             <InputGroup
//                                 className={`input-group-alternative mb-4 ${myStyles.inputSearch}`}
//                             >
//                                 <input
//                                     className={`form-control-alternative ${myStyles.input}`}
//                                     placeholder="Buscar por estado"
//                                     type="text"
//                                     ref={inputEstado}
//                                 />
//                                 <InputGroupAddon addonType="prepend">
//                                     <button>
//                                         <i class="fa-solid fa-magnifying-glass"></i>
//                                     </button>
//                                 </InputGroupAddon>
//                             </InputGroup>
//                         </FormGroup>
//                     </Col>
//                 </Row>
//             </Form>
//         </div>
//     );
// };

