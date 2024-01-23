import { BASE_CONFIG } from "@/config/modules/base";

/** @description 获取远程音效链接 */
export const getAudioLink = (name: string) => `${BASE_CONFIG.IMGBED}/audio/${name}.mp3`;

/** @description 获取远程音乐链接 */
export const getMusicLink = (name: string) => `${BASE_CONFIG.IMGBED}/music/${name}.mp3`;

/** @description 获取远程视频链接 */
export const getVideoLink = (name: string, version = "0") => {
  return `${BASE_CONFIG.IMGBED}/video/${name}.mp4?temp=${version}`;
};

/** @description 获取远程HTML链接 */
export const getHtmlLink = (name: string) => `${BASE_CONFIG.IMGBED}/html/${name}.html`;

/** @description 获取远程图片链接 */
export const getImgLink = (name: string, suffix = "png", version = "0") => {
  return `${BASE_CONFIG.IMGBED}/image/${name}.${suffix}?temp=${version}`;
};
