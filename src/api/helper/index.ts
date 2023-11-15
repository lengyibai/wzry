import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { ResultData } from "@/api/interface";

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 1000 * 600,
};

class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.url += `?temp=${Math.random()}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    let err_status = false;
    /** @description 响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        //如果是获取版本信息造成的报错，则不提醒
        if (error.config?.url?.includes("version")) return;
        if (error.code === "ERR_NETWORK" && !err_status) {
          err_status = true;
          const reset = confirm(
            "检测到数据请求失败，可能是服务器异常导致，请尝试点击【取消】自动刷新浏览器解决，刷新后依旧显示此弹窗，请点击【确定】清除数据重新下载，如果扔未解决，请反馈给作者。",
          );
          if (reset) {
            localStorage.clear();
          }
          location.reload();
        }

        return Promise.reject(error);
      },
    );
  }

  Get<T = unknown>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }

  Post<T = unknown>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, config);
  }

  Patch<T = unknown>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return this.service.put(url, params, config);
  }

  Del<T = unknown>(
    url: string,
    params?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }
}

export default new RequestHttp(config);
