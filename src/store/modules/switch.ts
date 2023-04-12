import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 全局触发 */
const switchStore = defineStore("switch", () => {
  const $audioStore = ref<Switch.ClickAudio>(() => {}); //点击音效
  const $msg = ref<Switch.Msg>(() => {}); //消息提示
  const $tip = ref<Switch.Tip>(() => {}); //小贴士提示
  const $loading = ref<Switch.Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  /** @description 挂载点击音效 */
  const setAudioStore = (fn: Switch.ClickAudio) => {
    $audioStore.value = fn;
  };

  /** @description 挂载消息提醒 */
  const setMsg = (fn: Switch.Msg) => {
    $msg.value = fn;
  };

  /** @description 挂载小贴士 */
  const setTip = (fn: Switch.Tip) => {
    $tip.value = fn;
  };

  /** @description 挂载loading */
  const setLoading = (fn: Switch.Loading) => {
    $loading.value = fn;
  };

  return {
    /** 触发音效 */
    $audioStore,
    /** 触发消息提醒 */
    $msg,
    /** 触发小贴士 */
    $tip,
    /** 触发loading */
    $loading,
    setAudioStore,
    setMsg,
    setTip,
    setLoading,
  };
});

export default switchStore;
export type SwitchStore = ReturnType<typeof switchStore>;
