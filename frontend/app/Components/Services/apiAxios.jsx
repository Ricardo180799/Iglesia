import axios from "axios";
import { store } from "../Redux/store";
// Importa aquí tu acción de Redux para actualizar el token, por ejemplo:
// import { setToken, logout } from "../Redux/Slices/tokenSlice";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // IMPORTANTE: Permite enviar/recibir cookies (si usas HttpOnly para el refresh)
});

// 1. Interceptor de PETICIÓN (Lo que ya tienes)
api.interceptors.request.use((config) => {
  const token = store.getState().token.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Variables para manejar la cola de refresco
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true; 
      isRefreshing = true;

      try {
      const { data } = await api.get("/Refreshh")

        const newToken = data.accessToken; 

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest); 
      } catch (refreshError) {
        processQueue(refreshError, null);
        
      
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;