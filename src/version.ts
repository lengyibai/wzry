import { API_DATA } from "./api";

import { CONFIG } from "@/config";

const local_version = localStorage.getItem(CONFIG.LOCAL_KEY.VERSION_FILE) || "";
const auto_update_status = localStorage.getItem(CONFIG.LOCAL_KEY.AUTO_UPDATE_STATUS) || "0";

API_DATA.Version().then((res) => {
  const { file } = res;

  //如果本地没有版本信息，则直接写入
  if (!local_version) {
    updateLocalVersion();
    return;
  }

  const local = getVersionNumber(local_version);
  const remote = getVersionNumber(file);

  if (remote > local && auto_update_status === "0") {
    updateLocalVersion();
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
});

const updateLocalVersion = () => {
  localStorage.setItem(CONFIG.LOCAL_KEY.AUTO_UPDATE_STATUS, "1");
};

const getVersionNumber = (version: string) => {
  return Number(version.replaceAll(".", ""));
};
