import type { AxiosProgressEvent } from "axios";

import { $LocaleHttp, $RemoteHttp, $ResourceHttp } from "@/api/helper";
import { RESOURCE_NAME } from "@/config/modules/resource-name";

/** @description 获取版本信息 */
export const Version = () => {
  return $LocaleHttp.Get<Global.Version.File>(`/${RESOURCE_NAME.VERSION}.json`);
};

/** @description 获取更新日志 */
export const UpdateLog = () => {
  return $LocaleHttp.Get<Global.Version.UpdateLog>(`/${RESOURCE_NAME.UPDATE_LOG}.json`);
};

/** @description 获取静态资源版本信息 */
export const StaticVersion = () => {
  return $LocaleHttp.Get<Global.Version.Static>(`/${RESOURCE_NAME.STATIC_VERSION}.json`);
};

/** @description 获取计划 */
export const Todo = () => {
  return $LocaleHttp.Get<Global.Todo>(`/${RESOURCE_NAME.TODO}.json`);
};

/** @description 获取公告 */
export const Notice = () => {
  return $LocaleHttp.Get<string>(`/${RESOURCE_NAME.NOTICE}.json`);
};

/** @description 获取音乐列表 */
export const Music = () => {
  return $LocaleHttp.Get<Global.Music[]>(`/${RESOURCE_NAME.MUSIC}.json`);
};

/** @description 获取战绩 */
export const Team = () => {
  return $LocaleHttp.Get<string[][]>(`/${RESOURCE_NAME.TEAM}.json`);
};

/** @description 获取邮箱列表 */
export const Mail = () => {
  return $LocaleHttp.Get<Global.Mail[]>(`/${RESOURCE_NAME.MAIL}.json`);
};

/** @description 获取素材相关Zip
 * @param onDownloadProgress 下载进度回调
 */
export const ZipResource = (
  url: string,
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  return $ResourceHttp.Get<any>(`/${url}`, {
    onDownloadProgress,
  });
};

/** @description 获取数据相关Zip
 * @param onDownloadProgress 下载进度回调
 */
export const ZipDatabase = (
  url: string,
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  return $RemoteHttp.Get<any>(`/${url}`, {
    onDownloadProgress,
  });
};
