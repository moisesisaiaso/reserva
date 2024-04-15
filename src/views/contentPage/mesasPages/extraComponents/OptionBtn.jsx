import myStyles from "../../../../assets/css/myStyles.module.css";
import { Button } from "reactstrap";
import { useState } from "react";

export const OptionBtn = ({ setUbicacion }) => {
    const [activeLocation, setActiveLocation] = useState("Comedor");

    const handleActive = (location) => {
        setActiveLocation(location);
        setUbicacion(location);
    };

    const handleBtnCreate = () => {
      window.location.href = "/admin/mesas/create";
  };

    return (
        <>
          <Button type="button" size="lg" className={myStyles.btCreate} onClick={handleBtnCreate}>
                <i className="ni ni-fat-add fa-2x" />
                <span>Agregar Mesa</span>
            </Button>
        <div> 
           <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Terraza")} className={activeLocation === "Terraza" ? "active" : ""}>
                Terraza
            </Button>

            <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Playa")} className={activeLocation === "Playa" ? "active" : ""}>
                Playa
            </Button>

            <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Comedor")} className={activeLocation === "Comedor" ? "active" : ""}>
                Comedor
            </Button>

            <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Bar")} className={activeLocation === "Bar" ? "active" : ""}>
                Bar
            </Button>
            
            <Button color="info" outline type="button" size="lg" onClick={() => handleActive("Portronas")} className={activeLocation === "Portronas" ? "active" : ""}>
                Portronas
            </Button>
        </div>
          
        </>
    );
};
