import { defineStore } from "pinia";

import { $debounceInstant } from "@/utils";

/** @description 点击音效 */
const audioStore = defineStore("audio", () => {
  let sound_name = "默认"; //音效名
  let volume = 0.5; //音量
  let status = true; //启用音效

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

  /**
   * @description: play封装
   * @param name 音效名
   */
  const playAudio = (name?: string) => {
    //获取点击触发的音效名
    sound_name =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) => sound_type[item].find((item: string) => name.includes(item)))) ||
      "default";

    const audio = new Audio(); //播放器
    audio.src = `${IMGBED}/audio/${sound_name}.mp3`;
    audio.volume = volume;

    audio.play().catch(() => {
      /*  */
    });
  };

  /**
   * @description: 调用播放
   * @param name 音效名
   */
  const play = (name?: string) => {
    if (!status) return;

    if (name === "n4r4") {
      $debounceInstant(() => {
        playAudio(name);
      }, 50);
    } else {
      playAudio(name);
    }
  };

  /**
   * @description: 音量调节
   * @param v 音量：1-100
   */
  const setVolume = (v: number) => {
    volume = (v / 100) * 0.75;
  };

  /**
   * @description: 关闭音效功能
   * @param v false关闭
   */
  const setAudio = (v: boolean) => {
    status = v;
  };

  return { play, setVolume, setAudio };
});

export default audioStore;
export type AudioStore = ReturnType<typeof audioStore>;
