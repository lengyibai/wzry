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
