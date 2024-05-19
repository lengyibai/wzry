import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { top, height } from "../helper/equipStore";
import type { EquipStoreType } from "../interface";

import { GAME_EQUIP, KVP_EQUIP } from "@/api";
import { _promiseTimeout } from "@/utils/tool";

/** @description 装备相关 */
const EquipStore = defineStore("equip", () => {
  /** 当前被点击装备排列位置，通过分解id获得 */
  let active_array: string[] = [];
  /** 装备总列表 */
  let equip_list: Game.Equip.Data[] = [];

  /** 相关职业列表 */
  const type_list: Record<Game.Equip.Category, Game.Equip.Data[][]> = {
    攻击: [[], [], []],
    法术: [[], [], []],
    防御: [[], [], []],
    移动: [[], [], []],
    打野: [[], [], []],
    游走: [[], [], []],
  };
  /** 相关职业索引 */
  const type_index: Record<Game.Equip.Category, number> = {
    攻击: 1,
    法术: 2,
    防御: 3,
    移动: 4,
    打野: 5,
    游走: 6,
  };
  /** 装备列表的所有元素 */
  const equip_element = reactive<EquipStoreType.Element[]>([]);

  const ExposeData = {
    /** 列表装备类型 */
    category: ref(""),
    /** 当前被点击的装备id */
    active_id: ref(0),
    /** 显示装备详情 */
    show_details: ref(false),
    /** 当前被点击的装备详情 */
    active_data: ref<Game.Equip.Data>(),
    /** 当前点击的装备合成 */
    synthetic: ref<Remote.Equip.Synthetic>({ id: 0, name: "" }),
    /** 当前点击的装备合成相关id */
    synthetic_id: ref<Remote.Equip.Synthetic[][]>([[], [], []]),
    /** 三列装备数据 */
    equip_list_column: ref<Game.Equip.Data[][]>([[], [], []]),
    /** 二三列的竖线 */
    vertical_line: ref<{ top?: string; height?: string }[]>([
      {},
      { top: "0", height: "0" },
      { top: "0", height: "0" },
    ]),
  };
  const {
    category,
    active_id,
    show_details,
    active_data,
    synthetic,
    synthetic_id,
    equip_list_column,
    vertical_line,
  } = ExposeData;

  /** @description 添加合成组
   * @param synthetic 合成组
   */
  const addSynthetic = async (synthetic: Remote.Equip.Synthetic) => {
    //当点击的是第一列
    if (active_array[1] === "1") {
      //获取第一列id组
      synthetic_id.value[0][0] = synthetic;

      //通过第一列获取第二列
      synthetic_id.value[1] = [];
      //某些装备没有可合成材料，如提神水晶
      if (synthetic.to) {
        for (let i = 0; i < synthetic.to.length; i++) {
          const to = synthetic.to![i];
          const res = (await KVP_EQUIP.getEquipSyntheticKvp())[to.id];
          synthetic_id.value[1].push(res);
        }
      }

      //将id组从小到大排序
      synthetic_id.value[1].sort((a, b) => a.id - b.id);

      //通过第二列获取第三列
      synthetic_id.value[2] = [];
      for (let i = 0; i < synthetic_id.value[1].length; i++) {
        const to = synthetic_id.value[1][i];
        const res = (await KVP_EQUIP.getEquipSyntheticKvp())[to.id];
        res?.to &&
          synthetic_id.value[2].push(...res.to.map((item) => ({ id: item.id, name: item.value })));
        synthetic_id.value[2].sort((a, b) => a.id - b.id);
      }

      //计算二三列竖线距离顶部及高度
      //某些装备没有可合成第二列装备，如提神水晶
      if (synthetic_id.value[1][0]) {
        vertical_line.value[1] = {
          top: top(active_id.value, synthetic_id.value[1][0].id),
          height: height(
            active_id.value,
            synthetic_id.value[1][0].id,
            synthetic_id.value[1].at(-1)!.id,
          ),
        };
      }

      //某些装备没有可合成第三列装备，如金色圣剑
      if (synthetic_id.value[2][0]) {
        vertical_line.value[2] = {
          top: top(synthetic_id.value[1][0].id, synthetic_id.value[2][0].id),
          height: height(
            synthetic_id.value[1][0].id,
            synthetic_id.value[2][0].id,
            synthetic_id.value[2].at(-1)?.id || 0,
          ),
        };
      }
    }

    //当点击的是第二列
    if (active_array[1] === "2") {
      //获取第二列id组
      synthetic_id.value[1][0] = synthetic;

      //通过第二列获取第一列
      synthetic_id.value[0] = [];
      //某些装备没有合成材料，如原初遗珠
      if (synthetic.need) {
        for (let i = 0; i < synthetic.need.length; i++) {
          const need = synthetic.need![i];
          const res = (await KVP_EQUIP.getEquipSyntheticKvp())[need.id];
          synthetic_id.value[0].push(res);
        }
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      //通过第二列获取第三列
      synthetic_id.value[2] = [];
      synthetic_id.value[2] =
        synthetic.to?.map((item) => ({ id: item.id, name: item.value })) || [];

      //计算二三列竖线距离顶部及高度;
      //某些装备没有合成材料，则没有第一列装备，也就无法获取到合成材料的第一件装备的id，如原初遗珠
      if (synthetic_id.value[0][0]) {
        vertical_line.value[1] = {
          top: top(synthetic_id.value[0][0].id, synthetic_id.value[1][0].id),
          height: height(
            synthetic_id.value[1][0].id,
            synthetic_id.value[0][0].id,
            synthetic_id.value[0].at(-1)!.id,
          ),
        };
      }

      //某些装备没有可合成第三列装备，如金色圣剑
      if (synthetic_id.value[2][0]) {
        vertical_line.value[2] = {
          top: top(synthetic_id.value[1][0].id, synthetic_id.value[2][0].id),
          height: height(
            synthetic_id.value[1][0].id,
            synthetic_id.value[2][0].id,
            synthetic_id.value[2].at(-1)?.id || 0,
          ),
        };
      }
    }

    //当点击的是第三列
    if (active_array[1] === "3") {
      //获取第二列id组
      synthetic_id.value[2][0] = synthetic;

      //通过第三列获取第二列
      synthetic_id.value[1] = [];
      for (let i = 0; i < synthetic.need!.length; i++) {
        const need = synthetic.need![i];
        const res = (await KVP_EQUIP.getEquipSyntheticKvp())[need.id];
        synthetic_id.value[1].push(res);
      }

      synthetic_id.value[1].sort(function (a, b) {
        return a.id - b.id;
      });

      //通过第二列获取第一列
      synthetic_id.value[0] = [];
      for (let i = 0; i < synthetic_id.value[1]!.length; i++) {
        const need = synthetic_id.value[1][i].need;
        if (need) {
          for (let i = 0; i < need?.length; i++) {
            const res = (await KVP_EQUIP.getEquipSyntheticKvp())[need[i].id];
            synthetic_id.value[0].push(res);
          }
        }
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      //计算二三列竖线距离顶部及高度
      vertical_line.value[1] = {
        top: top(synthetic_id.value[0][0].id, synthetic_id.value[1][0].id),
        height: height(
          synthetic_id.value[1].at(-1)!.id,
          synthetic_id.value[0][0].id,
          synthetic_id.value[0].at(-1)!.id,
        ),
      };

      if (synthetic_id.value[2][0]) {
        vertical_line.value[2] = {
          top: top(synthetic_id.value[1][0].id, synthetic_id.value[2][0].id),
          height: height(
            synthetic_id.value[2].at(-1)?.id || 0,
            synthetic_id.value[1][0].id,
            synthetic_id.value[1].at(-1)!.id,
          ),
        };
      }
    }
  };

  /** @description 清空合成组 */
  const clearSynthetic = () => {
    vertical_line.value = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
    synthetic_id.value = [[], [], []];
  };

  const ExposeMethods = {
    /** @description 获取装备列表 */
    async getEquipList() {
      equip_list = await GAME_EQUIP.getEquip();

      //将装备分类
      equip_list.forEach((item: Game.Equip.Data) => {
        type_list[item.type][item.level - 1].push(item);
      });

      ExposeMethods.setType("攻击");
    },
    /** @description 存储列表所有装备Dom元素及相关信息
     * @param data 装备Dom元素信息
     */
    setEquipElement(data: EquipStoreType.Element) {
      equip_element.push(data);
    },

    /** @description 设置装备类型
     * @param type 装备类型
     */
    async setType(type: Game.Equip.Category) {
      //避免重复点击调用
      if (category.value === type) return;

      clearSynthetic();

      equip_list_column.value = type_list[type];

      //每次切换装备类型，延迟显示列表及详情
      await _promiseTimeout(200);
      category.value = type;
      show_details.value = false;

      await _promiseTimeout(500);
      this.setEquipActive(Number(type_index[type] + "11"));
    },

    /** @description 点击的装备id
     * @param id 装备id
     */
    async setEquipActive(id = 0) {
      clearSynthetic();

      //如果再次点击了装备，则重置
      if (active_id.value === id) {
        active_id.value = 0;
        return;
      }

      //隐藏详情，延迟延迟设置装备信息并显示详情
      active_id.value = id;
      show_details.value = true;
      active_data.value = equip_list.find((item) => item.id === id);

      const res = (await KVP_EQUIP.getEquipSyntheticKvp())[id];
      if (!res) return;
      active_array = res.id.toString().split("") || [];
      synthetic.value = res;
      addSynthetic(res);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { EquipStore };
