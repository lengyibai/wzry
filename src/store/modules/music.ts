import { defineStore } from "pinia";
import { ref } from "vue";

import { SettingStore } from "@/store";
import { AudioVisual } from "@/utils/modules/tool";
import { $concise, $tool } from "@/utils";
import { API_DATA } from "@/api";

const { getMusicLink } = $concise;

/** @description 音乐播放器 */
const MusicStore = defineStore("music", () => {
  /** 音量 */
  let volume = 0;
  /** 音乐可视化 */
  let audio_visual: AudioVisual;
  /** 工具显示设置 */
  let tool_timer: NodeJS.Timeout;
  /** 进度条宽度设置 */
  let progress_timer: NodeJS.Timeout;
  /** 播放器 */
  let bgm = new Audio();

  const ExposeData = {
    /** 音乐索引 */
    bgmIndex: ref(0),
    /** 播放进度 */
    progress: ref(0),
    /** 当前音乐播放状态，false:暂停 */
    status: ref(false),
    /** 显示播放列表 */
    show_list: ref(false),
    /** 显示工具栏 */
    show_tool: ref(true),
    /** 音乐列表 */
    musics: ref<Music[]>([]),
  };
  const { musics, bgmIndex, progress, status, show_list, show_tool } = ExposeData;

  //初始化音乐
  (async function initMusic() {
    const data = (await API_DATA.Music()).data;

    //筛选优先级
    const prior = data.filter((item) => item.sort === 1);
    const lower = data.filter((item) => item.sort === 0);

    musics.value = [...prior, ...$tool.shuffleArray<Music>(lower)];

    //允许音频可视化跨域
    bgm.setAttribute("crossOrigin", "anonymous");
  })();

  const ExposeMethods = {
    /**
     * @description: 播放音乐
     * @param isReset 是否播放下一首
     */
    async play(isNext = true) {
      if (isNext) {
        bgm.src = getMusicLink(musics.value[bgmIndex.value].url);
      }

      status.value = true;
      bgm.volume = volume;

      try {
        await bgm.play();
        //播放成功后开始分析音频
        audio_visual?.play();
        //如果未启用音乐播放器，则暂停播放
        if (!SettingStore().config.music) {
          bgm.pause();
        }

        //实时设置播放进度
        progress_timer = setInterval(() => {
          progress.value = $tool.potEoPct(bgm.currentTime / bgm.duration);
        }, 500);

        //播放结束后执行下一次播放
        bgm.onended = this.next;
      } catch (error) {
        //播放失败后重试
        setTimeout(() => {
          this.play(false);
        }, 1000);
      }
    },

    /** @description 上一首 */
    last() {
      //如果为第一首，则最后一首开始播放
      if (bgmIndex.value === 0) {
        bgmIndex.value = musics.value.length;
      }

      this.playIndex(bgmIndex.value - 1);
    },

    /** @description 暂停 */
    pause() {
      status.value = false;
      bgm.pause();
      clearInterval(progress_timer);
    },

    /** @description 下一首 */
    next() {
      //如果为最后一首，则下一首从第一首开始播放
      bgmIndex.value += 1;
      if (bgmIndex.value === musics.value.length) {
        bgmIndex.value = 0;
      }
      this.playIndex(bgmIndex.value);
    },

    /**
     * @description: 设置播放进度
     * @param v 0-1保留两位小数
     */
    setCurrentTime(v: number) {
      bgm.currentTime = bgm.duration * v;
    },

    /** @description 显示播放列表 */
    list() {
      show_list.value = !show_list.value;
    },

    /**
     * @description: 播放指定音乐
     * @param index 音乐索引号
     */
    playIndex(index: number) {
      progress.value = 0;
      bgmIndex.value = index;
      this.play();
    },

    /** @description 显示工具栏 */
    showTool(v: boolean) {
      clearTimeout(tool_timer);
      if (v) {
        show_tool.value = v;
      } else {
        show_list.value = v;
        tool_timer = setTimeout(() => {
          show_tool.value = v;
        }, 250);
      }
    },

    /**
     * @description: 音量调节
     * @param v 0-100
     */
    setVolume(v: number) {
      volume = (v / 100) * 0.25;
      bgm.volume = volume;
    },

    /** @description 停止播放 */
    stop() {
      bgm.pause();
      bgm.currentTime = 0;
    },

    /** @description 音频可视化初始化 */
    initAudioVisual(canvas: HTMLCanvasElement) {
      audio_visual = new $tool.AudioVisual(bgm, canvas);
    },

    /** @description 重新创建播放器，解决音乐可视化音频标签被占用问题 */
    resetAudio() {
      bgm = new Audio();
      /** 允许音频可视化跨域 */
      bgm.setAttribute("crossOrigin", "anonymous");
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { MusicStore };
