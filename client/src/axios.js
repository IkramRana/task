import axios from 'axios';

export const localServer = 'https://taskmanagement01.herokuapp.com/api/'; // local url

const instance = axios.create({
    baseURL: localServer,
});

export default instance;