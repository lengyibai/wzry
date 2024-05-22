import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import type { ResultData } from "@/api/interface";
import { dayjs } from "@/utils/tool";

const local = {
  baseURL: `${location.origin}/${import.meta.env.VITE_REMOTE_API_PATH}/json`,
  timeout: 1000 * 600,
};

const remote = {
  baseURL: import.meta.env.VITE_REMOTE_API_URL,
  timeout: 1000 * 600,
};

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

/* 远程JSON请求 */
class RemoteHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /** @description 请求拦截器 */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //禁止请求的数据设置缓存
        //config.url += `?temp=${dayjs().valueOf()}`;
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

/* 远程静态资源 */
class ResourceHttp {
  private service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //config.url += `?temp=${dayjs().valueOf()}`;
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
const $RemoteHttp = new RemoteHttp(remote);
const $ResourceHttp = new ResourceHttp(resource);

export { $LocaleHttp, $RemoteHttp, $ResourceHttp };
