import axios from 'axios';

const AxiosEndPointsConfig = axios.create({
    baseURL: process.env.API,
});

export default AxiosEndPointsConfig;