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
        console.log(data);
        return await axiosInstance
            .post(path, data)
            .then(() => {
                console.log("Data enviada");
                if (apiData) {
                    console.log("apiData: " + apiData);
                    setApiData([data, ...apiData]);
                }
            })
            .catch((error) => console.log(error));
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

    /* UPDATE */
    const updateApi = async (path, id, data) => {
        return await axiosInstance
            .put(`${path}/${id}`, data)
            .then(() => {
                const newData = apiData.map((element) => {
                    if (element.id === id) {
                        return data;
                    }
                    return element;
                });
                setApiData(newData);
                console.log("registro actualizado");
            })
            .catch((error) => console.log(error));
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
