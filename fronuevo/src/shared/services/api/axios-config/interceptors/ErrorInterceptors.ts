import { AxiosError } from "axios"


export const ErrorInterceptor = (error:AxiosError) =>{
if(error.message === 'Network Error'){
    return Promise.reject(new Error('Error de conexion'))
}

if(error.response?.status === 401){
   //hacer algo
}

return Promise.reject(error);
}