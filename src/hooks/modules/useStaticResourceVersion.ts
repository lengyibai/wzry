import { ref } from "vue";

import { API_DATA } from "@/api";
import { _retryRequest } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { $msgTipText } from "@/config";

const ExposeData = {
  /** 登录页视频版本 */
  login_video_bg_version: ref(""),
};
const { login_video_bg_version } = ExposeData;

/** @description 静态资源版本 */
const useStaticResourceVersion = () => {
  _retryRequest({
    promiseFn: API_DATA.StaticVersion,
  })
    .then((res) => {
      const { loginVideoBgVersion } = res.data;
      login_video_bg_version.value = loginVideoBgVersion;
    })
    .catch(() => {
      $message($msgTipText("rc53", { v: "静态资源版本文件" }), "error");
    });

  return ExposeData;
};

export { useStaticResourceVersion };
