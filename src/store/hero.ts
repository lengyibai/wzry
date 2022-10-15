import { defineStore } from 'pinia';
import { Hero } from '@/interface/hero';
import { HeroState } from './interface';
import { heroDefault } from '@/interface/defaults';

export default defineStore('hero', {
  state: (): HeroState => ({
    profession: '全部',
    hero_list: [],
    filter_list: [],
    hero_info: heroDefault,
  }),
  actions: {
    /* 设置英雄列表 */
    setHeroList(data: any) {
      this.hero_list = data;
      this.setProfessional('全部');
    },

    /* 设置职业 */
    setProfessional(profession: string) {
      this.profession = profession;
      if (profession === '全部') {
        this.filter_list = this.hero_list;
      } else {
        this.filter_list = this.hero_list.filter((item: Hero) => {
          return item.profession === profession;
        });
      }
    },
  },
});
