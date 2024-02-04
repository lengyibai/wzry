import { ref } from "vue";

import { API_DATA } from "@/api";

const ExposeData = {
  /** 登录页视频版本 */
  login_video_bg_version: ref(""),
};
const { login_video_bg_version } = ExposeData;

/** @description 静态资源版本 */
const useStaticResourceVersion = () => {
  API_DATA.StaticVersion().then((res) => {
    const { loginVideoBgVersion } = res.data;
    login_video_bg_version.value = loginVideoBgVersion;
  });

  return ExposeData;
};

export { useStaticResourceVersion };
