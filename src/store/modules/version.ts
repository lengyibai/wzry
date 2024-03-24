import { defineStore } from "pinia";
import { ref } from "vue";

import { API_DATA } from "@/api";
import { LOCAL_KEY } from "@/config/modules/local-key";
import { useGetData } from "@/hooks/modules/useGetData";
import { $msgTipText } from "@/config";
import { $message } from "@/utils/busTransfer";
import { _retryRequest } from "@/utils/tool";
import { useGetAudioZip } from "@/hooks/modules/useGetAudioZip";
import { useDataFinish } from "@/hooks/modules/useDataFinish";
import { useIndexedDB } from "@/hooks/modules/useIndexedDB";
import { useGetImageZip } from "@/hooks/modules/useGetImageZip";
import { useGetBlurZip } from "@/hooks/modules/useGetBlurZip";

const VersionStore = defineStore("version", () => {
  const { BaseData, VoiceData } = useIndexedDB();

  /** 版本计时器 */
  let version_timer: NodeJS.Timeout;
  /** 是否检测过数据完整性 */
  let data_check = false;

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
    update_log: ref<Omit<Global.Version.UpdateLog, "voiceKey" | "dataKey">>({
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
  const removeUpdateKey = async (keys: string[], type: "BASE" | "VOICE") => {
    if (type === "BASE") {
      for (const key of keys) {
        await BaseData.removeItem(key);
      }
    }

    if (type === "VOICE") {
      for (const key of keys) {
        await VoiceData.removeItem(key);
      }
    }
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

      _retryRequest({
        promiseFn: API_DATA.Version,
      })
        .then(async (res) => {
          const { dataVersion, distVersion } = res.data;
          remote_data_version.value = dataVersion;
          remote_dist_version.value = distVersion;

          //如果本地没有版本，则直接写入数据版本
          if (!local_data_version.value) {
            updateVersion(dataVersion, "DATA");
          } else {
            const local = Number(local_data_version.value.replaceAll(".", ""));
            const remote = Number(dataVersion.replaceAll(".", ""));
            const compare = remote - local;

            //如果为旧版，则自动更新并更新本地版本以及请求更新日志
            if (compare > 0) {
              _retryRequest({
                promiseFn: API_DATA.UpdateLog,
              }).then(async (res) => {
                const { dataKey, voiceKey, dataLog, distLog, time, voiceLog } = res.data;

                data_status.value = true;
                update_log.value = {
                  time,
                  dataLog,
                  voiceLog,
                  distLog,
                };

                clearTimeout(version_timer);
                await removeUpdateKey(dataKey, "BASE");
                await removeUpdateKey(voiceKey, "VOICE");

                //重新获取被删除的数据
                useGetData()
                  .getData()
                  .then(() => {
                    show_update.value = true;
                  });
              });
            } else {
              //当本地有用户信息，意味着用户已经登录，不会跳转到登录页重复下载
              if (data_check || !localStorage.getItem(LOCAL_KEY.USER_DATA)) return;
              await useGetImageZip().getImage();
              await useGetAudioZip().getAudio();
              await useGetBlurZip().getBlur();
              await useGetData().getData(true);
              useDataFinish.readyDataResolve();
              data_check = true;
            }
          }

          //如果本地没有版本，则直接更新文件版本
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
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: "版本文件" }));
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

  /** 本地版本 */
  local_data_version.value = localStorage.getItem(LOCAL_KEY.VERSION_DATA) || "";
  /** 文件文件版本 */
  local_dist_version.value = localStorage.getItem(LOCAL_KEY.VERSION_DIST) || "";

  _retryRequest({
    promiseFn: API_DATA.UpdateLog,
  })
    .then((res) => {
      update_log.value = res.data;
    })
    .catch(() => {
      $message($msgTipText("rc53", { v: "更新日志" }));
    });

  watchVersion();

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { VersionStore };
