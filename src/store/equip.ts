import { defineStore } from "pinia";
import { EquipStore } from "./interface";
import { getEquip } from "@/api/main/games/equip";
import { getEquipSynthetic } from "@/api/main/games/equipSynthetic";

export default defineStore("equip", {
  state: (): EquipStore.State => ({
    type: "攻击", //列表装备类型显示
    active_id: 0, //当前被点击的装备id
    synthetic: { id: 0 }, //当前点击的装备合成
    synthetic_id: [[], [], []], //当前点击的装备合成相关id
    synthetic_element: [[], [], []], //当前点击的装备合成相关元素
    equip_list: [], //装备列表
    equip_list_column: [], //三列装备
    active_array: [], //当前被点击装备排列位置
    equip_element: [], //装备列表的所有元素
    equipSelectFn: [], //点击装备触发的函数
    vertical_line: [{}, { top: "0", height: "0" }, { top: "0", height: "0" }], //二三列的竖线

    type_list: {
      攻击: [[], [], []],
      法术: [[], [], []],
      防御: [[], [], []],
      移动: [[], [], []],
      打野: [[], [], []],
      游走: [[], [], []],
    },
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

    /** @description: 存储列表所有装备元素 */
    setEquipElement(data: { name: string; el: HTMLElement | undefined; id: number }) {
      this.equip_element.push(data);
    },

    /** @description: 设置装备类型 */
    setType(type: string) {
      this.active_id = 0;
      this.type = type;
      this.equip_list_column = this.type_list[type];
    },

    /** @description: 设置需要点击装备触发的函数 */
    setSelectFn(fn: () => void) {
      this.equipSelectFn.push(fn);
    },

    /** @description: 装备卡片被点击的id */
    editActive(id = 0): void {
      this.vertical_line = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
      if (this.active_id === id) {
        this.active_id = 0;
        this.clearSynthetic();
        return;
      }
      this.active_id = id;
      getEquipSynthetic(id).then((res) => {
        if (res) {
          this.active_array = res.id.toString().split("") || [];
          this.synthetic = res;
          this.addSynthetic();
        }
      });
    },

    /** @description: 添加合成组 */
    async addSynthetic() {
      const data = this.synthetic;
      /* 当点击的是第一列 */
      if (this.active_array[1] === "1") {
        this.synthetic_id[0] = [this.active_id];
        this.synthetic_id[1] = data.synthetic!.to;
        for (let i = 0; i < this.synthetic_id[1].length; i++) {
          const item = this.synthetic_id[1][i];
          const res = await getEquipSynthetic(item);
          if (res) {
            this.synthetic_id[2] = res.synthetic!.to;
          }
        }

        for (let i = 0; i < this.equip_element.length; i++) {
          const equip = this.equip_element[i];
          for (let j = 0; j < this.synthetic_id.length; j++) {
            const ids = this.synthetic_id[j];
            for (let k = 0; k < ids.length; k++) {
              const id = ids[k];
              if (equip.id === id) {
                this.synthetic_element[j][k] = equip;
                const res = await getEquipSynthetic(equip.id);
                if (res) {
                  this.synthetic_element[j][k].to = res.synthetic?.to;
                }
              }
            }
          }
        }

        const num = (id: number) => {
          return Number(id.toString().slice(2));
        };

        this.vertical_line[1] = {
          top: (num(this.active_id) - 1) * 115 + "px",
          height: Math.abs(num(this.active_id) - num(this.synthetic_element[1].at(-1)!.id)) * 115 + "px",
        };
        this.vertical_line[2] = {
          top: (num(this.synthetic_element[1][0].id) - 1) * 115 + "px",
          height:
            (Math.abs(num(this.synthetic_element[1][0].id) - num(this.synthetic_element[2].at(-1)!.id)) + 1) * 115 +
            "px",
        };
      }

      /* 当点击的是第二列 */
      if (this.active_array[1] === "2") {
        this.synthetic_id[0] = data.need?.main || [];
        this.synthetic_id[1] = [this.active_id];
        this.synthetic_id[2] = data.synthetic!.to;

        for (let i = 0; i < this.synthetic_id[1].length; i++) {
          const item = this.synthetic_id[1][i];
          const res = await getEquipSynthetic(item);
          if (res) {
            this.synthetic_id[2] = res.synthetic!.to;
          }
        }

        this.synthetic_element[0] = this.synthetic_element[0].filter((item) => {
          return this.synthetic_id[0].includes(item.id);
        });
        this.synthetic_element[1] = this.synthetic_element[1].filter((item) => {
          return item.id === this.active_id;
        });
        for (let i = 0; i < this.equip_element.length; i++) {
          const equip = this.equip_element[i];
          for (let j = 0; j < this.synthetic_id.length; j++) {
            const ids = this.synthetic_id[j];
            for (let k = 0; k < ids.length; k++) {
              const id = ids[k];
              if (equip.id === id) {
                this.synthetic_element[j][k] = equip;
                const res = await getEquipSynthetic(equip.id);
                if (res) {
                  this.synthetic_element[j][k].to = res.synthetic?.to;
                }
              }
            }
          }
        }

        const num = (id: number) => {
          return Number(id.toString().slice(2));
        };

        this.vertical_line[1] = {
          top: (num(this.active_id) - 1) * 115 + "px",
          height: Math.abs(num(this.active_id) - num(this.synthetic_element[1].at(-1)!.id)) * 115 + "px",
        };
        this.vertical_line[2] = {
          top: (num(this.synthetic_element[1][0].id) - 1) * 115 + "px",
          height:
            (Math.abs(num(this.synthetic_element[1][0].id) - num(this.synthetic_element[2].at(-1)!.id)) + 1) * 115 +
            "px",
        };
      }

      /* 当点击的是第三列 */
      if (this.active_array[1] === "3") {
        this.synthetic_id[1] = data.need!.main || [];
        this.synthetic_id[2] = [this.active_id];

        for (let i = 0; i < this.synthetic_id[1].length; i++) {
          const item = this.synthetic_id[1][i];
          const res = await getEquipSynthetic(item);
          if (res) {
            this.synthetic_id[0] = res.need?.main || [];
          }
        }

        this.synthetic_element[1] = this.synthetic_element[1].filter((item) => {
          return this.synthetic_id[1].includes(item.id);
        });
        this.synthetic_element[2] = this.synthetic_element[2].filter((item) => {
          return item.id === this.active_id;
        });
        for (let i = 0; i < this.equip_element.length; i++) {
          const equip = this.equip_element[i];
          for (let j = 0; j < this.synthetic_id.length; j++) {
            const ids = this.synthetic_id[j];
            for (let k = 0; k < ids.length; k++) {
              const id = ids[k];
              if (equip.id === id) {
                this.synthetic_element[j][k] = equip;
                const res = await getEquipSynthetic(equip.id);
                if (res) {
                  this.synthetic_element[j][k].to = res.synthetic?.to;
                }
              }
            }
          }
        }

        const num = (id: number) => {
          return Number(id.toString().slice(2));
        };

        this.vertical_line[2] = {
          top: (num(this.synthetic_element[1][0].id) - 1) * 115 + "px",
          height:
            Math.abs(num(this.synthetic_element[1][0].id) - num(this.synthetic_element[2].at(-1)!.id)) * 115 + "px",
        };
      }

      this.equipSelectFn.forEach((item) => {
        item();
      });
    },

    /** @description: 清空合成组 */
    clearSynthetic() {
      this.vertical_line = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
      this.synthetic_element = [[], [], []];
    },
  },
});
