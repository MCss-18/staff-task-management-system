import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Error handled
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.error('No autenticado, redirigiendo...');
    } else if (status === 403) {
      console.error('Acceso denegado.');
    }
    return Promise.reject(error);
  }
);

export default api;