import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ResultData } from "@/api/interface";
import { DISABLE_CACHE } from "@/config";

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
        if (DISABLE_CACHE) {
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
        //如果是获取版本信息造成的报错，则不提醒
        if (error.config.url?.includes("version")) return;
        if (error.code === "ERR_NETWORK") {
          const reset = confirm(
            "检测到数据请求失败，请尝试点击【取消】后刷新浏览器解决，刷新后如果依旧显示此弹窗，请点击【确定】清除数据重新下载，如果依旧未解决，请反馈给作者。"
          );
          if (reset) {
            localStorage.clear();
            location.reload();
          }
        }

        return await Promise.reject(error);
      }
    );
  }

  //常用请求方法封装
  async Get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return await this.service.get(url, { params, ..._object });
  }

  async Post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return await this.service.post(url, params, _object);
  }

  async Patch<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return await this.service.patch(url, params, _object);
  }

  async Del<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return await this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
