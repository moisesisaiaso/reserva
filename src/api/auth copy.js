import axiosInstance from "./axiosInstance";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

//COMPAÑERO CODIGO
// Agrega un interceptor para las solicitudes
axiosInstance.interceptors.request.use((config) => {
    // Obtén el token de localStorage
    const token = localStorage.getItem('access_token');
    
    // Si el token existe, agrega el encabezado 'x-access-token'
    if (token) {
        config.headers['x-access-token'] = token;
    }
    
    // Devuelve la configuración modificada
    return config;
});

let isRefreshing = false;

// Configura un interceptor de respuesta. Los interceptores son funciones que se ejecutan antes de que la promesa de la solicitud se resuelva o rechace.
axiosInstance.interceptors.response.use(
    // Si la respuesta es exitosa, simplemente se devuelve la respuesta.
    (resp) => resp,
    // Si hay un error, esta función se ejecuta.
    async (error) => {
        try{
			const originalConfig = error.config;
            if (
				error.response?.status === 401 &&
				error.response.data.message === 'Unauthorized! Access Token was expired!'
			) {
				if (!isRefreshing) {
					isRefreshing = true;
					try {
						const refreshResponse = await refreshAccessToken()
						const { data } = refreshResponse;
                        const { accessToken, refreshToken } = data;

						if (!accessToken || !refreshToken) return Promise.reject(error);

						error.config.headers['x-access-token'] = accessToken;

						axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
                        localStorage.setItem("access_token", accessToken);
                        localStorage.setItem("refresh_token", refreshToken);

						return axiosInstance(originalConfig);
					} catch (_err) {
						localStorage.clear();
						window.location.href = '/authentication/sign-in';
						return Promise.reject(error);
					} finally {
						isRefreshing = false;
					}
				}
			}
        }catch(err){
            return Promise.reject(error);
        }
    }
);

// Función para iniciar sesión. Toma un correo electrónico y una contraseña, hace una solicitud POST a la ruta de inicio de sesión y almacena el token de acceso, el token de actualización y la información del usuario en el almacenamiento local si la respuesta es exitosa.
export async function login(credentials) {
    console.log(credentials);

    try {
        const response = await axios.post(`${apiUrl}intimar/auth/signin`, credentials);
        const { data } = response;
        const { accessToken, refreshToken } = data;

        if (response.status === 200) {
            axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
        }
    } catch (error) {
        console.error(error);
    }
}

// Función para refrescar el token de acceso. Hace una solicitud POST a la ruta de actualización del token con el token de actualización almacenado en el almacenamiento local del navegador y devuelve la respuesta.
async function refreshAccessToken() {
    try {
        const response = await axios.post(
            `${apiUrl}intimar/auth/refreshtoken`,
            {
                refreshToken: localStorage.getItem("refresh_token"),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (refreshError) {
        console.error(refreshError);
    }
}
