import { useParams } from "react-router-dom";

export const CustomerDetail = () => {
    const { id } = useParams();
    return <div>CustomerDetail client {id} </div>;
};
