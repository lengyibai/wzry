import { defineStore } from "pinia";
import { ref } from "vue";

import { API_DATA } from "@/api";
import { useUpdateData } from "@/hooks";
import { $message } from "@/utils";
import { CONFIG } from "@/config";

const VersionStore = defineStore("version", () => {
  /** 实时更新计时器 */
  let timer: NodeJS.Timeout | undefined = undefined;
  /** 本地版本 */
  const local_version = ref("");
  /** 远程版本 */
  const remote_version = ref("");
  /** 本地文件版本 */
  const local_file = ref("");
  /** 文件版本 */
  const file_version = ref("");
  /** 显示更新公告 */
  const show_update = ref(false);
  /** 数据是否需要更新 */
  const data_status = ref(false);
  /** 文件是否需要更新 */
  const file_status = ref(false);
  /** 更新日志汇总 */
  const update_log = ref<UpdateLog>({
    data: "",
    voice: "",
    file: "",
    time: "",
  });

  /** 本地版本 */
  local_version.value = localStorage.getItem(CONFIG.LOCAL_KEY.VERSION_MAIN) || "";
  /** 文件文件版本 */
  local_file.value = localStorage.getItem(CONFIG.LOCAL_KEY.VERSION_FILE) || "";

  /** @description 更新本地版本 */
  const updateVersion = (v: string) => {
    localStorage.setItem(CONFIG.LOCAL_KEY.VERSION_MAIN, v);
    local_version.value = v;
  };

  /** @description 更新文件本地版本 */
  const updateFileVersion = (v: string) => {
    localStorage.setItem(CONFIG.LOCAL_KEY.VERSION_FILE, v);
    local_file.value = v;
  };

  /** @description 获取数据版本、文件版本、文件更新日志 */
  const watchVersion = () => {
    API_DATA.Version().then((res) => {
      const { main, file, log, time } = res.data;
      remote_version.value = main;
      file_version.value = file;
      update_log.value.file = log;
      update_log.value.time = time;

      //如果无本地版本，则直接更新，否则比对
      if (!local_version.value) {
        updateVersion(main);
      } else {
        const local = Number(local_version.value.replaceAll(".", ""));
        const remote = Number(main.replaceAll(".", ""));
        const test = remote - local;

        //如果为旧版，则自动更新并更新本地版本并返回更新改动
        if (test > 0) {
          clearInterval(timer);
          data_status.value = true;
          $message("正在更新版本，更新后可查看数据改动，请稍等...");
          useUpdateData().then((res) => {
            update_log.value = { ...update_log.value, ...res };
            show_update.value = true;
            updateVersion(remote_version.value);
          });
        }
      }

      //如果无本地文件版本，则直接更新，否则比对
      if (!local_file.value) {
        updateFileVersion(file);
      } else {
        const local = Number(local_file.value.replaceAll(".", ""));
        const remote = Number(file.replaceAll(".", ""));
        const test = remote - local;

        //如果为旧版，则自动更新并更新本地版本
        if (test > 0 && !data_status.value) {
          clearInterval(timer);
          show_update.value = true;
          file_status.value = true;
        }
      }
    });
  };

  /* 实时接收更新通知 */
  watchVersion();
  timer = setInterval(() => {
    watchVersion();
  }, 10000);

  /** @description 控制弹窗显示 */
  const setShowLog = (v: boolean) => {
    show_update.value = v;
  };

  /** @description 一键更新所有 */
  const updateAll = () => {
    updateVersion(remote_version.value);
    updateFileVersion(file_version.value);
    location.reload();
  };

  return {
    /** 显示更新公告 */
    show_update,
    /** 本地版本 */
    local_version,
    /** 数据是否需要更新 */
    data_status,
    /** 文件是否需要更新 */
    file_status,
    /** 远程版本 */
    remote_version,
    /** 本地文件版本 */
    local_file,
    /** 文件版本 */
    file_version,
    /** 更新日志汇总 */
    update_log,
    updateAll,
    setShowLog,
  };
});

export { VersionStore };
