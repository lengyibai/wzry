import { defineStore } from "pinia";
import { GlobalSwitch } from "./interface";

const switchStore = defineStore("globalSwitch", {
  state: (): GlobalSwitch.State => ({
    $clickAudio: () => {}, //点击音效
    $tip: () => {}, //消息提示
    $loading: {
      show: () => {},
      close: () => new Promise(() => {}),
    },
  }),
});

export default switchStore;
