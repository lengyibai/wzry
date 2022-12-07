import { defineStore } from "pinia";
import { HeroDetailStore } from "./interface";

const heroDetailStore = defineStore("heroDetail", {
  state: (): HeroDetailStore.State => ({
    scroll_index: 1, //滚动索引
    ScollFns: [], //滚动结束后触发函数组
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

    /** @description: 设置技能切换函数 */
    setSkillToggleFn(fn: () => void) {
      this.skillToggleFn = fn;
    },

    /** @description: 技能切换触发 */
    skillToggler() {
      this.skillToggleFn();
    },
  },
});

export default heroDetailStore;
