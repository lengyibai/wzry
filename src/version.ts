import axios from "axios";
import dayjs from "dayjs";

import { CONFIG } from "@/config";

const local_version = localStorage.getItem(CONFIG.LOCAL_KEY.VERSION_FILE) || "";
const auto_update_status =
  localStorage.getItem(CONFIG.LOCAL_KEY.AUTO_UPDATE_STATUS) || "0";

axios
  .get(`${location.origin}/king-honor/json/version.json?t=${dayjs().unix()}`)
  .then((res) => {
    const { file } = res.data;

    //如果本地没有版本信息，则直接写入
    if (!local_version) {
      updateLocalVersion();
      return;
    }

    const local = getVersionNumber(local_version);
    const remote = getVersionNumber(file);

    if (remote > local && auto_update_status === "0") {
      updateLocalVersion();
      location.reload();
    }
  });

const updateLocalVersion = () => {
  localStorage.setItem(CONFIG.LOCAL_KEY.AUTO_UPDATE_STATUS, "1");
};

const getVersionNumber = (version: string) => {
  return Number(version.replaceAll(".", ""));
};
