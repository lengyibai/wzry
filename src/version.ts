import axios from "axios";
import dayjs from "dayjs";

import { CONFIG } from "@/config";

const local_version = localStorage.getItem(CONFIG.LOCAL_KEY.VERSION_MAIN) || "";

axios
  .get(`${location.origin}/json/version.json?t=${dayjs().unix()}`)
  .then((res) => {
    const { file } = res.data;

    //如果本地没有版本信息，则直接写入
    if (!local_version) {
      updateLocalVersion(file);
      return;
    }

    const local = getVersionNumber(local_version);
    const remote = getVersionNumber(file);

    if (remote > local) {
      updateLocalVersion(file);
      location.reload();
    }
  });

const updateLocalVersion = (file: string) => {
  localStorage.setItem(CONFIG.LOCAL_KEY.READ_STATUS, "0");
  localStorage.setItem(CONFIG.LOCAL_KEY.VERSION_MAIN, file);
};

const getVersionNumber = (version: string) => {
  return Number(version.replaceAll(".", ""));
};
