import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { ResultData } from "@/api/interface";
import { CACHE_DATA } from "@/config";

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
};

class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (CACHE_DATA) {
          config.url += `?temp=${Math.random()}`;
        }

        return config;
      },
      async (error: AxiosError) => {
        return await Promise.reject(error);
      }
    );

    /** @description: 响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      async (error: AxiosError) => {
        return await Promise.reject(error);
      }
    );
  }

  //常用请求方法封装
  async Get<T>(
    url: string,
    params?: object,
    _object = {}
  ): Promise<ResultData<T>> {
    return await this.service.get(url, { params, ..._object });
  }

  async Post<T>(
    url: string,
    params?: object,
    _object = {}
  ): Promise<ResultData<T>> {
    return await this.service.post(url, params, _object);
  }

  async Patch<T>(
    url: string,
    params?: object,
    _object = {}
  ): Promise<ResultData<T>> {
    return await this.service.patch(url, params, _object);
  }

  async Del<T>(
    url: string,
    params?: any,
    _object = {}
  ): Promise<ResultData<T>> {
    return await this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
