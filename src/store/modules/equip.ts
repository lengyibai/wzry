import { defineStore } from "pinia";
import { ref } from "vue";

import { top, height } from "../helper";

import { API_EQUIP, API_EQUIPSYNTHETIC } from "@/api";
import { Util } from "@/utils";

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
const equipStore = defineStore("equip", () => {
  /** 当前被点击装备排列位置，通过分解id获得 */
  let active_array: string[] = [];
  /** 相关职业列表 */
  const type_list: Record<Equip.Category, Equip.Data[][]> = {
    攻击: [[], [], []],
    法术: [[], [], []],
    防御: [[], [], []],
    移动: [[], [], []],
    打野: [[], [], []],
    游走: [[], [], []],
  };
  /** 相关职业索引 */
  const type_index: Record<Equip.Category, number> = {
    攻击: 1,
    法术: 2,
    防御: 3,
    移动: 4,
    打野: 5,
    游走: 6,
  };
  /** 当前被点击的装备id */
  const active_id = ref(0);
  /** 显示装备详情 */
  const show_details = ref(false);
  /** 当前被点击的装备详情 */
  const active_data = ref<Equip.Data>();
  /** 列表装备类型 */
  const category = ref("");
  /** 装备总列表 */
  const equip_list = ref<Equip.Data[]>([]);
  /** 三列装备数据 */
  const equip_list_column = ref<Equip.Data[][]>([]);
  /** 装备列表的所有元素 */
  const equip_element = ref<EquipElement[]>([]);
  /** 当前点击的装备合成 */
  const synthetic = ref<Equip.Synthetic>({ id: 0, name: "" });
  /** 当前点击的装备合成相关id */
  const synthetic_id = ref<Equip.Synthetic[][]>([[], [], []]);
  /** 二三列的竖线 */
  const vertical_line = ref<{ top?: string; height?: string }[]>([
    {},
    { top: "0", height: "0" },
    { top: "0", height: "0" },
  ]);

  /** @description 获取装备列表 */
  const getEquipList = async () => {
    equip_list.value = await API_EQUIP.getEquip();

    //设置初始攻击类型的装备列表
    equip_list.value.forEach((item: Equip.Data) => {
      type_list[item.type][item.level - 1].push(item);
    });
    setType("攻击");
  };

  /** @description 存储列表所有装备Dom元素 */
  const setEquipElement = (data: EquipElement) => {
    equip_element.value.push(data);
  };

  /** @description 设置装备类型 */
  const setType = async (type: Equip.Category) => {
    if (category.value === type) return; //避免重复点击调用

    clearSynthetic();
    equip_list_column.value = type_list[type];

    //每次切换装备类型，延迟显示列表及详情
    await Util.TOOL.promiseTimeout(() => {
      category.value = type;
      show_details.value = false;
    }, 200);

    await Util.TOOL.promiseTimeout(() => {
      setEquipActive(Number(type_index[type] + "11"));
    }, 500);
  };

  /** @description 装备卡片被点击的id */
  const setEquipActive = (id = 0) => {
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

    API_EQUIPSYNTHETIC.getEquipSynthetic(id).then((res) => {
      if (!res) return;
      active_array = res.id.toString().split("") || [];
      synthetic.value = res;
      addSynthetic(res);
    });
  };

  /** @description 添加合成组 */
  const addSynthetic = async (synthetic: Equip.Synthetic) => {
    /* 当点击的是第一列 */
    if (active_array[1] === "1") {
      synthetic_id.value[0][0] = synthetic; //获取第一列id组

      //通过第一列获取第二列
      synthetic_id.value[1] = [];
      try {
        for (let i = 0; i < synthetic.to!.length; i++) {
          const to = synthetic.to![i];
          const res = await API_EQUIPSYNTHETIC.getEquipSynthetic(to.id);
          synthetic_id.value[1].push(res);
        }
      } catch (error) {
        /*  */
      }

      //将id组从小到大排序
      synthetic_id.value[1].sort((a, b) => a.id - b.id);

      //通过第二列获取第三列
      synthetic_id.value[2] = [];
      for (let i = 0; i < synthetic_id.value[1].length; i++) {
        const to = synthetic_id.value[1][i];
        const res = await API_EQUIPSYNTHETIC.getEquipSynthetic(to.id);
        res?.to && synthetic_id.value[2].push(...res.to);
        synthetic_id.value[2].sort(function (a, b) {
          return a.id - b.id;
        });
      }

      //计算二三列竖线距离顶部及高度
      try {
        vertical_line.value[1] = {
          top: top(active_id.value, synthetic_id.value[1][0].id),
          height: height(active_id.value, synthetic_id.value[1][0].id, synthetic_id.value[1].at(-1)!.id),
        };
        vertical_line.value[2] = {
          top: top(synthetic_id.value[1][0]?.id, synthetic_id.value[2][0]?.id),
          height: height(
            synthetic_id.value[1][0].id,
            synthetic_id.value[2][0].id,
            synthetic_id.value[2].at(-1)?.id || 0,
          ),
        };
      } catch (error) {
        /*  */
      }
    }

    /* 当点击的是第二列 */
    if (active_array[1] === "2") {
      synthetic_id.value[1][0] = synthetic; //获取第二列id组

      //通过第二列获取第一列
      synthetic_id.value[0] = [];
      try {
        for (let i = 0; i < synthetic.need!.length; i++) {
          const need = synthetic.need![i];
          const res = await API_EQUIPSYNTHETIC.getEquipSynthetic(need.id);
          synthetic_id.value[0].push(res);
        }
      } catch (error) {
        /*  */
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      //通过第二列获取第三列
      synthetic_id.value[2] = [];
      synthetic_id.value[2] = synthetic.to || [];

      //计算二三列竖线距离顶部及高度;
      try {
        vertical_line.value[1] = {
          top: top(synthetic_id.value[0][0].id, synthetic_id.value[1][0].id),
          height: height(synthetic_id.value[1][0].id, synthetic_id.value[0][0].id, synthetic_id.value[0].at(-1)!.id),
        };
      } catch (error) {
        /*  */
      }
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
      synthetic_id.value[2][0] = synthetic; //获取第二列id组

      //通过第三列获取第二列
      synthetic_id.value[1] = [];
      try {
        for (let i = 0; i < synthetic.need!.length; i++) {
          const need = synthetic.need![i];
          const res = await API_EQUIPSYNTHETIC.getEquipSynthetic(need.id);
          synthetic_id.value[1].push(res);
        }

        synthetic_id.value[1].sort(function (a, b) {
          return a.id - b.id;
        });
      } catch (error) {
        /*  */
      }

      //通过第二列获取第一列
      synthetic_id.value[0] = [];
      for (let i = 0; i < synthetic_id.value[1]!.length; i++) {
        const need = synthetic_id.value[1][i].need;
        if (need) {
          for (let i = 0; i < need?.length; i++) {
            const res = await API_EQUIPSYNTHETIC.getEquipSynthetic(need[i].id);
            synthetic_id.value[0].push(res);
          }
        }
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      //计算二三列竖线距离顶部及高度
      try {
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
      } catch (error) {
        /*  */
      }
    }
  };

  /** @description 清空合成组 */
  const clearSynthetic = () => {
    vertical_line.value = [{}, { top: "0", height: "0" }, { top: "0", height: "0" }];
    synthetic_id.value = [[], [], []];
  };

  return {
    /** 列表装备类型 */
    category,
    /** 当前被点击的装备id */
    active_id,
    /** 当前被点击的装备详情 */
    active_data,
    /** 显示装备详情 */
    show_details,
    /** 当前点击的装备合成 */
    synthetic,
    /** 当前点击的装备合成所需装备的id */
    synthetic_id,
    /** 装备总列表 */
    equip_list,
    /** 三列装备数据 */
    equip_list_column,
    /** 二三列的竖线 */
    vertical_line,
    getEquipList,
    setEquipElement,
    setType,
    setEquipActive,
  };
});

export default equipStore;
export type EquipStore = ReturnType<typeof equipStore>;
