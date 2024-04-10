import axiosInstance from "api/axiosInstance";
import { useEffect, useState } from "react";

export const useCrud = () => {
    const [apiData, setApiData] = useState();

    /* Read */
    const getApi = (path) => {
        axiosInstance
            .get(path)
            .then(({ data }) => {
                setApiData(data.data);
                console.log(data.data);
                console.log("datos recibidos");
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
    const postApi = (path, data) => {
        console.log(data);
        axiosInstance
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
    const deleteApi = (path, id) => {
        axiosInstance
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
    const updateApi = (path, id, data) => {
        axiosInstance
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

    useEffect(() => {
        console.log("un elemento:", apiData);
    }, [apiData]);

    return [apiData, getApi, postApi, deleteApi, updateApi];
};
