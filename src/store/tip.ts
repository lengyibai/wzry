import { defineStore } from "pinia";
import { ref } from "vue";

const tipStore = defineStore("tip", () => {
  const tips = ref<Record<string, { text: string; noTip: boolean }>>({
    "2rb7": {
      text: "Tip开启成功",
      noTip: false,
    },
  });

  /** @description: 设置指定tip禁止再次提示 */
  const setNoTip = (name: string) => {
    tips.value[name].noTip = true;
  };
  return { tips, setNoTip };
});

export default tipStore;
export type TipStore = ReturnType<typeof tipStore>;
