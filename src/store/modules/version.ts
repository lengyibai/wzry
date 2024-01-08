import { defineStore } from "pinia";
import { ref } from "vue";

import { API_DATA } from "@/api";
import { LOCAL_KEY } from "@/config/modules/local-key";
import { useGetData } from "@/hooks/modules/useGetData";

const VersionStore = defineStore("version", () => {
  /** 版本计时器 */
  let version_timer: NodeJS.Timeout;

  const ExposeData = {
    /** 本地数据版本 */
    local_data_version: ref(""),
    /** 远程数据版本 */
    remote_data_version: ref(""),
    /** 本地文件版本 */
    local_dist_version: ref(""),
    /** 文件版本 */
    remote_dist_version: ref(""),
    /** 显示更新公告 */
    show_update: ref(false),
    /** 数据是否需要更新 */
    data_status: ref(false),
    /** 文件是否需要更新 */
    dist_status: ref(false),
    /** 更新日志汇总 */
    update_log: ref<Global.Version.UpdateLog>({
      time: "",
      dataLog: [],
      voiceLog: [],
      distLog: {
        surface: {
          new: [],
          function: [],
          style: [],
          bug: [],
        },
        substrate: [],
      },
    }),
  };
  const {
    local_data_version,
    remote_data_version,
    local_dist_version,
    remote_dist_version,
    show_update,
    data_status,
    dist_status,
    update_log,
  } = ExposeData;

  /** 本地版本 */
  local_data_version.value = localStorage.getItem(LOCAL_KEY.VERSION_DATA) || "";
  /** 文件文件版本 */
  local_dist_version.value = localStorage.getItem(LOCAL_KEY.VERSION_DIST) || "";

  /** @description 更新本地数据/文件版本 */
  const updateVersion = (v: string, type: "DATA" | "DIST") => {
    if (type === "DATA") {
      localStorage.setItem(LOCAL_KEY.VERSION_DATA, v);
      local_data_version.value = v;
    } else {
      localStorage.setItem(LOCAL_KEY.VERSION_DIST, v);
      local_dist_version.value = v;
    }
  };

  /** @description 用于删除本地存储要更新的key */
  const removeUpdateKey = (keys: string[]) => {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const ExposeMethods = {
    /** @description 控制弹窗显示 */
    setShowLog(v: boolean) {
      show_update.value = v;
    },

    /** @description 实时获取数据版本、文件版本、更新日志 */
    watchVersion() {
      clearTimeout(version_timer);
      version_timer = setTimeout(() => {
        watchVersion();
      }, 1000 * 60);

      API_DATA.Version().then((res) => {
        const { dataVersion, distVersion, dataKey, voiceKey, dataLog, distLog, time, voiceLog } =
          res.data;
        remote_data_version.value = dataVersion;
        remote_dist_version.value = distVersion;
        update_log.value = {
          time,
          dataLog,
          voiceLog,
          distLog,
        };

        /* 数据更新 */
        if (!local_data_version.value) {
          updateVersion(dataVersion, "DATA");
        } else {
          const local = Number(local_data_version.value.replaceAll(".", ""));
          const remote = Number(dataVersion.replaceAll(".", ""));
          const compare = remote - local;

          //如果为旧版，则自动更新并更新本地版本并返回更新改动
          if (compare > 0) {
            clearTimeout(version_timer);
            data_status.value = true;
            removeUpdateKey([...dataKey, ...voiceKey]);

            useGetData()
              .getData()
              .then(() => {
                show_update.value = true;
              });
          }
        }

        /* 文件更新 */
        if (!local_dist_version.value) {
          updateVersion(distVersion, "DIST");
        } else {
          const local = Number(local_dist_version.value.replaceAll(".", ""));
          const remote = Number(distVersion.replaceAll(".", ""));
          const compare = remote - local;

          //如果为旧版，则自动更新并更新本地版本
          if (compare > 0) {
            clearTimeout(version_timer);
            show_update.value = true;
            dist_status.value = true;
          }
        }
      });
    },

    /** @description 更新并重启 */
    updateAll() {
      updateVersion(remote_data_version.value, "DATA");
      updateVersion(remote_dist_version.value, "DIST");
      localStorage.setItem(LOCAL_KEY.AUTO_UPDATE_STATUS, "0");
      location.reload();
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
