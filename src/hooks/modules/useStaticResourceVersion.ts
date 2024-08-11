import { ref } from "vue";

import { API_DATA } from "@/api";
import { _retryRequest } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { $msgTipText } from "@/config";

const ExposeData = {
  /** 是否加载完毕 */
  finish: ref(false),
  /** 音效包列表 */
  audio_version: ref(""),
  /** 活动Banner图包列表 */
  image_activity_banner_version: ref(""),
  /** 模糊海报图包列表 */
  image_blur_version: ref(""),
  /** 英雄大头贴列表 */
  image_hero_avatar_version: ref(""),
  /** Minecraft贴图包列表 */
  image_minecraft_version: ref(""),
  /** 杂图包列表 */
  image_misc_version: ref(""),
  /** 道具图包列表 */
  image_props_version: ref(""),
  /** 迷你英雄图包列表 */
  image_mini_hero_version: ref(""),
  /** 主页视频 */
  video_home_version: ref(""),
  /** 登录页视频 */
  video_login_version: ref(""),
  /** 数据包 */
  json_data_version: ref(""),
  /** 语音包 */
  json_voice_version: ref(""),
};

const {
  finish,
  audio_version,
  image_activity_banner_version,
  image_blur_version,
  image_hero_avatar_version,
  image_minecraft_version,
  image_misc_version,
  image_props_version,
  image_mini_hero_version,
  video_home_version,
  video_login_version,
  json_data_version,
  json_voice_version,
} = ExposeData;

/** @description 静态资源版本 */
const useStaticResourceVersion = () => {
  const ExposeMethods = {
    async load() {
      try {
        const res = await _retryRequest({ promiseFn: API_DATA.StaticVersion });
        const {
          audioVersion,
          imageActivityBannerVersion,
          imageBlurVersion,
          imageHeroAvatarVersion,
          imageMinecraftVersion,
          imageMiscVersion,
          imagePropsVersion,
          imageMiniHeroVersion,
          videoHomeVersion,
          videoLoginVersion,
          jsonDataVersion,
          jsonVoiceVersion,
        } = res.data;

        audio_version.value = audioVersion;
        image_activity_banner_version.value = imageActivityBannerVersion;
        image_blur_version.value = imageBlurVersion;
        image_hero_avatar_version.value = imageHeroAvatarVersion;
        image_minecraft_version.value = imageMinecraftVersion;
        image_misc_version.value = imageMiscVersion;
        image_props_version.value = imagePropsVersion;
        image_mini_hero_version.value = imageMiniHeroVersion;
        video_home_version.value = videoHomeVersion;
        video_login_version.value = videoLoginVersion;
        json_data_version.value = jsonDataVersion;
        json_voice_version.value = jsonVoiceVersion;

        finish.value = true;

        return ExposeData;
      } catch (error) {
        $message($msgTipText("rc53", { v: "静态资源版本文件" }), "error");
        throw error;
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useStaticResourceVersion };
