/**
 * 日期：2026/4/21 15:59:30
 * author：Administrator Lsshu
 * 文件 index.ts | index
 **/
import { service } from "@/utils/request";
import type { TYApiRequestConfig, TYApiResponse } from "@/components/api/types";
import type { AxiosInstance } from "axios";
const defaultAddressFormat: string = "/api/:model";

class Api {
  service: AxiosInstance;
  constructor(service: AxiosInstance) {
    this.service = service;
  }
  /****格式化地址****/
  addressFormatted = (
    model: string | undefined,
    format: string = defaultAddressFormat
  ) => {
    return format.replace(/:model/g, model || "");
  };

  /****模型默认方法****/
  defaultModel = (params: TYApiRequestConfig) => {
    params.url = params.url ? params.url : this.addressFormatted(params.model);
    return this.service.request<TYApiResponse>(params);
  };

  /****获取模型列表****/
  getModelIndex = (params: TYApiRequestConfig) => {
    params.url = params.url ? params.url : this.addressFormatted(params.model);
    return this.service.get<TYApiResponse>(params.url, params.config);
  };

  /****创建模型****/
  postModelStore = (params: TYApiRequestConfig) => {
    params.url = params.url ? params.url : this.addressFormatted(params.model);
    return this.service.post<TYApiResponse>(
      params.url,
      params.data,
      params.config
    );
  };

  /****获取模型详情****/
  getModelShow = (params: TYApiRequestConfig) => {
    params.url = params.url
      ? params.url
      : this.addressFormatted(params.model) + "/" + params.id;
    return this.service.get<TYApiResponse>(params.url, params.config);
  };

  /****更新模型****/
  putModelUpdate = (params: TYApiRequestConfig) => {
    params.url = params.url
      ? params.url
      : this.addressFormatted(params.model) + "/" + params.id;
    return this.service.put<TYApiResponse>(
      params.url,
      params.data,
      params.config
    );
  };

  /****更新模型****/
  patchModelUpdate = (params: TYApiRequestConfig) => {
    params.url = params.url
      ? params.url
      : this.addressFormatted(params.model) + "/" + params.id;
    return this.service.patch<TYApiResponse>(
      params.url,
      params.data,
      params.config
    );
  };

  /****删除模型****/
  deleteModelDestroy = (params: TYApiRequestConfig) => {
    params.url = params.url
      ? params.url
      : this.addressFormatted(params.model) + "/" + params.id;
    return this.service.delete<TYApiResponse>(params.url, params.config);
  };
}
export default new Api(service);
export { service, Api };
