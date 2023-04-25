import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 全局触发 */
const controlStore = defineStore("control", () => {
  const $audioStore = ref<Control.ClickAudio>(() => {}); //点击音效
  const $msg = ref<Control.Msg>(() => {}); //消息提示
  const $tip = ref<Control.Tip>(() => {}); //小贴士提示
  const $loading = ref<Control.Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  /** @description 挂载点击音效 */
  const setAudioStore = (fn: Control.ClickAudio) => {
    $audioStore.value = fn;
  };

  /** @description 挂载消息提醒 */
  const setMsg = (fn: Control.Msg) => {
    $msg.value = fn;
  };

  /** @description 挂载小贴士 */
  const setTip = (fn: Control.Tip) => {
    $tip.value = fn;
  };

  /** @description 挂载loading */
  const setLoading = (fn: Control.Loading) => {
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

export default controlStore;
export type ControlStore = ReturnType<typeof controlStore>;
