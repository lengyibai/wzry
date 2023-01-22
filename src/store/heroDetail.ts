import { defineStore } from "pinia";
import { ref } from "vue";

import { getSkinVoice } from "@/api/main/games/voice";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue";

type SkinToggleFn = (hero_name: string, skin_name: string) => void;

const heroDetailStore = defineStore("heroDetail", () => {
  const skill_index = ref(0); //处于展示的技能索引
  const scroll_index = ref(1); //滚动索引
  const scollFns = ref<((index: number) => void)[]>([]); //滚动结束后触发函数组
  const skinToggleFns = ref<SkinToggleFn[]>([]); //皮肤切换后触发函数组
  const voice = ref<Hero.Voice[]>([]); //皮肤语音
  const skillSelectFn = ref<(index: number) => void>(() => {}); //技能选择触发
  const hero_info = ref<Hero.Data>($deepCopy(heroDefault)); //英雄信息

  /** @description: 设置英雄数据 */
  const setHeroInfo = (data: Hero.Data) => {
    hero_info.value = data;
  };

  /** @description: 设置滚动索引 */
  const setIndex = (index: number) => {
    scroll_index.value = index;

    scollFns.value.forEach((item) => {
      item(index);
    });
  };

  /** @description: 设置技能索引 */
  const setSkillIndex = (index: number) => {
    // 延迟设置是为了配合切换动画
    setTimeout(() => {
      skill_index.value = index;
    }, 500);
  };

  /** @description: 设置需要滚动触发的函数 */
  const setScollFn = (fn: (index: number) => void) => {
    scollFns.value.push(fn);
  };

  /** @description: 切换皮肤时触发 */
  const skinToggle = (hero_name: string, skin_name: string) => {
    skinToggleFns.value.forEach((item) => {
      item(hero_name, skin_name);
    });
  };

  /** @description: 设置需要切换皮肤触发的函数 */
  const setSkinToggleFn = (fn: SkinToggleFn) => {
    skinToggleFns.value.push(fn);
  };

  /** @description: 设置技能选择函数 */
  const setSkillSelectFn = (fn: () => void) => {
    skillSelectFn.value = fn;
  };

  /** @description: 技能选择触发 */
  const skillToggler = (i: number) => {
    skillSelectFn.value(i);
  };

  /** @description: 设置皮肤语音 */
  const setSkinVoice = async (hero_name: string, skin_name = "盾山") => {
    voice.value = await getSkinVoice(hero_name, skin_name);
    return Promise.resolve();
  };

  return {
    hero_info,
    scollFns,
    scroll_index,
    skill_index,
    skillSelectFn,
    skinToggleFns,
    voice,
    setHeroInfo,
    setIndex,
    setScollFn,
    setSkillIndex,
    setSkillSelectFn,
    setSkinToggleFn,
    setSkinVoice,
    skillToggler,
    skinToggle,
  };
});

export default heroDetailStore;
export type HeroDetailStore = ReturnType<typeof heroDetailStore>;
