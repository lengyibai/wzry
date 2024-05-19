import { defineStore } from "pinia";
import { ref } from "vue";

import { SettingStore } from "@/store";
import { API_DATA } from "@/api";
import { $message } from "@/utils/busTransfer";
import { _getMusicLink } from "@/utils/concise";
import {
  _shuffleArray,
  _potEoPct,
  _AudioVisual,
  _loadAndRetryAudio,
  _retryRequest,
} from "@/utils/tool";
import { $msgTipText } from "@/config/modules/message-tip";

/** @description 音乐播放器 */
const MusicStore = defineStore("music", () => {
  /** 音量 */
  let volume = 0;
  /** 音乐可视化 */
  let audio_visual: _AudioVisual;
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
    /** 音乐列表 */
    musics: ref<Global.Music[]>([]),
  };
  const { musics, bgmIndex, progress, status, show_list } = ExposeData;

  //初始化音乐
  _retryRequest({
    promiseFn: API_DATA.Music,
  })
    .then((res) => {
      musics.value = _shuffleArray<Global.Music>(res.data);

      //允许音频可视化跨域
      bgm.setAttribute("crossOrigin", "anonymous");
    })
    .catch(() => {
      $message($msgTipText("rc53", { v: "音乐列表" }), "error");
    });

  const ExposeMethods = {
    /**
     * @description: 播放音乐
     * @param isReset 是否播放下一首
     */
    async play(isNext = true) {
      const link = _getMusicLink(musics.value[bgmIndex.value].url);
      if (isNext || !bgm.src) {
        await _loadAndRetryAudio(link)
          .then(() => {
            bgm.src = link;
          })
          .catch(() => {
            $message("音乐加载失败，已切换下一首", "error");
            this.next();
          });
      }

      //已缓冲完毕
      if (bgm.readyState === 4) {
        status.value = true;
        bgm.play();
      }

      //需要等待音乐缓冲完毕后播放
      bgm.oncanplaythrough = async () => {
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
            progress.value = _potEoPct(bgm.currentTime / bgm.duration);
          }, 500);

          //播放结束后执行下一次播放
          bgm.onended = this.next;
        } catch (error) {
          //播放失败后重试
          setTimeout(() => {
            this.play(false);
          }, 1000);
        }
      };
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

    /** @description 音频可视化初始化
     * @param canvas 音频可视化画布
     */
    initAudioVisual(canvas: HTMLCanvasElement) {
      audio_visual = new _AudioVisual(bgm, canvas);
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
