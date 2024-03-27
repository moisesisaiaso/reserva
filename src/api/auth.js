import axiosInstance from "./axiosInstance";

// Inicializa una variable de control para evitar múltiples solicitudes de actualización de token simultáneas.
let isRefreshing = false;

// Configura el encabezado 'x-access-token' en la instancia de axios con el token de acceso almacenado en el almacenamiento local del navegador.
axiosInstance.defaults.headers.common["x-access-token"] = localStorage.getItem("access_token");

// Configura un interceptor de respuesta. Los interceptores son funciones que se ejecutan antes de que la promesa de la solicitud se resuelva o rechace.
axiosInstance.interceptors.response.use(
    // Si la respuesta es exitosa, simplemente se devuelve la respuesta.
    (resp) => resp,
    // Si hay un error, esta función se ejecuta.
    async (error) => {
        // Si el estado de la respuesta es 401 (no autorizado) y no se está actualizando el token, se intenta actualizar el token de acceso.
        if (error.response.status === 401 && !isRefreshing) {
            isRefreshing = true;
            try {
                // Llama a la función refreshAccessToken para obtener un nuevo token de acceso.
                const response = await refreshAccessToken();
                const { data } = response;
                const { accessToken, refreshToken, id, name, lastname, email, roles, cellphone } =
                    data;
                // Si la respuesta es exitosa (estado 200), se actualizan los tokens de acceso y actualización en el almacenamiento local y en los encabezados predeterminados de axios.
                // También se almacena la información del usuario en el almacenamiento local. Luego, se vuelve a intentar la solicitud original.
                if (response.status === 200) {
                    axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
                    localStorage.setItem("access_token", accessToken);
                    localStorage.setItem("refresh_token", refreshToken);
                    const user = {
                        id,
                        name,
                        lastname,
                        email,
                        roles,
                        cellphone,
                    };
                    localStorage.setItem("user", JSON.stringify(user));

                    return axiosInstance(error.config);
                }
            } catch (refreshError) {
                // Si la actualización del token falla y el estado de la respuesta es 403 (prohibido), se redirige al usuario a la página de inicio de sesión.
                if (refreshError.response && refreshError.response.status === 403) {
                    window.location.href = "/login";
                }
            } finally {
                isRefreshing = false;
            }
        }

        // Si la respuesta fue un error y no se pudo actualizar el token, se rechaza la promesa con el error.
        return Promise.reject(error);
    }
);

// Función para iniciar sesión. Toma un correo electrónico y una contraseña, hace una solicitud POST a la ruta de inicio de sesión y almacena el token de acceso, el token de actualización y la información del usuario en el almacenamiento local si la respuesta es exitosa.
export async function login(credentials) {
    console.log(credentials);

    try {
        const response = await axiosInstance.post("/intimar/auth/signin", credentials);
        const { data } = response;
        const { accessToken, refreshToken, id, name, lastname, email, roles, cellphone } = data;

        if (response.status === 200) {
            axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            const user = {
                id,
                name,
                lastname,
                email,
                roles,
                cellphone,
            };
            localStorage.setItem("user", JSON.stringify(user));
        }
    } catch (error) {
        console.error(error);
    }
}

// Función para refrescar el token de acceso. Hace una solicitud POST a la ruta de actualización del token con el token de actualización almacenado en el almacenamiento local del navegador y devuelve la respuesta.
async function refreshAccessToken() {
    try {
        const response = await axiosInstance.post(
            "/intimar/auth/refreshtoken",
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
