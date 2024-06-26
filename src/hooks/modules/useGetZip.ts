import { type Ref, ref } from "vue";

import { useStaticResourceVersion } from "./useStaticResourceVersion";
import { useIndexedDB } from "./useIndexedDB";

import { _base64ToObject, _blobTextToBase64 } from "@/utils/tool";
import { _downloadZip } from "@/utils/privateTool";
import { $message } from "@/utils/busTransfer";
import { $msgTipText } from "@/config/modules/message-tip";
import { API_DATA, KVP_HERO, LOCAL_HERO } from "@/api";
import { LOCAL_KEY } from "@/config";
import { RESOURCE_NAME } from "@/config/modules/resource-name";
import type { ZipType } from "@/utils/interface";

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
  JSON_DATA: "数据包",
  JSON_VOICE: "语音包",
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
  const { BaseData, VoiceData, ZipDatabase } = useIndexedDB();
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
    json_data_version,
    json_voice_version,
    load,
  } = useStaticResourceVersion();

  const ExposeData = {
    /** 压缩包名称键值列表 */
    zip_key_name,

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
    /** 完成索引 */
    downloaded_index: ref(0),
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
    downloaded_index,
    zip_size,
    zip_downloaded_size,
    zip_download_progress,
    zip_download_finish,
    zip_decompression_progress,
    zip_decompression_finish,
  } = ExposeData;

  /** @description 获取素材zip公共函数
   * @param links 压缩包链接列表
   * @param apiUrl 压缩包API地址
   * @param version 压缩包版本
   * @param type 压缩包类型
   */
  const getMaterialZip = (
    links: Ref<Record<string, string>>,
    apiUrl: string,
    version: string,
    type: ZipType,
  ) => {
    zip_name.value = zip_key_name[type];

    return new Promise<void>(async (resolve) => {
      //退卡时跳过下载
      if (Object.keys(links.value).length) {
        resolve();
        return;
      }

      //判断本地是否存在压缩包缓存
      const blob_group = await ZipDatabase.getItem<{
        version: string;
        data: { key: string; blob: Blob }[];
      }>(type);
      if (blob_group) {
        //如果本地缓存版本和服务器压缩包版本一致，则直接使用本地缓存数据
        if (Number(blob_group.version) === Number(version)) {
          blob_group.data.forEach((item) => {
            const url = URL.createObjectURL(item.blob);
            links.value[item.key] = url;
          });
          resolve();
          return;
        } else {
          ZipDatabase.removeItem(type);
        }
      }

      //下载Zip
      _downloadZip(apiUrl, API_DATA.ZipResource, version, type, (v) => {
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
          $message($msgTipText("rc53", { v: zip_key_name[type] }), "error");
        });
    });
  };

  /** @description 获取数据zip公共函数
   * @param apiUrl 压缩包API地址
   * @param version 压缩包版本
   * @param type 压缩包类型
   */
  const getDataZip = (apiUrl: string, version: string, type: ZipType) => {
    zip_name.value = zip_key_name[type];

    return new Promise<void>(async (resolve) => {
      //如果已经存在数据，则跳过下载，这种情况在退卡时会遇到
      const data = await BaseData.getItem(LOCAL_KEY.hero);
      const voice = await VoiceData.getItem("鬼谷子");

      if (type === "JSON_DATA" && data) {
        resolve();
        return;
      }

      if (type === "JSON_VOICE" && voice) {
        resolve();
        return;
      }

      //下载Zip
      _downloadZip(apiUrl, API_DATA.ZipDatabase, version, type, (v) => {
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
        .then(async (json) => {
          const data: Record<string, string> = {};

          if (type === "JSON_DATA") {
            for (const key in json) {
              const k = key as keyof typeof LOCAL_KEY;
              const base64 = await _blobTextToBase64(json[key]);
              data[key] = _base64ToObject(base64).data;
              await BaseData.setItem(LOCAL_KEY[k], data[key]);
            }
          } else {
            const hero_id_kvp = await LOCAL_HERO.getHeroList();
            const hero_name_kvp = await KVP_HERO.getHeroNameKvp();
            const hero_pinyin_kvp = await KVP_HERO.getHeroPinyinKvp();
            const pinyin_name: Record<string, string> = {};

            //创建拼音、英雄名键值对
            hero_id_kvp.forEach((item) => {
              pinyin_name[hero_pinyin_kvp[item]] = hero_name_kvp[item];
            });

            //通过创建的键值对，对应存储到本地
            for (const key in json) {
              const base64 = await _blobTextToBase64(json[key]);
              data[key] = _base64ToObject(base64).data;
              await VoiceData.setItem(pinyin_name[key], data[key]);
            }
          }

          resolve();
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: zip_key_name[type] }), "error");
        });
    });
  };

  const ExposeMethods = {
    /** @description 获取Zip列表 */
    async getZipList() {
      await load();

      await getMaterialZip(audio_links, RESOURCE_NAME.ZIP_AUDIO, audio_version.value, "AUDIO");
      downloaded_index.value = 1;

      await getMaterialZip(
        image_activity_banner_links,
        RESOURCE_NAME.ZIP_IMAGE_ACTIVITY_BANNER,
        image_activity_banner_version.value,
        "IMAGE_ACTIVITY_BANNER",
      );
      downloaded_index.value = 2;

      await getMaterialZip(
        image_blur_links,
        RESOURCE_NAME.ZIP_IMAGE_BLUR,
        image_blur_version.value,
        "IMAGE_BLUR",
      );
      downloaded_index.value = 3;

      await getMaterialZip(
        image_hero_avatar_links,
        RESOURCE_NAME.ZIP_IMAGE_HERO_AVATAR,
        image_hero_avatar_version.value,
        "IMAGE_HERO_AVATAR",
      );
      downloaded_index.value = 4;

      await getMaterialZip(
        image_minecraft_links,
        RESOURCE_NAME.ZIP_IMAGE_MINECRAFT,
        image_minecraft_version.value,
        "IMAGE_MINECRAFT",
      );
      downloaded_index.value = 5;

      await getMaterialZip(
        image_misc_links,
        RESOURCE_NAME.ZIP_IMAGE_MISC,
        image_misc_version.value,
        "IMAGE_MISC",
      );
      downloaded_index.value = 6;

      await getMaterialZip(
        image_props_links,
        RESOURCE_NAME.ZIP_IMAGE_PROPS,
        image_props_version.value,
        "IMAGE_PROPS",
      );
      downloaded_index.value = 7;

      await getMaterialZip(
        image_mini_hero_links,
        RESOURCE_NAME.ZIP_IMAGE_MINI_HERO,
        image_mini_hero_version.value,
        "IMAGE_MINI_HERO",
      );
      downloaded_index.value = 8;

      await getMaterialZip(
        video_home_links,
        RESOURCE_NAME.ZIP_VIDEO_HOME,
        video_home_version.value,
        "VIDEO_HOME",
      );
      downloaded_index.value = 9;

      await getDataZip(RESOURCE_NAME.ZIP_JSON_DATA, json_data_version.value, "JSON_DATA");
      downloaded_index.value = 10;

      await getDataZip(RESOURCE_NAME.ZIP_JSON_VOICE, json_voice_version.value, "JSON_VOICE");
      downloaded_index.value = 11;

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
