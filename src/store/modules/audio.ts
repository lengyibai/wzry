import { defineStore } from "pinia";
import _ from "lodash";

import { CONFIG } from "@/config";

/** @description 点击音效 */
const AudioStore = defineStore("audio", () => {
  /** 音效名 */
  let sound_name = "默认";
  /** 音量 */
  let volume = 0.5;
  /** 启用音效 */
  let status = true;

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
   * @description: 播放音效
   * @param name 音效随机标识
   */
  const playAudio = (name?: string) => {
    //获取点击触发的音效名
    sound_name =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) =>
          sound_type[item].find((item: string) => name.includes(item)),
        )) ||
      "default";

    //播放器
    const audio = new Audio();
    audio.src = `${CONFIG.BASE.IMGBED}/audio/${sound_name}.mp3`;
    audio.volume = volume;

    audio.play().catch(() => {});
  };

  const debouncePlayAudio = _.debounce((name: string) => {
    playAudio(name);
  }, 50);
  /**
   * @description: 调用播放
   * @param name 音效名
   */
  const play = (name?: string) => {
    if (!status) return;

    //悬浮音效防抖处理
    if (name === "n4r4") {
      debouncePlayAudio(name);
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

export { AudioStore };
