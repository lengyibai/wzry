import { defineStore } from 'pinia';
import { Equip } from '@/interface/equip'
import { EquipState } from './interface'
import switchStore from '@/store/globalSwitch.js';
import { getEquip } from '@/api/main/game/index.js';

const $switchStore = switchStore();
export default defineStore('equip', {
  state: (): EquipState => ({
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
    getEquipList() {
      return new Promise((resolve) => {
        $switchStore.$loading.show('正在请求装备列表');
        getEquip().then(async (res) => {
          await $switchStore.$loading.close();
          this.setEquipList(res.data);
          resolve(res);
        });
      });
    },
    /* 获取装备列表 */
    setEquipList(data: Equip[]) {
      this.equip_list = data;
      this.equip_list.forEach((item: Equip) => {
        this.type_list[item.type][item.level - 1].push(item);
      });
      this.setType('攻击');
    },

    /* 设置装备类型 */
    setType(type: string) {
      this.active_id = 0;
      this.type = type;
      this.equip_list_column = this.type_list[type];
    },

    /* 装备卡片被点击的id */
    editActive(id: number) {
      this.active_id = id;
    },
  },
});
