import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7055/api/',

});

export default api;
