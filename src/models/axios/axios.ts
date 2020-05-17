import axios from 'axios';

export const instace = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: "Access-Control-Allow-Origin"
});