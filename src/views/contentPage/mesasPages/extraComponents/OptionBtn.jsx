import myStyles from "../../../../assets/css/myStyles.module.css";

import { Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OptionBtn = ({ setIsTable }) => {
    const [activeTabla, setActiveTabla] = useState("active");
    const [activeTarjeta, setActiveTarjeta] = useState("");

    const navigate = useNavigate();

    const handleActive = (option) => {
        if (option === "tabla") {
            setActiveTabla("active");
            setActiveTarjeta("");
            setIsTable(true);
        } else {
            setActiveTarjeta("active");
            setActiveTabla("");
            setIsTable(false);
        }
    };

    const handleBtnCreate = () => {
        navigate("/admin/mesas/create/");
    };

    return (
        <>
            <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
                <i className="ni ni-fat-add fa-2x" />
                <span>Agregar Mesa</span>
            </Button>
            <div>
                <Button
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={() => {
                        handleActive("tarjeta");
                    }}
                    className={activeTarjeta}
                >
                    Tarjetas
                </Button>
                <Button
                    color="info"
                    outline
                    type="button"
                    size="lg"
                    aria-pressed={true}
                    onClick={() => {
                        handleActive("tabla");
                    }}
                    className={activeTabla}
                >
                    Tabla
                </Button>
            </div>
        </>
    );
};





// import myStyles from "../../../../assets/css/myStyles.module.css";

// import { Button } from "reactstrap";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const OptionBtn = ({ setIsTable }) => {
//     const [activeTabla, setActiveTabla] = useState("active");
//     const [activeTarjeta, setActiveTarjeta] = useState("");

//     const navigate = useNavigate();

//     const handleActive = (option) => {
//         if (option === "tabla") {
//             setActiveTabla("active");
//             setActiveTarjeta("");
//             setIsTable(true);
//         } else {
//             setActiveTarjeta("active");
//             setActiveTabla("");
//             setIsTable(false);
//         }
//     };

//     const handleBtnCreate = () => {
//         navigate("/admin/mesas/create/");
//     };

//     return (
//         <>
//             <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
//                 <i className="ni ni-fat-add fa-2x" />
//                 <span>Agregar Mesa</span>
//             </Button>
//             <div>
//                 <Button
//                     color="info"
//                     outline
//                     type="button"
//                     size="lg"
//                     aria-pressed={true}
//                     onClick={() => {
//                         handleActive("tabla");
//                     }}
//                     className={activeTabla}
//                 >
//                     Tabla
//                 </Button>
//                 <Button
//                     color="info"
//                     outline
//                     type="button"
//                     size="lg"
//                     aria-pressed={true}
//                     onClick={() => {
//                         handleActive("tarjeta");
//                     }}
//                     className={activeTarjeta}
//                 >
//                     Tarjetas
//                 </Button>
//                 <div> 
//                 <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Terraza")} className={activeLocation === "Terraza" ? "active" : ""}>
//                         Terraza
//                     </Button>

//                     <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Playa")} className={activeLocation === "Playa" ? "active" : ""}>
//                         Playa
//                     </Button>

//                     <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Comedor")} className={activeLocation === "Comedor" ? "active" : ""}>
//                         Comedor
//                     </Button>

//                     <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Bar")} className={activeLocation === "Bar" ? "active" : ""}>
//                         Bar
//                     </Button>
                    
//                     <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Portronas")} className={activeLocation === "Portronas" ? "active" : ""}>
//                         Portronas
//                     </Button>
//         </div>
//             </div>
//         </>
//     );
// };