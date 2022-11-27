import axios, { AxiosRequestConfig, Canceler } from "axios";
import { isFunction } from "@/utils/is/index";
import qs from "qs";

/* 声明一个 Map 用于存储每个请求的标识和取消请求函数 */
let pendingMap = new Map<string, Canceler>();

/* 序列化参数 */
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

/* 取消 */
export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config); //请求之前，判断当前请求是否在请求队列里，存在则取消上一个请求
    const url = getPendingUrl(config);

    /* 判断请求配置里是否设置取消请求的函数，没有则设置 */
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) pendingMap.set(url, cancel); //如果不存在，则写入
      });
  }

  /* 移除请求 */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);
    }
  }

  /* 清空所有pending */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /* 重置 */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
