import { defineStore } from "pinia";
import _debounce from "lodash/debounce";

import { $concise } from "@/utils";

const { getAudioLink } = $concise;

/** @description 点击音效 */
const AudioStore = defineStore("audio", () => {
  /** 音量 */
  let volume = 0.5;
  /** 启用音效 */
  let status = true;
  /* 音效类型 */
  const sound_type: Record<string, string> = {
    gz76: "atlas",
    bq69: "activity",
    kj62: "btn",
    p60v: "back",
    cy87: "cancel",
    ba09: "close",
    e6b4: "confirm_dialog",
    pj83: "confirm",
    h2w0: "default",
    kh79: "delete",
    u4c5: "detail",
    h7t9: "epigraph",
    ph23: "equip",
    vw31: "error",
    d5e2: "fold",
    iv51: "hero",
    p53r: "into",
    al41: "key",
    e84n: "login",
    n74s: "message",
    le78: "mode",
    za86: "num",
    v6p0: "show",
    gz43: "skin",
    n4r4: "tab",
    rt25: "tip",
    p6q3: "warning",
  };

  /**
   * @description: 播放音效
   * @param name 音效随机标识
   */
  const playAudio = (name: string) => {
    //播放器
    const audio = new Audio();
    audio.src = getAudioLink(sound_type[name]);
    audio.volume = volume;

    audio.play().catch(() => {});
  };

  /** @description 部分场景可能会导致音效累积播放，需要进行防抖处理 */
  const debouncePlayAudio = _debounce((name: string) => {
    playAudio(name);
  }, 50);

  const ExposeMethods = {
    /**
     * @description: 调用播放
     * @param name 音效名
     */
    play(name = "h2w0") {
      if (!status) return;

      //悬浮音效防抖处理
      if (name === "n4r4") {
        debouncePlayAudio(name);
      } else {
        playAudio(name);
      }
    },

    /**
     * @description: 音量调节
     * @param v 音量：1-100
     */
    setVolume(v: number) {
      volume = (v / 100) * 0.75;
    },

    /**
     * @description: 关闭音效功能
     * @param v false关闭
     */
    setAudio(v: boolean) {
      status = v;
    },
  };

  return ExposeMethods;
});

export { AudioStore };
