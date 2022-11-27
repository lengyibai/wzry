import { defineStore } from "pinia";
import { EquipStore } from "./interface";
import { getEquip } from "@/api/main/games/equip";

export default defineStore("equip", {
  state: (): EquipStore.State => ({
    active_id: 0, //当前被点击的装备id
    type: "攻击", //列表装备类型显示
    type_list: {
      攻击: [[], [], []],
      法术: [[], [], []],
      防御: [[], [], []],
      移动: [[], [], []],
      打野: [[], [], []],
      游走: [[], [], []],
    },
    equip_list: [], //装备列表
    equip_list_column: [], //三列装备
  }),
  actions: {
    /** @description: 获取装备列表 */
    getEquipList() {
      return new Promise((resolve) => {
        getEquip().then((res) => {
          this.setEquipList(res);
          resolve(null);
        });
      });
    },

    /** @description: 设置装备列表 */
    setEquipList(data: Equip.Data[]) {
      this.equip_list = data;
      this.equip_list.forEach((item: Equip.Data) => {
        this.type_list[item.type][item.level - 1].push(item);
      });
      this.setType("攻击");
    },

    /** @description: 设置装备类型 */
    setType(type: string) {
      this.active_id = 0;
      this.type = type;
      this.equip_list_column = this.type_list[type];
    },

    /** @description: 装备卡片被点击的id */
    editActive(id: number | undefined): void {
      this.active_id = id || 0;
    },
  },
});
