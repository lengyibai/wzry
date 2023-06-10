import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 全局触发 */
const controlStore = defineStore("control", () => {
  const $audioStore = ref<Control.ClickAudio>(() => {}); //点击音效

  /** @description 挂载点击音效 */
  const setAudioStore = (fn: Control.ClickAudio) => {
    $audioStore.value = fn;
  };
  return {
    /** 触发音效 */
    $audioStore,
    setAudioStore,
  };
});

export default controlStore;
export type ControlStore = ReturnType<typeof controlStore>;
