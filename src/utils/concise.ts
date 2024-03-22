import { BASE_CONFIG } from "@/config/modules/base";

/** @description 获取远程音效链接 */
export const _getAudioLink = (name: string, version = "0") =>
  `${BASE_CONFIG.IMGBED}/audio/${name}.mp3?temp=${version}`;

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
  return `${BASE_CONFIG.IMGBED}/image/${name}.${suffix}?temp=${version}`;
};
