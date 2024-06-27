import { ref } from "vue";

import { GAME_HERO } from "@/api";
import { HeroDetailStore } from "@/store";
import { _AudioPlayer } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

/** 音频播放器 */
const audioPlayer = new _AudioPlayer({
  volume: 0.25,
});

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 英雄信息 */
  hero_data: ref<Game.Hero.Detail>(),
  /** 显示滚动索引组件 */
  show_progress: ref(false),
  /** 显示左上角关闭 */
  show_close: ref(false),
};
const { show, show_progress, show_close, hero_data } = ExposeData;

/** @description 查看英雄详情 */
const useHeroDetail = () => {
  const $heroDetailStore = HeroDetailStore();

  const { playAudio } = usePlayAudio();

  const ExposeMethods = {
    /** @description 显示弹窗 */
    async openHeroDetail(id?: number) {
      //如果不传值则关闭
      if (!id) {
        show.value = false;
        return;
      }

      const voice = (await GAME_HERO.getSkinVoice(id, "原版皮肤")).voice;
      voice && audioPlayer.play(voice[0].link);

      const hero = await GAME_HERO.getHeroDetail(id);
      $heroDetailStore.setHeroInfo(hero);
      hero_data.value = hero;
      show.value = true;
      playAudio("u4c5");
      //延迟显示滚动索引
      setTimeout(() => {
        show_progress.value = true;
        show_close.value = true;
        hero_data.value!.skins?.forEach((item) => {
          /** 海报预加载 */
          new Image().src = item.poster;
        });
      }, 1500);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useHeroDetail };
