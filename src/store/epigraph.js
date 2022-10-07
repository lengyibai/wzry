import { defineStore } from 'pinia';

export default defineStore('epigraph', {
  state: () => ({
    type: '全部',
    epigraph_list: [],
    filter_list: [],
  }),
  actions: {
    /* 设置英雄列表 */
    setEpigraphList(data) {
      this.epigraph_list = data;
      this.setFilter('全部');
    },

    /* 筛选显示 */
    setFilter(type) {
      this.type = type;
      if (type === '全部') {
        this.filter_list = this.epigraph_list;
      } else {
        this.filter_list = this.epigraph_list.filter((item) => {
          return item.type === type;
        });
      }
    },
  },
});
