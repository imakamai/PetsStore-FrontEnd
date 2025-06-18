import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7055/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        if (userId) {
            config.headers['X-User-Id'] = userId;
        }
        if (userRole) {
            config.headers['X-User-Role'] = userRole;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;
