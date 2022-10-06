import { defineStore } from 'pinia';

const switchStore = defineStore('globalSwitch', {
  state: () => ({
    $clickAudio: null,
    $loading: null,
    $tip: null,
  }),
});

export default switchStore;
