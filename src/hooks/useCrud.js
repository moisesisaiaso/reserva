import axiosInstance from "api/axiosInstance";
import { useEffect, useState } from "react";

export const useCrud = () => {
    const [apiData, setApiData] = useState();

    /* Read */
    const getApi = async (path) => {
        return await axiosInstance
            .get(path)
            .then(({ data }) => {
                setApiData(data.data);
                // console.log(data.data);
                // console.log("datos recibidos");
            })
            .catch((error) => console.log(error));
    };

    /*    const getOneApi = (path, id) => {
        axiosInstance
            .get(`${path}/${id}`)
            .then(({ data }) => {
                setApiData(data.client);
                console.log("Dato recibido: ", data.client);
            })
            .catch((error) => console.log(error));
    }; */

    /* Create */
    const postApi = async (path, data) => {
        try {
            const response = await axiosInstance.post(path, data);
            if (apiData) {
                setApiData([response.data, ...apiData]);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            }
            throw error;
        }
    };
    /* DELETE */
    const deleteApi = async (path, id) => {
        return await axiosInstance
            .delete(`${path}/${id}`)
            .then(() => {
                const newData = apiData.filter((element) => element.id !== id);
                setApiData(newData);
                console.log("datos nuevos: " + newData);
                console.log("Se ha eliminado un registro");
            })
            .catch((error) => console.log(error));
    };

    
    const updateApi = async (path, id, data) => {
        try {
            const response = await axiosInstance.put(`${path}/${id}`, data);
            const newData = apiData.map((element) => {
                if (element.id === id) {
                    return response.data;
                }
                return element;
            });
            setApiData(newData);
            return response.data;
        } catch (error) {
            throw error; // Propaga el error completo
        }
    };
    /* REMOVE PIVOTE */
    const removeApi = async (path) => {
        console.log(path);
        return await axiosInstance
            .delete(path)
            .then(() => {
                console.log("Data desasociada");
            })
            .catch((error) => console.log(error));
    };

    /* FINALIZAR RESERVA*/
    const finalizarApi = async (path) => {
        console.log(path);
        return await axiosInstance
            .post(path)
            .then(() => {
                console.log("Data desasociada");
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        // console.log("un elemento:", apiData);
    }, [apiData]);

    return [apiData, getApi, postApi, deleteApi, updateApi, removeApi, finalizarApi];
};
