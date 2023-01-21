import { defineStore } from "pinia";
import { ref } from "vue";

import { $debounceInstant } from "@/utils";

const audioStore = defineStore("audio", () => {
  const sound_name = ref("默认"); //音效名
  const volume = ref(0.5); //音量
  const status = ref(true); //启用音效

  /* 音效类型 */
  const sound_type: Record<string, string[]> = {
    activity: ["bq69"],
    back: ["p60v"],
    cancel: ["45iy"],
    close: ["6xc6"],
    confirm_dialog: ["e6b4"],
    confirm: ["36jn"],
    default: ["h2w0"],
    delete: ["3dn3"],
    detail: ["u4c5"],
    epigraph: ["h7t9"],
    equip: ["3k4s"],
    error: ["vw31"],
    fold: ["d5e2"],
    hero: ["4d8m"],
    into: ["p53r"],
    key: ["5zv8"],
    login: ["e84n"],
    message: ["n74s"],
    mode: ["le78"],
    num: ["range"],
    show: ["0o5c"],
    skin: ["9u8z"],
    tab: ["n4r4"],
    tip: ["rt25"],
    warning: ["16vy"],
  };

  /** @description: play封装 */
  const playAudio = (name?: string) => {
    //获取点击触发的音效名
    sound_name.value =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) =>
          sound_type[item].find((item: string) => name.includes(item))
        )) ||
      "default";

    const audio = new Audio(); //播放器
    audio.src = `${IMGBED}/audio/${sound_name.value}.mp3`;
    audio.volume = volume.value;

    audio.play().catch(() => {
      /*  */
    });
  };

  /** @description: 播放指定音效 */
  const play = (name?: string) => {
    if (!status.value) return;

    if (name === "n4r4") {
      $debounceInstant(() => {
        playAudio(name);
      }, 25);
    } else {
      playAudio(name);
    }
  };

  /** @description: 音量调节 */
  const setVolume = (v: number) => {
    volume.value = v / 100;
  };

  /** @description: 关闭音效功能 */
  const setAudio = (v: boolean) => {
    status.value = v;
  };

  return { play, setVolume, setAudio };
});

export default audioStore;
export type AudioStore = ReturnType<typeof audioStore>;
