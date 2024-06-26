import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ResultData } from "@/api/interface";
import { dayjs } from "@/utils/tool";

const local = {
  baseURL: `${location.origin}${import.meta.env.VITE_REMOTE_API_PATH}/json`,
  timeout: 1000 * 600,
} as const;

const database = {
  baseURL: import.meta.env.VITE_DATABASE_URL,
  timeout: 1000 * 600,
  responseType: "blob",
} as const;

const resource = {
  baseURL: import.meta.env.VITE_RESOURCE_URL,
  timeout: 1000 * 600,
  responseType: "blob",
} as const;

/* 本地JSON请求 */
class LocaleHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /* 请求拦截器 */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.url += `?temp=${dayjs().valueOf()}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /* 响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
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
}

/* 远程数据包请求 */
class DatabaseHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /** @description 请求拦截器 */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  Get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.service.get(url, { ...config });
  }
}

/* 远程静态资源 */
class ResourceHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /** @description 请求拦截器 */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  Get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.service.get(url, { ...config });
  }
}

const $LocaleHttp = new LocaleHttp(local);
const $RemoteHttp = new DatabaseHttp(database);
const $ResourceHttp = new ResourceHttp(resource);

export { $LocaleHttp, $RemoteHttp, $ResourceHttp };
