import { Ref, ref } from "vue";

import { useStaticResourceVersion } from "./useStaticResourceVersion";

import { API_DATA } from "@/api";
import { $msgTipText } from "@/config/modules/message-tip";
import { _downloadZip } from "@/utils/privateTool";
import { ZipType } from "@/utils/interface";
import { RESOURCE_NAME } from "@/config/modules/resource-name";

const zip_key_name: Record<ZipType, string> = {
  AUDIO: "音效包",
  IMAGE_ACTIVITY_BANNER: "活动Banner图包",
  IMAGE_BLUR: "模糊海报图包",
  IMAGE_HERO_AVATAR: "英雄大头贴",
  IMAGE_MINECRAFT: "Minecraft贴图包",
  IMAGE_MISC: "杂图包",
  IMAGE_PROPS: "道具图包",
  IMAGE_MINI_HERO: "迷你英雄图包",
  VIDEO_HOME: "主页视频",
};

const audio_links = ref<Record<string, string>>({});
const image_activity_banner_links = ref<Record<string, string>>({});
const image_blur_links = ref<Record<string, string>>({});
const image_hero_avatar_links = ref<Record<string, string>>({});
const image_minecraft_links = ref<Record<string, string>>({});
const image_mini_hero_links = ref<Record<string, string>>({});
const image_misc_links = ref<Record<string, string>>({});
const image_props_links = ref<Record<string, string>>({});
const video_home_links = ref<Record<string, string>>({});

/** @description 获取音效压缩包并解压设置音效列表 */
const useGetZip = () => {
  const {
    audio_version,
    image_activity_banner_version,
    image_blur_version,
    image_hero_avatar_version,
    image_minecraft_version,
    image_misc_version,
    image_props_version,
    image_mini_hero_version,
    video_home_version,
    load,
  } = useStaticResourceVersion();

  const ExposeData = {
    /** 音效包列表 */
    audio_links,
    /** 活动Banner图包列表 */
    image_activity_banner_links,
    /** 模糊海报图包列表 */
    image_blur_links,
    /** 英雄大头贴列表 */
    image_hero_avatar_links,
    /** Minecraft贴图包列表 */
    image_minecraft_links,
    /** 杂图包列表 */
    image_misc_links,
    /** 道具图包列表 */
    image_props_links,
    /** 迷你英雄图包列表 */
    image_mini_hero_links,
    /** 主页视频列表 */
    video_home_links,

    /** 当前下载的zip名称 */
    zip_name: ref(""),
    /** zip总大小KB */
    zip_size: ref("正在计算..."),
    /** zip已下载大小KB */
    zip_downloaded_size: ref("0KB"),
    /** zip下载进度百分比 */
    zip_download_progress: ref("0%"),
    /** 是否下载完成 */
    zip_download_finish: ref(false),
    /** zip解压进度百分比 */
    zip_decompression_progress: ref("0%"),
    /** 是否解压完成 */
    zip_decompression_finish: ref(false),
  };
  const {
    zip_name,
    zip_size,
    zip_downloaded_size,
    zip_download_progress,
    zip_download_finish,
    zip_decompression_progress,
    zip_decompression_finish,
  } = ExposeData;

  /** @description 获取zip公共函数 */
  const getZip = (links: Ref<Record<string, string>>, apiUrl: string, type: ZipType) => {
    zip_name.value = zip_key_name[type];

    return new Promise<void>((resolve) => {
      if (Object.keys(links.value).length) {
        resolve();
        return;
      }

      //下载Zip
      _downloadZip(apiUrl, API_DATA.ZipResource, type, (v) => {
        const {
          size,
          downloaded_size,
          download_progress,
          download_finish,
          decompression_progress,
          decompression_finish,
        } = v;

        if (zip_download_finish.value && zip_decompression_finish.value) return;

        zip_size.value = size;
        zip_downloaded_size.value = downloaded_size;
        zip_download_progress.value = download_progress;

        zip_download_finish.value = download_finish;
        zip_decompression_progress.value = decompression_progress;
        zip_decompression_finish.value = decompression_finish;
      })
        .then((link) => {
          links.value = link;
          resolve();
        })
        .catch(() => {
          alert($msgTipText("rc53", { v: zip_key_name[type] }));
        });
    });
  };

  const ExposeMethods = {
    /** @description 获取Zip列表 */
    async getZipList() {
      await load();

      await getZip(audio_links, `${RESOURCE_NAME.ZIP_AUDIO}?t=${audio_version.value}`, "AUDIO");
      await getZip(
        image_activity_banner_links,
        `${RESOURCE_NAME.ZIP_IMAGE_ACTIVITY_BANNER}?t=${image_activity_banner_version.value}`,
        "IMAGE_ACTIVITY_BANNER",
      );
      await getZip(
        image_blur_links,
        `${RESOURCE_NAME.ZIP_IMAGE_BLUR}?t=${image_blur_version.value}`,
        "IMAGE_BLUR",
      );
      await getZip(
        image_hero_avatar_links,
        `${RESOURCE_NAME.ZIP_IMAGE_HERO_AVATAR}?t=${image_hero_avatar_version.value}`,
        "IMAGE_HERO_AVATAR",
      );
      await getZip(
        image_minecraft_links,
        `${RESOURCE_NAME.ZIP_IMAGE_MINECRAFT}?t=${image_minecraft_version.value}`,
        "IMAGE_MINECRAFT",
      );
      await getZip(
        image_misc_links,
        `${RESOURCE_NAME.ZIP_IMAGE_MISC}?t=${image_misc_version.value}`,
        "IMAGE_MISC",
      );
      await getZip(
        image_props_links,
        `${RESOURCE_NAME.ZIP_IMAGE_PROPS}?t=${image_props_version.value}`,
        "IMAGE_PROPS",
      );
      await getZip(
        image_mini_hero_links,
        `${RESOURCE_NAME.ZIP_IMAGE_MINI_HERO}?t=${image_mini_hero_version.value}`,
        "IMAGE_MINI_HERO",
      );
      await getZip(
        video_home_links,
        `${RESOURCE_NAME.ZIP_VIDEO_HOME}?t=${video_home_version.value}`,
        "VIDEO_HOME",
      );

      zip_download_finish.value = true;
      zip_decompression_finish.value = true;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGetZip };
