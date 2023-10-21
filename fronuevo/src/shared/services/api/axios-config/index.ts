import axios from "axios";
import { ErrorInterceptor, ResponseInterceptor } from "./interceptors";
import { useAuth } from "@/shared/zustand/slice/Auth";

const Api = axios.create({
  baseURL: "http://localhost:9000/v1/api/",
  withCredentials: true,
});
//"http://localhost:9000/v1/api/",

Api.interceptors.request.use((request) => {
  const token = useAuth.getState().token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

Api.interceptors.response.use(
  (response) => ResponseInterceptor(response),
  (error) => ErrorInterceptor(error)
);

export { Api };
