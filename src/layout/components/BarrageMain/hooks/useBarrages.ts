import { onScopeDispose, ref } from "vue";

import { BarragesGenerate } from "../helper/BarragesGenerate";

import { GAME_HERO, KVP_HERO, LOCAL_HERO } from "@/api";
import { _AudioPlayer, _random } from "@/utils/tool";

/** 启用弹幕 */
const status = ref(false);
/** 弹幕组 */
const barrages = ref<Global.Barrage[]>([]);

/** @description 弹幕辅助生成 */
const useBarrages = () => {
  const audioPlay = new _AudioPlayer({
    volume: 0.35,
  });
  let barragesMove: BarragesGenerate;

  const ExposeData = {
    /** 启用弹幕 */
    status,
    /** 弹幕组 */
    barrages,
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
    /** @description: 设置是否启用弹幕 */
    setBarrage(v: boolean) {
      status.value = v;
    },

    /** @description 初始化 */
    init(data: Global.Barrage[], parent: HTMLElement, card: HTMLElement) {
      const _this = this;
      //由于弹幕消耗完毕后，会重新填充并调用当前方法，所以如果存在实例，直接重启弹幕即可
      if (barragesMove) {
        barragesMove.restart(data);
        return;
      }
      barragesMove = new BarragesGenerate(parent, data, {
        async click(v, e) {
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
            const hero = await GAME_HERO.getHeroDetail(heroId);
            const skin = await GAME_HERO.getSkinDetail(heroId, skinName);
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

          if (!card) return;

          //设置信息弹窗坐标
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
        finish() {
          _this.getBarrages();
        },
      });
    },

    /** @description 获取/刷新弹幕 */
    async getBarrages() {
      const hero_names = await LOCAL_HERO.getHeroNameList();
      const hero_gender = await KVP_HERO.getHeroGenderKvp();
      const hero_voices = await KVP_HERO.getSkinVoiceListKvp();
      const data: Global.Barrage[] = [];

      hero_names.forEach((heroName) => {
        if (!["梦奇", "盾山"].includes(heroName.value)) {
          hero_voices[heroName.id].forEach((skins) => {
            //获取随机位置的语音
            const voice_index = _random(0, skins.voice.length - 1);

            data.push({
              heroId: heroName.id,
              skinName: skins.name,
              text: skins.voice[voice_index].text,
              link: skins.voice[voice_index].link,
              gender: hero_gender[heroName.id],
            });
          });
        }
      });

      barrages.value = data;
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
