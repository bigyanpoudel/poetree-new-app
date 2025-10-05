import axios, { InternalAxiosRequestConfig } from "axios";

import { APPENV } from "@/src/config/env";
import { Toast } from "toastify-react-native";
import { POETREE_USER, SESSION_EXPIRED } from "../utils/constant/appConstant";
import { storageUtil } from "../utils/storage";
import { performLogout } from "../utils/logout";

// Cache token to avoid repeated storage reads
let cachedToken: string | null = null;
let tokenPromise: Promise<any> | null = null;

const getToken = async () => {
  if (!tokenPromise) {
    tokenPromise = storageUtil.getItem(POETREE_USER);
  }
  const tokenData = await tokenPromise;
  cachedToken = tokenData?.accessToken || null;
  return cachedToken;
};

export const API = axios.create({
  baseURL: APPENV.BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = cachedToken || await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Update cached token when user changes
export const updateCachedToken = (newToken: string | null) => {
  cachedToken = newToken;
  tokenPromise = null; // Reset promise to force fresh storage read if needed
};

// Debug function to check current cached token
export const getCurrentCachedToken = () => cachedToken;

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (403 === error.response?.status) {
      Toast.error(SESSION_EXPIRED);
      // Perform automatic logout on session expiry
      await performLogout();
    }
    return Promise.reject(error);
  }
);
