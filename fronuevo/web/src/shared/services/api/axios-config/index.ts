import axios from 'axios'
import { ErrorInterceptor, ResponseInterceptor } from './interceptors';



const Api = axios.create({
    baseURL: "http://localhost:3001/v1/api/"
});

Api.interceptors.response.use(
    (response)=> ResponseInterceptor(response),
    (error)=> ErrorInterceptor(error)
);

export {Api};