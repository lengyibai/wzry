import { dayjs } from "./tool";

import { BASE_CONFIG } from "@/config/modules/base";
import { useGetZip } from "@/hooks";

/** @description 获取远程音效链接
 * @param name 音频名称
 */
export const _getAudioLink = (name: string) => {
  return useGetZip().audio_links.value[name];
};

/** @description 获取远程音乐链接
 * @param name 音频名称
 */
export const _getMusicLink = (name: string) => `${BASE_CONFIG.IMGBED}/music/${name}.mp3`;

/** @description 获取主页视频链接
 * @param name 音频名称
 * @param version 版本号
 */
export const _getVideoLink = (name: string, version = "0") => {
  const links = useGetZip().video_home_links;
  const url = links.value[name];

  //先获取本地，如果本地有，直接返回
  if (url) return url;
  return `${BASE_CONFIG.IMGBED}/video/${name}.mp4?temp=${version}`;
};

/** @description 获取远程HTML链接
 * @param name HTML名称
 */
export const _getHtmlLink = (name: string) =>
  `${BASE_CONFIG.IMGBED}/html/${name}.html?t=${dayjs().unix()}`;

/** @description 获取非压缩包图片链接
 * @param name 图片名称
 * @param version 版本号
 * @param suffix 图片后缀
 */
export const _getImgLink = (name: string, version = "0", suffix = "png") => {
  return `${BASE_CONFIG.IMGBED}/image/${name}.${suffix}?temp=${version}`;
};

/** @description 获取活动banner背景图片链接
 * @param name 图片名称
 */
export const _getActivityBannerLink = (name: string) => {
  return useGetZip().image_activity_banner_links.value[name];
};

/** @description 获取模糊图片链接
 * @param name 图片名称
 */
export const _getBlurImgLink = (name: string) => {
  const key = name.replace(/\/(heros|epigraphs)\//, "").replace(/\.(png|jpg)$/i, "");
  const url = useGetZip().image_blur_links.value[key];
  return url;
};

/** @description 获取英雄大头贴图片链接
 * @param name 图片名称
 */
export const _getHeroAvatarLink = (name: string) => {
  return useGetZip().image_hero_avatar_links.value[name];
};

/** @description 获取MC贴图链接
 * @param name 图片名称
 */
export const _getMinecraftLink = (name: string) => {
  return useGetZip().image_minecraft_links.value[name];
};

/** @description 获取迷你英雄图片链接
 * @param name 图片名称
 */
export const _getMiniHeroLink = (name: string) => {
  return useGetZip().image_mini_hero_links.value[name];
};

/** @description 获取杂图链接
 * @param name 图片名称
 */
export const _getMiscLink = (name: string) => {
  return useGetZip().image_misc_links.value[name];
};

/** @description 获取道具贴图链接
 * @param name 图片名称
 */
export const _getPropLink = (name: string) => {
  return useGetZip().image_props_links.value[name];
};
