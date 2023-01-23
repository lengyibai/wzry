import { defineStore } from "pinia";
import { ref } from "vue";

const tipStore = defineStore("tip", () => {
  const tips = ref<Record<string, string>>({
    "2rb7": "Tip开启成功",
  });

  const noTips = ref<Record<string, boolean>>({
    "2rb7": false,
  });

  /** @description: 设置指定tip禁止再次提示 */
  const setNoTip = (name: string) => {
    noTips.value[name] = true;
  };
  return { tips, noTips, setNoTip };
});

export default tipStore;
export type TipStore = ReturnType<typeof tipStore>;
