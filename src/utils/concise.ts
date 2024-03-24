import { BASE_CONFIG } from "@/config/modules/base";
import { useGetAudioZip, useGetBlurZip, useGetImageZip } from "@/hooks";

/** @description 获取远程音效链接 */
export const _getAudioLink = (name: string) => {
  return useGetAudioZip().audio_links.value[name];
};

/** @description 获取远程音乐链接 */
export const _getMusicLink = (name: string) => `${BASE_CONFIG.IMGBED}/music/${name}.mp3`;

/** @description 获取远程视频链接 */
export const _getVideoLink = (name: string, version = "0") => {
  return `${BASE_CONFIG.IMGBED}/video/${name}.mp4?temp=${version}`;
};

/** @description 获取远程HTML链接 */
export const _getHtmlLink = (name: string) => `${BASE_CONFIG.IMGBED}/html/${name}.html`;

/** @description 获取远程图片链接 */
export const _getImgLink = (name: string, version = "0", suffix = "png") => {
  const url = useGetImageZip().image_links.value[name];

  //先获取本地，如果本地有，直接返回
  if (url) return url;
  return `${BASE_CONFIG.IMGBED}/image/${name}.${suffix}?temp=${version}`;
};

/** @description 获取模糊图片链接 */
export const _getBlurImgLink = (name: string) => {
  const key = name.replace(/\/heros\//, "").replace(/\.(png|jpg)$/i, "");

  const url = useGetBlurZip().blur_links.value[key];

  //先获取本地，如果本地有，直接返回
  if (url) return url;
  return "";
};
