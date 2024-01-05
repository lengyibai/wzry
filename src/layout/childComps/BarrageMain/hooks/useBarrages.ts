import { onScopeDispose, ref } from "vue";

import { BarragesGenerate } from "../helper/BarragesGenerate";

import { $tool } from "@/utils";
import { BarrageStore } from "@/store/modules/barrage";
import { GAME_HERO } from "@/api";

/** @description 弹幕辅助生成 */
const useBarrages = () => {
  const $barrageStore = BarrageStore();

  const audioPlay = new $tool.AudioPlayer({
    volume: 0.35,
  });
  let barragesMove: BarragesGenerate;

  const ExposeData = {
    /** 是否显示信息卡片 */
    show_card: ref(false),
    /** 当前点击的弹幕信息 */
    barrage_info: ref<{
      /** 语音文字 */
      voiceText: string;
      /** 英雄名 */
      heroName: string;
      /** 英雄头像 */
      avatar: string;
      /** 皮肤名 */
      skinName: string;
      /** 皮肤模糊海报 */
      skinBlurPoster: string;
      /** 皮肤海报 */
      skinPoster: string;
      /** 海报大图 */
      skinBigPoster: string;
    }>(),
  };
  const { show_card, barrage_info } = ExposeData;

  const ExposeMethods = {
    /** @description 初始化 */
    init(data: Global.Barrage[], parent: HTMLElement, card: HTMLElement) {
      barragesMove?.destruction();

      barragesMove = new BarragesGenerate(parent, data, {
        click(v, e) {
          const {
            skinName,
            heroId,
            link,
            text: voiceText,
            self,
            name,
            desc,
            avatar,
            link_big,
            link_small,
            link_blur,
          } = v;
          barrage_info.value = undefined;
          show_card.value = true;

          //播放语音
          audioPlay.play(link);

          if (self) {
            barrage_info.value = {
              voiceText,
              heroName: name!,
              avatar: avatar!,
              skinName: desc!,
              skinBlurPoster: link_blur!,
              skinPoster: link_small!,
              skinBigPoster: link_big!,
            };
          } else {
            const hero = GAME_HERO.getHeroDetail(heroId);
            const skin = GAME_HERO.getSkinDetail(heroId, skinName);
            barrage_info.value = {
              voiceText,
              heroName: hero.name,
              avatar: hero.avatar,
              skinName,
              skinBlurPoster: skin?.posterBlur || hero.posterBlur,
              skinPoster: skin?.cover || hero.poster,
              skinBigPoster: skin?.posterBig || hero.posterBig,
            };
          }

          new Image().src = barrage_info.value.skinBlurPoster;

          //设置信息弹窗坐标
          if (!card) return;

          card.style.left = `calc(${e.clientX}px - ${card.offsetWidth / 2}px)`;
          card.style.top = `calc(${e.clientY}px + 1.5rem)`;

          setTimeout(() => {
            if (card.offsetLeft < 0) {
              card.style.left = "0";
            }

            if (card.offsetLeft + card.offsetWidth > window.innerWidth) {
              card.style.left = `${window.innerWidth - card.offsetWidth}px`;
            }
          }, 250);
        },
        finish: () => {
          $barrageStore.getBarrages();
        },
      });
    },
  };

  onScopeDispose(() => {
    barragesMove?.destruction();
  });

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useBarrages };
