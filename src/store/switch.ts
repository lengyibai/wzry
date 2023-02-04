import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 全局触发 */
const switchStore = defineStore("switch", () => {
  const $clickAudio = ref<Switch.ClickAudio>(() => {}); //点击音效
  const $msg = ref<Switch.Msg>(() => {}); //消息提示
  const $tip = ref<Switch.Tip>(() => {}); //小贴士提示
  const $loading = ref<Switch.Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  return {
    /** 触发音效 */
    $clickAudio,
    /** 触发消息提醒 */
    $msg,
    /** 触发小贴士 */
    $tip,
    /** 触发loading */
    $loading,
  };
});

export default switchStore;
export type SwitchStore = ReturnType<typeof switchStore>;
