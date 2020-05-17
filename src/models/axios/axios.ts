import axios from 'axios';

export const instace = axios.create({
    baseURL: 'http://locahost:8080/'
});