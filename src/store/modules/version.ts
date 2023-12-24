import { defineStore } from "pinia";
import { ref } from "vue";

import { useUpdateData } from "@/hooks";
import { $message } from "@/utils";
import { API_DATA } from "@/api";
import { LOCAL_KEY } from "@/config/modules/local-key";

const VersionStore = defineStore("version", () => {
  /** 版本计时器 */
  let version_timer: NodeJS.Timeout;

  const ExposeData = {
    /** 本地版本 */
    local_version: ref(""),
    /** 远程版本 */
    remote_version: ref(""),
    /** 本地文件版本 */
    local_file: ref(""),
    /** 文件版本 */
    file_version: ref(""),
    /** 显示更新公告 */
    show_update: ref(false),
    /** 数据是否需要更新 */
    data_status: ref(false),
    /** 文件是否需要更新 */
    file_status: ref(false),
    /** 更新日志汇总 */
    update_log: ref<UpdateLog>({
      data: "",
      voice: "",
      file: "",
      time: "",
    }),
  };
  const {
    local_version,
    remote_version,
    local_file,
    file_version,
    show_update,
    data_status,
    file_status,
    update_log,
  } = ExposeData;

  /** 本地版本 */
  local_version.value = localStorage.getItem(LOCAL_KEY.VERSION_MAIN) || "";
  /** 文件文件版本 */
  local_file.value = localStorage.getItem(LOCAL_KEY.VERSION_FILE) || "";

  /** @description 更新本地版本 */
  const updateVersion = (v: string) => {
    localStorage.setItem(LOCAL_KEY.VERSION_MAIN, v);
    local_version.value = v;
  };

  /** @description 更新文件本地版本 */
  const updateFileVersion = (v: string) => {
    localStorage.setItem(LOCAL_KEY.VERSION_FILE, v);
    local_file.value = v;
  };

  const ExposeMethods = {
    /** @description 一键更新所有 */
    updateAll() {
      updateVersion(remote_version.value);
      updateFileVersion(file_version.value);
      localStorage.setItem(LOCAL_KEY.AUTO_UPDATE_STATUS, "0");
      location.reload();
    },

    /** @description 控制弹窗显示 */
    setShowLog(v: boolean) {
      show_update.value = v;
    },

    /** @description 实时获取数据版本、文件版本、文件更新日志 */
    watchVersion() {
      clearTimeout(version_timer);
      version_timer = setTimeout(() => {
        watchVersion();
      }, 1000 * 60);

      API_DATA.Version().then((res) => {
        const { main, file, log, time } = res;
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
            clearTimeout(version_timer);
            data_status.value = true;
            $message("检测到资源更新，正在为您自动更新资源，稍后可查看数据改动，请稍等...");
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
            clearTimeout(version_timer);
            show_update.value = true;
            file_status.value = true;
          }
        }
      });
    },
  };
  const { watchVersion } = ExposeMethods;

  watchVersion();

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { VersionStore };
