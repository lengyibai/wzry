import { defineStore } from 'pinia';
import { GlobalSwitch } from "./interface";

const switchStore = defineStore('globalSwitch', {
  state: (): GlobalSwitch => ({
    $clickAudio: () => { },
    $loading: {
      show: () => { },
      close: () => new Promise((resolve, reject) => { }),
    },
    $tip: () => { },
  }),
});

export default switchStore;
