import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 日期：2026/4/21 16:15:02
 * author：Administrator Lsshu
 * 文件 types.ts | types
 **/
export interface TYApiResponse extends AxiosResponse {
  data: {
    code: number;
    message: string;
    data: any;
  };
}
export interface TYApiRequestConfig extends AxiosRequestConfig {
  model?: string;
  [key: string]: any;
}
