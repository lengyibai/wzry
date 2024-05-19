/** @description 请求响应参数(不包含data) */
export interface Result {
  /** 请求码 */
  code: string;
  /** 请求信息 */
  msg: string;
}

/** @description 请求响应参数(包含data) */
export interface ResultData<T = unknown> extends Result {
  data: T;
}

/** @description 获取本地数据的参数 */
export interface Get {
  /** 用于获取本地存储的键名 */
  name: string;
  /** 从本地存储获取的数据的键名 */
  key?: string;
  /** 匹配的值 */
  value?: any;
  /** 全字匹配 */
  full?: boolean;
}
