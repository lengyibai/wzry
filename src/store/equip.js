import { defineStore } from 'pinia';

export default defineStore('equip', {
  state: () => ({
    active_id: 0,
    type: '攻击',
    type_list: {
      攻击: [[], [], []],
      法术: [[], [], []],
      防御: [[], [], []],
      移动: [[], [], []],
      打野: [[], [], []],
      游走: [[], [], []],
    },
    equip_list: [],
    equip_list_column: [],
  }),
  actions: {
    /* 获取装备列表 */
    setEquipList(data) {
      this.equip_list = data;
      this.equip_list.forEach((item) => {
        this.type_list[item.type][item.level - 1].push(item);
      });
      this.setType('攻击');
    },

    /* 设置装备类型 */
    setType(type) {
      this.active_id = 0;
      this.type = type;
      this.equip_list_column = this.type_list[type];
    },

    /* 装备卡片被点击的id */
    editActive(id) {
      this.active_id = id;
    },
  },
});
