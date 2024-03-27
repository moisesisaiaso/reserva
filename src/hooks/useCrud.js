import apiClient from "apiClient";
import { useState } from "react";

import apiClient from "./ervices/apiClient";

export const useCrud = () => {
    const [apiData, setApiData] = useState();

    /* Read */
    const getApi = (path) => {
        apiClient
            .get(path)
            .then(({ data }) => {
                setApiData(data);
                console.log("datos recibidos");
            })
            .catch((error) => console.log(error));
    };

    /* Create */
    const postApi = (path, data) => {
        apiClient
            .post(path, data)
            .then(({ data }) => {
                setApiData([data, ...apiData]);
                console.log("Data enviada");
            })
            .catch((error) => console.log(error));
    };

    /* DELETE */
    const deleteApi = (path, id) => {
        apiClient
            .delete(`${path}/${id}`)
            .then(() => {
                const newData = apiData.filter((element) => element.id !== id);
                setApiData(newData);
                console.log("Se ha eliminado un registro");
            })
            .catch((error) => console.log(error));
    };

    /* UPDATE */
    const updateApi = (path, id, data) => {
        apiClient
            .patch(`${path}/${id}`, data)
            .then(({ data }) => {
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

    return [apiData, getApi, postApi, deleteApi, updateApi];
};
