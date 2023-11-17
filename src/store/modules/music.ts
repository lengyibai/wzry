import { defineStore } from "pinia";
import { ref } from "vue";

import { SettingStore } from "@/store";
import { AudioVisual } from "@/utils/modules/tool";
import { $concise, $tool } from "@/utils";
import { API_DATA } from "@/api";

const { getMusicLink } = $concise;

/** @description 音乐播放器 */
const MusicStore = defineStore("music", () => {
  /** 进度条宽度设置 */
  let progress_timer: NodeJS.Timeout;
  /** 工具显示设置 */
  let tool_timer: NodeJS.Timeout;
  /** 播放器 */
  let bgm = new Audio();

  /** 音乐索引 */
  const bgmIndex = ref(0);
  /** 播放进度 */
  const progress = ref(0);
  /** 音量 */
  const volume = ref(0);
  /** 当前音乐播放状态，false:暂停 */
  const status = ref(false);
  /** 显示播放列表 */
  const show_list = ref(false);
  /** 显示工具栏 */
  const show_tool = ref(true);

  /** 音乐可视化 */
  const audio_visual = ref<AudioVisual>();
  /** 音乐列表 */
  const musics = ref<Music[]>([]);

  const initMusic = async () => {
    const data = (await API_DATA.Music()).data;

    //筛选优先级
    const prior = data.filter((item) => item.sort === 1);
    const lower = data.filter((item) => item.sort === 0);

    musics.value = [...prior, ...$tool.shuffleArray<Music>(lower)];

    //允许音频可视化跨域
    bgm.setAttribute("crossOrigin", "anonymous");
  };
  initMusic();

  /** @description 上一首 */
  const last = () => {
    //如果为第一首，则最后一首开始播放
    if (bgmIndex.value === 0) {
      bgmIndex.value = musics.value.length;
    }

    playIndex(bgmIndex.value - 1);
  };

  /**
   * @description: 播放音乐
   * @param isReset 是否播放下一首
   */
  const play = (isNext = true) => {
    if (isNext) {
      bgm.src = getMusicLink(musics.value[bgmIndex.value].url);
    }

    status.value = true;
    bgm.volume = volume.value;

    bgm
      .play()
      .then(() => {
        //播放成功后开始分析音频
        audio_visual.value?.play();
        //如果未启用音乐播放器，则暂停播放
        if (!SettingStore().config.music) {
          bgm.pause();
        }
      })
      .catch(() => {
        //播放失败后重试
        setTimeout(() => {
          play(false);
        }, 1000);
      });

    //实时设置播放进度
    progress_timer = setInterval(() => {
      progress.value = $tool.potEoPct(bgm.currentTime / bgm.duration);
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
    if (bgmIndex.value === musics.value.length) {
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
   * @param index 音乐索引号
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

  /** @description 停止播放 */
  const stop = () => {
    bgm.pause();
    bgm.currentTime = 0;
  };

  /** @description 音频可视化初始化 */
  const initAudioVisual = (canvas: HTMLCanvasElement) => {
    audio_visual.value = new $tool.AudioVisual(bgm, canvas);
  };

  /** @description 重新创建播放器，解决音乐可视化音频标签被占用问题 */
  const resetAudio = () => {
    bgm = new Audio();
    /** 允许音频可视化跨域 */
    bgm.setAttribute("crossOrigin", "anonymous");
  };

  return {
    /** 音频元素 */
    bgm,
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
    stop,
    resetAudio,
    initAudioVisual,
  };
});

export { MusicStore };
