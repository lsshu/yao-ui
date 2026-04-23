/**
 * 日期：2026/4/21 16:04:20
 * author：Administrator Lsshu
 * 文件 request.ts | request
 **/
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from "axios";
import qs from "qs";
import CryptoAES from "./CryptoAES";
import { decodeBase64, encodeBase64 } from "./helper";

import { getGlobalConfig } from "@/config/global";

const service: AxiosInstance = axios.create({
  // baseURL: config.baseUrl, // api 的 base_url
  // timeout: request_timeout, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
  // 自定义参数序列化函数
  paramsSerializer: {
    serialize: params =>
      qs.stringify(params, {
        arrayFormat: "repeat",
        allowDots: true,
        skipNulls: true
      })
  }
});
export const requestInterceptors = (config: InternalAxiosRequestConfig) => {
  const globalConfig = getGlobalConfig();
  if (globalConfig.axiosBaseUrl) config.baseURL = globalConfig.axiosBaseUrl; // 设置全局的 baseURL api 的 base_url
  if (globalConfig.axiosTimeout) config.timeout = globalConfig.axiosTimeout; // 设置全局的 baseURL api 的 timeout 请求超时时间

  if (globalConfig.cryptoAble) {
    if (config.params) {
      // 请求参数加密
      const encryption = CryptoAES.encrypt(
        config.params,
        globalConfig.cryptoKey || ""
      );
      config.params = { params: encodeBase64(encryption) };
    }
    if (config.data) {
      //  请求内容加密
      const encryption = CryptoAES.encrypt(
        config.data as object | string,
        globalConfig.cryptoKey || ""
      );
      config.data = { data: encodeBase64(encryption) };
    }
  }
  return config;
};
// request 拦截器
service.interceptors.request.use(requestInterceptors, (error: AxiosError) => {
  // Do something with request error
  return Promise.reject(error);
});
export const responseInterceptors = async (response: AxiosResponse<any>) => {
  const globalConfig = getGlobalConfig();
  if (globalConfig.cryptoAble && typeof response.data.data === "string") {
    try {
      const str: string = decodeBase64(response.data.data);
      response.data.data = CryptoAES.decrypt(str);
      return response.data;
    } finally {
    }
  }
  return response.data;
};
// response 拦截器
service.interceptors.response.use(responseInterceptors, (error: AxiosError) => {
  console.log("err" + error); // for debug
  return Promise.reject(error);
});
export { service };
