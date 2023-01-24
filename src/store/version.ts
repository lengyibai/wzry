import { defineStore } from "pinia";
import { ref } from "vue";

import { Version } from "@/api/main/data";
import switchStore from "@/store/switch";
import useUpdateData from "@/hooks/useUpdateData";

const versionStore = defineStore("version", () => {
  const $switchStore = switchStore();

  const local_version = ref(""); //本地版本
  const remote_version = ref(""); //远程版本

  local_version.value = localStorage.getItem("version") || ""; //本地版本

  Version().then((res) => {
    remote_version.value = res.data;

    //如果无本地版本，则直接更新,否则比对
    if (!local_version.value) {
      local_version.value = res.data;
      updateVersion(res.data);
    } else {
      const local = Number(local_version.value.replaceAll(".", ""));
      const remote = Number(res.data.replaceAll(".", ""));

      const test = remote - local;

      if (test > 0) {
        // 如果为旧版，则自动更新并更新本地版本
        useUpdateData().then(() => {
          updateVersion(res.data);
        });
      } else {
        $switchStore.$msg("当前版本已是最新版，请放心使用！");
      }
    }
  });

  /** @description: 更新版本 */
  const updateVersion = (v: string) => {
    localStorage.setItem("version", v);
    local_version.value = v;
  };

  return { local_version, remote_version, updateVersion };
});

export default versionStore;
export type VersionStore = ReturnType<typeof versionStore>;
