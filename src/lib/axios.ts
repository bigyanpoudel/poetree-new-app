import axios, { InternalAxiosRequestConfig } from "axios";

import { APPENV } from "@/src/config/env";
import { toast } from "react-toastify";
import { POETREE_USER, SESSION_EXPIRED } from "../utils/constant/appConstant";
import { storageUtil } from "../utils/storage";

export const API = axios.create({
  baseURL: APPENV.BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const tokenData =  await storageUtil.getItem(POETREE_USER);
    if (tokenData?.accessToken) {
      config.headers.Authorization = `Bearer ${tokenData?.accessToken}`;
    }
  console.log("config");
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
   
    if (403 === error.response.status) {
      toast.error(SESSION_EXPIRED);
    }
    return Promise.reject(error);
  }
);
