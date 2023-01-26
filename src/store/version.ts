import { defineStore } from "pinia";
import { ref } from "vue";

import { Version } from "@/api/main/data";
import switchStore from "@/store/switch";
import useUpdateData from "@/hooks/useUpdateData";

const versionStore = defineStore("version", () => {
  const $switchStore = switchStore();

  const local_version = ref(""); //本地版本
  const remote_version = ref(""); //远程版本
  const local_file = ref(""); //本地文件版本
  const file_version = ref(""); //文件版本

  local_version.value = localStorage.getItem("version") || ""; //本地版本
  local_file.value = localStorage.getItem("version_file") || ""; //文件文件版本

  Version().then((res) => {
    const { main, file } = res.data;
    remote_version.value = main;
    file_version.value = file;

    //如果无本地版本，则直接更新，否则比对
    if (!local_version.value) {
      updateVersion(main);
    } else {
      const local = Number(local_version.value.replaceAll(".", ""));
      const remote = Number(main.replaceAll(".", ""));

      const test = remote - local;

      if (test > 0) {
        // 如果为旧版，则自动更新并更新本地版本
        $switchStore.$msg("正在更新版本，更新后可查看数据改动，请稍等...");
        useUpdateData().then(() => {
          updateVersion(main);
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

      if (test > 0) {
        // 如果为旧版，则自动更新并更新本地版本
        $switchStore.$tip({
          text: "当前网页已重新部署更新，点击确定将自动刷新以清除浏览器缓存。",
          btnFn: () => {
            updateFileVersion(file);
            location.reload();
          },
        });
      }
    }
  });

  /** @description: 更新本地版本 */
  const updateVersion = (v: string) => {
    localStorage.setItem("version", v);
    local_version.value = v;
  };

  /** @description: 更新文件版本 */
  const updateFileVersion = (v: string) => {
    localStorage.setItem("version_file", v);
    local_file.value = v;
  };

  return { local_version, remote_version, local_file, file_version, updateVersion };
});

export default versionStore;
export type VersionStore = ReturnType<typeof versionStore>;
