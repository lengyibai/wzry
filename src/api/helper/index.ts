import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dayjs from "dayjs";

import type { ResultData } from "@/api/interface";

const local = {
  baseURL: `${location.origin}/json`,
  timeout: 1000 * 600,
};

const remote = {
  baseURL: import.meta.env.VITE_REMOTE_API_URL as string,
  timeout: 1000 * 600,
};

class LocaleHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.url += `?temp=${dayjs().valueOf()}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /** @description 响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  Get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.service.get(url, { params, ...config });
  }
}
class RemoteHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.url += `?temp=${dayjs().valueOf()}`;
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
            "检测到数据请求失败，请尝试刷新浏览器，如果仍未解决，请点击【确定】清除本地数据，如果还未解决，请联系作者。",
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

const $LocaleHttp = new LocaleHttp(local);
const $RemoteHttp = new RemoteHttp(remote);

export { $LocaleHttp, $RemoteHttp };
