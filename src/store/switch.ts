import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("switch", () => {
  const $clickAudio = ref<Switch.ClickAudio>(() => {}); //点击音效
  const $msg = ref<Switch.Msg>(() => {}); //消息提示
  const $tip = ref<Switch.Tip>(() => {}); //小贴士提示
  const $loading = ref<Switch.Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  /** @description: 设置触发函数 */
  const setTriggerFn = (v: {
    clickAudio: Switch.ClickAudio;
    msg: Switch.Msg;
    tip: Switch.Tip;
    loading: Switch.Loading;
  }) => {
    $clickAudio.value = v.clickAudio;
    $msg.value = v.msg;
    $tip.value = v.tip;
    $loading.value = v.loading;
  };

  return {
    $clickAudio,
    $msg,
    $tip,
    $loading,
    setTriggerFn,
  };
});

export default switchStore;
export type SwitchStore = ReturnType<typeof switchStore>;
