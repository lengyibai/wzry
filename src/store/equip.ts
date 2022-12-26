import { defineStore } from "pinia";
import { EquipStore } from "./interface";
import { getEquip } from "@/api/main/games/equip";
import { getEquipSynthetic } from "@/api/main/games/equipSynthetic";
import { t, h } from "./helper";

export default defineStore("equip", {
  state: (): EquipStore.State => ({
    type: "攻击", //列表装备类型显示
    active_id: 0, //当前被点击的装备id
    synthetic: { id: 0, name: "" }, //当前点击的装备合成
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
      this.clearSynthetic();
    },

    /** @description: 设置需要点击装备触发的函数 */
    setSelectFn(fn: () => void) {
      this.equipSelectFn.push(fn);
    },

    /** @description: 装备卡片被点击的id */
    setEquipActive(id = 0): void {
      this.vertical_line = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
      if (this.active_id === id) {
        this.active_id = 0;
        this.clearSynthetic();
        return;
      }
      this.active_id = id;
      getEquipSynthetic(id).then((res) => {
        this.clearSynthetic();
        if (res) {
          this.active_array = res.id.toString().split("") || [];
          this.synthetic = res;
          this.addSynthetic(res);
        }
      });
    },

    /** @description: 添加合成组 */
    async addSynthetic(synthetic: Equip.Synthetic) {
      /* 当点击的是第一列 */
      if (this.active_array[1] === "1") {
        this.synthetic_id[0][0] = synthetic; //获取第一列id组

        // 通过第一列获取第二列

        this.synthetic_id[1] = [];
        try {
          for (let i = 0; i < synthetic.to!.length; i++) {
            const to = synthetic.to![i];
            const res = await getEquipSynthetic(to.id);
            this.synthetic_id[1].push(res);
          }
        } catch (error) {
          /*  */
        }
        this.synthetic_id[1].sort(function (a, b) {
          return a.id - b.id;
        });

        // 通过第二列获取第三列
        this.synthetic_id[2] = [];
        for (let i = 0; i < this.synthetic_id[1].length; i++) {
          const to = this.synthetic_id[1][i];
          const res = await getEquipSynthetic(to.id);
          res?.to && this.synthetic_id[2].push(...res.to);
          this.synthetic_id[2].sort(function (a, b) {
            return a.id - b.id;
          });
        }

        //计算二三列竖线距离顶部及高度
        try {
          this.vertical_line[1] = {
            top: t(this.active_id, this.synthetic_id[1][0].id),
            height: h(this.active_id, this.synthetic_id[1][0].id, this.synthetic_id[1].at(-1)!.id),
          };
          this.vertical_line[2] = {
            top: t(this.synthetic_id[1][0]?.id, this.synthetic_id[2][0]?.id),
            height: h(this.synthetic_id[1][0].id, this.synthetic_id[2][0].id, this.synthetic_id[2].at(-1)?.id || 0),
          };
        } catch (error) {
          /*  */
        }
      }

      /* 当点击的是第二列 */
      if (this.active_array[1] === "2") {
        this.synthetic_id[1][0] = synthetic; //获取第二列id组

        // 通过第二列获取第一列
        this.synthetic_id[0] = [];
        try {
          for (let i = 0; i < synthetic.need!.length; i++) {
            const need = synthetic.need![i];
            const res = await getEquipSynthetic(need.id);
            this.synthetic_id[0].push(res);
          }
        } catch (error) {
          /*  */
        }
        this.synthetic_id[0].sort(function (a, b) {
          return a.id - b.id;
        });

        // 通过第二列获取第三列
        this.synthetic_id[2] = [];
        this.synthetic_id[2] = synthetic.to || [];

        // 计算二三列竖线距离顶部及高度;
        try {
          this.vertical_line[1] = {
            top: t(this.synthetic_id[0][0].id, this.synthetic_id[1][0].id),
            height: h(this.synthetic_id[1][0].id, this.synthetic_id[0][0].id, this.synthetic_id[0].at(-1)!.id),
          };
        } catch (error) {
          /*  */
        }
        if (this.synthetic_id[2][0]) {
          this.vertical_line[2] = {
            top: t(this.synthetic_id[1][0].id, this.synthetic_id[2][0].id),
            height: h(this.synthetic_id[1][0].id, this.synthetic_id[2][0].id, this.synthetic_id[2].at(-1)?.id || 0),
          };
        }
      }

      // /* 当点击的是第三列 */
      if (this.active_array[1] === "3") {
        this.synthetic_id[2][0] = synthetic; //获取第二列id组

        // 通过第三列获取第二列
        this.synthetic_id[1] = [];
        try {
          for (let i = 0; i < synthetic.need!.length; i++) {
            const need = synthetic.need![i];
            const res = await getEquipSynthetic(need.id);
            this.synthetic_id[1].push(res);
          }

          this.synthetic_id[1].sort(function (a, b) {
            return a.id - b.id;
          });
        } catch (error) {
          /*  */
        }

        // 通过第二列获取第一列
        this.synthetic_id[0] = [];
        for (let i = 0; i < this.synthetic_id[1]!.length; i++) {
          const need = this.synthetic_id[1][i].need;
          if (need) {
            for (let i = 0; i < need?.length; i++) {
              const res = await getEquipSynthetic(need[i].id);
              this.synthetic_id[0].push(res);
            }
          }
        }
        this.synthetic_id[0].sort(function (a, b) {
          return a.id - b.id;
        });

        // 计算二三列竖线距离顶部及高度;
        try {
          this.vertical_line[1] = {
            top: t(this.synthetic_id[0][0].id, this.synthetic_id[1][0].id),
            height: h(this.synthetic_id[1].at(-1)!.id, this.synthetic_id[0][0].id, this.synthetic_id[0].at(-1)!.id),
          };

          if (this.synthetic_id[2][0]) {
            this.vertical_line[2] = {
              top: t(this.synthetic_id[1][0].id, this.synthetic_id[2][0].id),
              height: h(
                this.synthetic_id[2].at(-1)?.id || 0,
                this.synthetic_id[1][0].id,
                this.synthetic_id[1].at(-1)!.id
              ),
            };
          }
        } catch (error) {
          /*  */
        }
      }

      this.equipSelectFn.forEach((item) => {
        item();
      });
    },

    /** @description: 清空合成组 */
    clearSynthetic() {
      this.vertical_line = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
      this.synthetic_id = [[], [], []];
    },
  },
});
