import { defineStore } from "pinia";
import { ref } from "vue";

type msgType = "info" | "warning" | "error";
interface Loading {
  show: (text?: string) => void;
  close: () => Promise<void>;
}
const switchStore = defineStore("globalSwitch", () => {
  const $clickAudio = ref<(name?: string) => void>(() => {}); //点击音效
  const $msg = ref<(text: string, type?: msgType) => void>(() => {}); //消息提示
  const $loading = ref<Loading>({
    show: () => {},
    close: () => new Promise(() => {}),
  }); //loading

  return {
    $clickAudio,
    $msg,
    $loading,
  };
});

export default switchStore;
