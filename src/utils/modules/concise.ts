import { CONFIG } from "@/config";

/** @description 获取远程图片链接 */
export const getImgLink = (name: string, suffix = "png") =>
  `${CONFIG.BASE.IMGBED}/image/${name}.${suffix}`;

/** @description 获取远程音效链接 */
export const getAudioLink = (name: string) => `${CONFIG.BASE.IMGBED}/audio/${name}.mp3`;

/** @description 获取远程音乐链接 */
export const getMusicLink = (name: string) => `${CONFIG.BASE.IMGBED}/music/${name}.mp3`;

/** @description 获取远程视频链接 */
export const getVideoLink = (name: string) => `${CONFIG.BASE.IMGBED}/video/${name}.mp4`;

/** @description 获取远程HTML链接 */
export const getHtmlLink = (name: string) => `${CONFIG.BASE.IMGBED}/html/${name}.html`;
