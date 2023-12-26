import { defineStore } from "pinia";
import { ref } from "vue";

import { top, height } from "../helper";

import { $tool } from "@/utils";
import { GAME_EQUIP, KVP_EQUIP } from "@/api";

/** 装备Dom元素信息 */
type EquipElement = {
  /** 装备名称 */
  name: string;
  /** 装备Dom元素 */
  el: HTMLElement | undefined;
  /** 装备id */
  id: number;
};

/** @description 装备相关 */
const EquipStore = defineStore("equip", () => {
  /** 当前被点击装备排列位置，通过分解id获得 */
  let active_array: string[] = [];

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
  const equip_element = ref<EquipElement[]>([]);

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
    synthetic: ref<Game.Equip.Synthetic>({ id: 0, name: "" }),
    /** 当前点击的装备合成相关id */
    synthetic_id: ref<Game.Equip.Synthetic[][]>([[], [], []]),
    /** 装备总列表 */
    equip_list: ref<Game.Equip.Data[]>([]),
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
    equip_list,
    equip_list_column,
    vertical_line,
  } = ExposeData;

  /* 添加合成组 */
  const addSynthetic = (synthetic: Game.Equip.Synthetic) => {
    /* 当点击的是第一列 */
    if (active_array[1] === "1") {
      //获取第一列id组
      synthetic_id.value[0][0] = synthetic;

      //通过第一列获取第二列
      synthetic_id.value[1] = [];
      //某些装备没有可合成材料，如提神水晶
      if (synthetic.to) {
        for (let i = 0; i < synthetic.to.length; i++) {
          const to = synthetic.to![i];
          const res = KVP_EQUIP.getEquipSyntheticKvp()[to.id];
          synthetic_id.value[1].push(res);
        }
      }

      //将id组从小到大排序
      synthetic_id.value[1].sort((a, b) => a.id - b.id);

      //通过第二列获取第三列
      synthetic_id.value[2] = [];
      for (let i = 0; i < synthetic_id.value[1].length; i++) {
        const to = synthetic_id.value[1][i];
        const res = KVP_EQUIP.getEquipSyntheticKvp()[to.id];
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

    /* 当点击的是第二列 */
    if (active_array[1] === "2") {
      //获取第二列id组
      synthetic_id.value[1][0] = synthetic;

      //通过第二列获取第一列
      synthetic_id.value[0] = [];
      //某些装备没有合成材料，如原初遗珠
      if (synthetic.need) {
        for (let i = 0; i < synthetic.need.length; i++) {
          const need = synthetic.need![i];
          const res = KVP_EQUIP.getEquipSyntheticKvp()[need.id];
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

    /* 当点击的是第三列 */
    if (active_array[1] === "3") {
      //获取第二列id组
      synthetic_id.value[2][0] = synthetic;

      //通过第三列获取第二列
      synthetic_id.value[1] = [];
      for (let i = 0; i < synthetic.need!.length; i++) {
        const need = synthetic.need![i];
        const res = KVP_EQUIP.getEquipSyntheticKvp()[need.id];
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
            const res = KVP_EQUIP.getEquipSyntheticKvp()[need[i].id];
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

  /* 清空合成组 */
  const clearSynthetic = () => {
    vertical_line.value = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
    synthetic_id.value = [[], [], []];
  };

  const ExposeMethods = {
    /** @description 获取装备列表 */
    getEquipList() {
      equip_list.value = GAME_EQUIP.getEquip();

      //将装备分类
      equip_list.value.forEach((item: Game.Equip.Data) => {
        type_list[item.type][item.level - 1].push(item);
      });

      ExposeMethods.setType("攻击");
    },
    /** @description 存储列表所有装备Dom元素及相关信息 */
    setEquipElement(data: EquipElement) {
      equip_element.value.push(data);
    },

    /** @description 设置装备类型 */
    async setType(type: Game.Equip.Category) {
      //避免重复点击调用
      if (category.value === type) return;

      clearSynthetic();

      equip_list_column.value = type_list[type];

      //每次切换装备类型，延迟显示列表及详情
      await $tool.promiseTimeout(() => {
        category.value = type;
        show_details.value = false;
      }, 200);

      await $tool.promiseTimeout(() => {
        this.setEquipActive(Number(type_index[type] + "11"));
      }, 500);
    },

    /** @description 点击的装备id */
    setEquipActive(id = 0) {
      clearSynthetic();

      //如果再次点击了装备，则重置
      if (active_id.value === id) {
        active_id.value = 0;
        return;
      }

      //隐藏详情，延迟延迟设置装备信息并显示详情
      active_id.value = id;
      show_details.value = true;
      active_data.value = equip_list.value.find((item) => item.id === id);

      const res = KVP_EQUIP.getEquipSyntheticKvp()[id];
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
