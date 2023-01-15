import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("tip", () => {
  const tips = ref<Record<string, { text: string; noTip: boolean }>>({
    a: {
      text: "欢迎来到王者荣耀！",
      noTip: false,
    },
  });

  /** @description: 设置指定tip禁止再次提示 */
  const setNoTip = (name: string) => {
    tips.value[name].noTip = true;
  };
  return { tips, setNoTip };
});

export default switchStore;
