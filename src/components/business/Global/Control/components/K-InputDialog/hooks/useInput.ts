import { ref } from "vue";

import type { InputConfig } from "../interface";

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  content: ref(""),
  /** 接收的配置 */
  config: ref<InputConfig>({
    value: "",
    title: "",
    placeholder: "",
    confirm() {},
    close() {},
  }),
};
const { show, content, config } = ExposeData;

/** @description 弹窗输入 */
const useInput = () => {
  const ExposeMethods = {
    /** @description 显示弹窗 */
    openInput(v: InputConfig) {
      show.value = true;
      config.value = v;
      content.value = v.value || "";
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useInput };
