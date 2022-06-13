import axios from "axios";
import qs from "qs";

const baseURL = 'http://hotel.lynnrin.top/api'

axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

const request = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    withCredentials: true // 允许携带 cookie
})

export default request;