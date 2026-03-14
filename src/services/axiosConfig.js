import axios from "axios";
import {logout} from "../utils/authFetch";

const axiosInstance = axios.create({
  baseURL: "https://training-academy-backend.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config)=>{
    const token=localStorage.getItem("authToken");

    if(token){
      config.headers.Authorization="Basic "+token;
    }

    return config;
  },
  (error)=>Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response)=>response,
  (error)=>{
    if(error.response&&error.response.status===401){
      alert("Session expired. Please login again.");
      logout();
    }
    console.log("Response error:", error.response?.status);
    return Promise.reject(error);
  }
)

export default axiosInstance;
