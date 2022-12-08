import { defineStore } from "pinia";
import { HeroDetailStore } from "./interface";
import { getSkinVoice } from "@/api/main/games/voice";

const heroDetailStore = defineStore("heroDetail", {
  state: (): HeroDetailStore.State => ({
    scroll_index: 1, //滚动索引
    ScollFns: [], //滚动结束后触发函数组
    SkinToggleFns: [], //皮肤切换后触发函数组
    voice: [], //皮肤语音
    skillToggleFn: () => {}, //技能切换触发
  }),
  actions: {
    /** @description: 设置滚动索引 */
    setIndex(index: number) {
      this.scroll_index = index;
      this.ScollFns.forEach((item) => {
        item(index);
      });
    },

    /** @description: 设置需要滚动触发的函数 */
    setScollFn(fn: (index: number) => void) {
      this.ScollFns.push(fn);
    },

    /** @description: 切换皮肤时触发 */
    skinToggle(hero_name: string, skin_name: string) {
      this.SkinToggleFns.forEach((item) => {
        item(hero_name, skin_name);
      });
    },

    /** @description: 设置需要切换皮肤触发的函数 */
    setSkinToggleFn(fn: (hero_name: string, skin_name: string) => void) {
      this.SkinToggleFns.push(fn);
    },

    /** @description: 设置技能切换函数 */
    setSkillToggleFn(fn: () => void) {
      this.skillToggleFn = fn;
    },

    /** @description: 技能切换触发 */
    skillToggler() {
      this.skillToggleFn();
    },

    /** @description: 设置皮肤语音 */
    async setSkinVoice(hero_name: string, skin_name = "盾山") {
      this.voice = await getSkinVoice(hero_name, skin_name);
      return Promise.resolve();
    },
  },
});

export default heroDetailStore;
