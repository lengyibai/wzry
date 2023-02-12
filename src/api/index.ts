import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ResultData } from "@/api/interface";

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000,
};

class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.url += `?temp=${Math.random()}`;
        return config;
      },
      async (error: AxiosError) => {
        return await Promise.reject(error);
      }
    );

    let err_status = false;
    /** @description 响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      async (error: AxiosError) => {
        //如果是获取版本信息造成的报错，则不提醒
        if (error.config.url?.includes("version")) return;
        if (error.code === "ERR_NETWORK" && !err_status) {
          err_status = true;
          const reset = confirm(
            "检测到数据请求失败，可能是服务器异常导致，请尝试点击【取消】自动刷新浏览器解决，刷新后依旧显示此弹窗，请点击【确定】清除数据重新下载，如果扔未解决，请反馈给作者。"
          );
          if (reset) {
            localStorage.clear();
          }
          location.reload();
        }

        return await Promise.reject(error);
      }
    );
  }

  async Get<T>(url: string, params?: object, obj = {}): Promise<ResultData<T>> {
    return await this.service.get(url, { params, ...obj });
  }

  async Post<T>(url: string, params?: object, obj = {}): Promise<ResultData<T>> {
    return await this.service.post(url, params, obj);
  }

  async Patch<T>(url: string, params?: object, obj = {}): Promise<ResultData<T>> {
    return await this.service.patch(url, params, obj);
  }

  async Del<T>(url: string, params?: any, obj = {}): Promise<ResultData<T>> {
    return await this.service.delete(url, { params, ...obj });
  }
}

export default new RequestHttp(config);
