import { defineStore } from 'pinia';

export default defineStore('hero', {
  state: () => ({
    profession: '全部',
    hero_list: [],
    filter_list: [],
    hero_info: {},
  }),
  actions: {
    /* 设置英雄列表 */
    setHeroList(data) {
      this.hero_list = data;
      this.setProfessional('全部');
    },

    /* 设置职业 */
    setProfessional(profession) {
      this.profession = profession;
      if (profession === '全部') {
        this.filter_list = this.hero_list;
      } else {
        this.filter_list = this.hero_list.filter((item) => {
          return item.profession === profession;
        });
      }
    },
  },
});
