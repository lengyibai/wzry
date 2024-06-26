import { ref } from "vue";

import type { HelpParams } from "../interface";

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 弹窗标题 */
  title: ref(""),
  /** 弹窗内容 */
  content: ref(""),
};
const { show, title, content } = ExposeData;

/** @description 帮助弹窗内容显示 */
const useHelp = () => {
  const ExposeMethods = {
    /**
     * @description 显示帮助弹窗
     * @param 帮助信息参数
     */
    openHelp(v: HelpParams) {
      show.value = true;
      title.value = v.title;
      content.value = v.content;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useHelp };
