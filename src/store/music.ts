import { defineStore } from "pinia";
import { ref } from "vue";

import { $potEoPct } from "@/utils";

/** @description 音乐播放器 */
const musicStore = defineStore("music", () => {
  let progress_timer: Interval; //进度条宽度设置
  let tool_timer: Interval; //工具显示设置
  const bgm = new Audio(); //播放器
  const bgmIndex = ref(0); //音乐索引
  const progress = ref(0); //播放进度
  const volume = ref(0); //音量
  const status = ref(false); //当前音乐播放状态，false:暂停
  const show_list = ref(false); //显示播放列表
  const show_tool = ref(true); //显示工具栏
  const musics = [
    { name: "云宫迅音", url: "ygxy", time: "00:02:55" },
    { name: "永远的长安城", url: "cac", time: "00:02:42" },
    { name: "英雄归来", url: "yxgl", time: "00:03:03" },
    { name: "王者诸将", url: "wzzj", time: "00:03:31" },
    { name: "王者战歌", url: "wzzg", time: "00:02:41" },
    { name: "王者登陆", url: "wzdl", time: "00:03:14" },
    { name: "王者出征", url: "wzcz", time: "00:04:07" },
    { name: "王者冰刃", url: "wzbr", time: "00:04:07" },
    { name: "荣耀主题", url: "ryzt", time: "00:03:36" },
    { name: "荣耀之路", url: "ryzl", time: "00:08:06" },
    { name: "冠军杯", url: "gjb", time: "00:03:33" },
  ]; //音乐列表

  musics.sort(() => 0.5 - Math.random()); //打乱顺序

  /** @description 上一首 */
  const last = () => {
    //如果为第一首，则最后一首开始播放
    if (bgmIndex.value === 0) {
      bgmIndex.value = musics.length;
    }
    playIndex(bgmIndex.value - 1);
  };

  /**
   * @description: 播放音乐
   * @param isReset 是否播放下一首
   */
  const play = (isNext = true) => {
    if (isNext) {
      bgm.src = `${IMGBED}/music/${musics[bgmIndex.value].url}.mp3`;
    }

    status.value = true;
    bgm.volume = volume.value;

    bgm.play().catch(() => {
      setTimeout(() => {
        play(false);
      }, 1000);
    });

    //实时设置播放进度
    progress_timer = setInterval(() => {
      progress.value = $potEoPct(bgm.currentTime / bgm.duration);
    }, 500);

    //播放结束后执行下一次播放
    bgm.onended = next;
  };

  /** @description 暂停 */
  const pause = () => {
    status.value = false;
    bgm.pause();
    clearInterval(progress_timer);
  };

  /** @description 下一首 */
  const next = () => {
    //如果为最后一首，则下一首从第一首开始播放
    bgmIndex.value += 1;
    if (bgmIndex.value === musics.length) {
      bgmIndex.value = 0;
    }
    playIndex(bgmIndex.value);
  };

  /**
   * @description: 设置播放进度
   * @param v 0-1保留两位小数
   */
  const setCurrentTime = (v: number) => {
    bgm.currentTime = bgm.duration * v;
  };

  /** @description 显示播放列表 */
  const list = () => {
    show_list.value = !show_list.value;
  };

  /**
   * @description: 播放指定音乐
   * @param index 音乐音乐索引号
   */
  const playIndex = (index: number) => {
    progress.value = 0;
    bgmIndex.value = index;
    play();
  };

  /** @description 显示工具栏 */
  const showTool = (v: boolean) => {
    clearTimeout(tool_timer);
    if (v) {
      show_tool.value = v;
    } else {
      show_list.value = v;
      tool_timer = setTimeout(() => {
        show_tool.value = v;
      }, 250);
    }
  };

  /**
   * @description: 音量调节
   * @param v 0-100
   */
  const setVolume = (v: number) => {
    volume.value = (v / 100) * 0.25;
    bgm.volume = volume.value;
  };

  return {
    /** 当前音乐播放状态，false:暂停 */
    status,
    /** 音乐索引 */
    bgmIndex,
    /** 播放进度 */
    progress,
    /** 显示播放列表 */
    show_list,
    /** 显示工具栏 */
    show_tool,
    /** 音乐列表 */
    musics,
    last,
    play,
    pause,
    next,
    list,
    setCurrentTime,
    playIndex,
    showTool,
    setVolume,
  };
});

export default musicStore;
export type MusicStore = ReturnType<typeof musicStore>;
