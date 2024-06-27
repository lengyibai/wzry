import { _getAudioLink } from "@/utils/concise";
import { _debounce } from "@/utils/tool";

/** 音量 */
let volume = 0.5;
/** 启用音效 */
let status = true;
/** 音效类型 */
const sound_type: Global.Audio.Key = {
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
  o7r6: "raffle",
  jo36: "raffle_obtain",
  fz02: "knapsack",
  h3w0: "store",
  bg51: "receipt",
  o3l2: "shop",
  wm14: "activate",
  jy55: "yibao",
  hy43: "back_small",
  pk92: "tv",
  //au63: "",
  //gk90: "",
  //e90x: "",
  //kj35: "",
  //zm31: "",
  //dh38: "",
};

/**
 * @description: 播放音效
 * @param name 音效随机标识
 */
const play = (name: keyof Global.Audio.Key) => {
  const audio = new Audio();
  audio.src = _getAudioLink(sound_type[name]);
  audio.volume = volume;
  audio.play().catch(() => {});
};

/** @description 部分场景可能会导致音效累积播放，需要进行防抖处理 */
const debouncePlayAudio = _debounce((name: keyof Global.Audio.Key) => {
  play(name);
}, 50);

/** @description 播放音效 */
const usePlayAudio = () => {
  const ExposeMethods = {
    /**
     * @description: 调用播放
     * @param name 音效名
     */
    playAudio(name: keyof Global.Audio.Key = "h2w0") {
      if (!status) return;

      /**
       * fz02：背包页面在保存的时候会出现栈溢出，导致音量频繁触发
       * n4r4：悬浮音效防抖处理
       * n74s、p6q3、vw31 消息提醒防抖处理
       * za86：滑动音效防抖处理
       */
      if (["fz02", "n4r4", "n74s", "p6q3", "vw31", "za86"].includes(name)) {
        debouncePlayAudio(name);
      } else {
        play(name);
      }
    },

    /**
     * @description: 音量调节
     * @param v 音量：1-100
     */
    setAudioVolume(v: number) {
      volume = (v / 100) * 0.75;
    },

    /** @description 设置音效功能开关
     * @param v 开关状态
     */
    setAudioSwitch(v: boolean) {
      status = v;
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { usePlayAudio };
