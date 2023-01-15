import { defineStore } from "pinia";
import { ref } from "vue";

interface Loading {
  show: (text?: string) => void;
  close: () => Promise<void>;
}
const switchStore = defineStore("globalSwitch", () => {
  const $clickAudio = ref<(name?: string) => void>(() => {}); //点击音效
  const $msg = ref<(text: string, type?: MsgType) => void>(() => {}); //消息提示
  const $tip = ref<(name: string, align?: TipType) => void>(() => {}); //小贴士提示
  const $loading = ref<Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  return {
    $clickAudio,
    $msg,
    $tip,
    $loading,
  };
});

export default switchStore;
