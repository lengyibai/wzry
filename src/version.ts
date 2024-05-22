import axios from "axios";

import { dayjs } from "./utils/tool";

import { LOCAL_KEY } from "@/config";

/** 本地DIST版本 */
const local_version = localStorage.getItem(LOCAL_KEY.VERSION_DIST) || "";
/** 是否自动更新的状态，为0将会自动刷新浏览器并将状态设置为1，当进入页面点击更新弹窗的更新按钮将会重新设置为0 */
const auto_update_status = localStorage.getItem(LOCAL_KEY.AUTO_UPDATE_STATUS) || "0";

axios
  .get(
    `${location.origin}${
      import.meta.env.VITE_REMOTE_API_PATH
    }/json/version.json?t=${dayjs().unix()}`,
  )
  .then((res) => {
    const { distVersion } = res.data.data;

    //如果本地没有版本信息，则直接写入
    if (!local_version) {
      updateLocalVersion();
      return;
    }

    const local = getVersionNumber(local_version);
    const remote = getVersionNumber(distVersion);

    //只有本地版本大于远程版本并且还未自动更新过才会触发自动更新
    if (remote > local && auto_update_status === "0") {
      updateLocalVersion();
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  });

/** @description 自动更新本地状态 */
const updateLocalVersion = () => {
  localStorage.setItem(LOCAL_KEY.AUTO_UPDATE_STATUS, "1");
};

/** @description 去掉版本号的小数点进行大小比较
 * @param version 带小数点的版本号
 */
const getVersionNumber = (version: string) => {
  return Number(version.replaceAll(".", ""));
};
