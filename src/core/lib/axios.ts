import axios from "axios";
import getConfig from "next/config";
// import Cookies from 'js-cookie'

const { publicRuntimeConfig } = getConfig();

const timeout = publicRuntimeConfig?.TIMEOUT || 30000;
// const token = Cookies.get(`${publicRuntimeConfig.TOKEN_NAME ?? ''}`)

export const defaultAppAxiosConfigs = {
  timeout: Number.parseInt(`${timeout}`),
  headers: {
    // Authorization: `Bearer ${token}`,
  },
};

export interface AppAxiosConfig {
  headers: any;
}

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/
export const appAxios = (config?: AppAxiosConfig) => {
  const axiosInstance = config
    ? axios.create(config)
    : axios.create(defaultAppAxiosConfigs);

  axiosInstance.interceptors.request.use(
    (configParam) => {
      return configParam;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

/**
|--------------------------------------------------
| AXIOS with multipart/form-data
|--------------------------------------------------
*/
export const appAxiosMultipart = (config?: AppAxiosConfig | undefined) => {
  return appAxios({
    ...defaultAppAxiosConfigs,
    headers: {
      // Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
    ...config,
  });
};
