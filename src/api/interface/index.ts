/** @description 请求响应参数(不包含data) */
export interface Result {
  code: string; //请求码
  msg: string; //请求信息
}

/** @description 请求响应参数(包含data) */
export interface ResultData<T = any> extends Result {
  data: T;
}
