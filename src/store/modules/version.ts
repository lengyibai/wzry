import { defineStore } from "pinia";
import { ref } from "vue";

import { API_DATA } from "@/api";
import { LOCAL_KEY } from "@/config/modules/local-key";
import { $msgTipText } from "@/config";
import { $message } from "@/utils/busTransfer";
import { _retryRequest } from "@/utils/tool";
import { useIndexedDB } from "@/hooks/modules/useIndexedDB";

const VersionStore = defineStore("version", () => {
  const { BaseData, VoiceData } = useIndexedDB();

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
      updateLog: {
        new: [],
        function: [],
        style: [],
        bug: [],
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

  /** @description 更新本地数据/文件版本
   * @param version 版本号
   * @param type 数据更新/文件更新
   */
  const updateVersion = (version: string, type: "DATA" | "DIST") => {
    if (type === "DATA") {
      localStorage.setItem(LOCAL_KEY.VERSION_DATA, version);
      local_data_version.value = version;
    } else {
      localStorage.setItem(LOCAL_KEY.VERSION_DIST, version);
      local_dist_version.value = version;
    }
  };

  const ExposeMethods = {
    /** @description 控制弹窗显示
     * @param v 弹窗显示状态
     */
    setShowLog(v: boolean) {
      show_update.value = v;
    },

    /** @description 实时获取数据版本、文件版本、更新日志 */
    getVersion() {
      return new Promise<void>((resolve, reject) => {
        _retryRequest({
          promiseFn: API_DATA.Version,
        })
          .then(async (res) => {
            let need_update = false;
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
                need_update = true;
                data_status.value = true;
                show_update.value = true;
                BaseData.clear();
                VoiceData.clear();
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
                need_update = true;
                dist_status.value = true;
                show_update.value = true;
              }
            }

            need_update ? reject("需要更新") : resolve();
          })
          .catch(() => {
            $message($msgTipText("rc53", { v: "版本文件" }), "error");
            reject("网络错误");
          });
      });
    },

    /** @description 更新并重启
     * @param reload 是否重启
     */
    updateAll(reload: boolean = false) {
      dist_status.value = false;
      data_status.value = false;
      updateVersion(remote_data_version.value, "DATA");
      updateVersion(remote_dist_version.value, "DIST");
      localStorage.setItem(LOCAL_KEY.AUTO_UPDATE_STATUS, "0");
      reload && location.reload();
    },
  };

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
      $message($msgTipText("rc53", { v: "更新日志" }), "error");
    });

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { VersionStore };
