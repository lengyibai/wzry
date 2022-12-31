import { defineStore } from "pinia";
import { ref } from "vue";
import { getEquip } from "@/api/main/games/equip";
import { getEquipSynthetic } from "@/api/main/games/equipSynthetic";
import { t, h } from "./helper";

export default defineStore("equip", () => {
  const active_id = ref(0); //当前被点击的装备id
  const category = ref("攻击"); //列表装备类型显示
  const active_array = ref<string[]>([]); //当前被点击装备排列位置
  const equip_list = ref<Equip.Data[]>([]); //装备列表
  const equip_list_column = ref<Equip.Data[][]>([]); //三列装备
  const equip_element = ref<
    { name: string; el: HTMLElement | undefined; id: number }[]
  >([]); //装备列表的所有元素
  const equipSelectFn = ref<(() => void)[]>([]); //点击装备触发的函数
  const synthetic = ref<Equip.Synthetic>({ id: 0, name: "" }); //当前点击的装备合成
  const synthetic_id = ref<Equip.Synthetic[][]>([[], [], []]); //当前点击的装备合成相关id
  const vertical_line = ref<{ top?: string; height?: string }[]>([
    {},
    { top: "0", height: "0" },
    { top: "0", height: "0" },
  ]); //二三列的竖线

  // 相关职业列表
  const type_list = ref<Record<string, Equip.Data[][]>>({
    攻击: [[], [], []],
    法术: [[], [], []],
    防御: [[], [], []],
    移动: [[], [], []],
    打野: [[], [], []],
    游走: [[], [], []],
  });

  /** @description: 获取装备列表 */
  const getEquipList = () => {
    return new Promise((resolve) => {
      getEquip().then((res) => {
        setEquipList(res);
        resolve(null);
      });
    });
  };

  /** @description: 设置装备列表 */
  const setEquipList = (data: Equip.Data[]) => {
    equip_list.value = data;
    equip_list.value.forEach((item: Equip.Data) => {
      type_list.value[item.type][item.level - 1].push(item);
    });
    setType("攻击");
  };

  /** @description: 存储列表所有装备元素 */
  const setEquipElement = (data: {
    name: string;
    el: HTMLElement | undefined;
    id: number;
  }) => {
    equip_element.value.push(data);
  };

  /** @description: 设置装备类型 */
  const setType = (type: string) => {
    active_id.value = 0;
    category.value = type;
    equip_list_column.value = type_list.value[type];
    clearSynthetic();
  };

  /** @description: 设置需要点击装备触发的函数 */
  const setSelectFn = (fn: () => void) => {
    equipSelectFn.value.push(fn);
  };

  /** @description: 装备卡片被点击的id */
  const setEquipActive = (id = 0) => {
    vertical_line.value = [
      {},
      { top: "0", height: "0" },
      { top: "0", height: "0" },
    ];
    if (active_id.value === id) {
      active_id.value = 0;
      clearSynthetic();
      return;
    }
    active_id.value = id;
    getEquipSynthetic(id).then((res) => {
      clearSynthetic();
      if (res) {
        active_array.value = res.id.toString().split("") || [];
        synthetic.value = res;
        addSynthetic(res);
      }
    });
  };

  /** @description: 添加合成组 */
  const addSynthetic = async (synthetic: Equip.Synthetic) => {
    /* 当点击的是第一列 */
    if (active_array.value[1] === "1") {
      synthetic_id.value[0][0] = synthetic; //获取第一列id组

      // 通过第一列获取第二列

      synthetic_id.value[1] = [];
      try {
        for (let i = 0; i < synthetic.to!.length; i++) {
          const to = synthetic.to![i];
          const res = await getEquipSynthetic(to.id);
          synthetic_id.value[1].push(res);
        }
      } catch (error) {
        /*  */
      }
      synthetic_id.value[1].sort(function (a, b) {
        return a.id - b.id;
      });

      // 通过第二列获取第三列
      synthetic_id.value[2] = [];
      for (let i = 0; i < synthetic_id.value[1].length; i++) {
        const to = synthetic_id.value[1][i];
        const res = await getEquipSynthetic(to.id);
        res?.to && synthetic_id.value[2].push(...res.to);
        synthetic_id.value[2].sort(function (a, b) {
          return a.id - b.id;
        });
      }

      //计算二三列竖线距离顶部及高度
      try {
        vertical_line.value[1] = {
          top: t(active_id.value, synthetic_id.value[1][0].id),
          height: h(
            active_id.value,
            synthetic_id.value[1][0].id,
            synthetic_id.value[1].at(-1)!.id
          ),
        };
        vertical_line.value[2] = {
          top: t(synthetic_id.value[1][0]?.id, synthetic_id.value[2][0]?.id),
          height: h(
            synthetic_id.value[1][0].id,
            synthetic_id.value[2][0].id,
            synthetic_id.value[2].at(-1)?.id || 0
          ),
        };
      } catch (error) {
        /*  */
      }
    }

    /* 当点击的是第二列 */
    if (active_array.value[1] === "2") {
      synthetic_id.value[1][0] = synthetic; //获取第二列id组

      // 通过第二列获取第一列
      synthetic_id.value[0] = [];
      try {
        for (let i = 0; i < synthetic.need!.length; i++) {
          const need = synthetic.need![i];
          const res = await getEquipSynthetic(need.id);
          synthetic_id.value[0].push(res);
        }
      } catch (error) {
        /*  */
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      // 通过第二列获取第三列
      synthetic_id.value[2] = [];
      synthetic_id.value[2] = synthetic.to || [];

      // 计算二三列竖线距离顶部及高度;
      try {
        vertical_line.value[1] = {
          top: t(synthetic_id.value[0][0].id, synthetic_id.value[1][0].id),
          height: h(
            synthetic_id.value[1][0].id,
            synthetic_id.value[0][0].id,
            synthetic_id.value[0].at(-1)!.id
          ),
        };
      } catch (error) {
        /*  */
      }
      if (synthetic_id.value[2][0]) {
        vertical_line.value[2] = {
          top: t(synthetic_id.value[1][0].id, synthetic_id.value[2][0].id),
          height: h(
            synthetic_id.value[1][0].id,
            synthetic_id.value[2][0].id,
            synthetic_id.value[2].at(-1)?.id || 0
          ),
        };
      }
    }

    // /* 当点击的是第三列 */
    if (active_array.value[1] === "3") {
      synthetic_id.value[2][0] = synthetic; //获取第二列id组

      // 通过第三列获取第二列
      synthetic_id.value[1] = [];
      try {
        for (let i = 0; i < synthetic.need!.length; i++) {
          const need = synthetic.need![i];
          const res = await getEquipSynthetic(need.id);
          synthetic_id.value[1].push(res);
        }

        synthetic_id.value[1].sort(function (a, b) {
          return a.id - b.id;
        });
      } catch (error) {
        /*  */
      }

      // 通过第二列获取第一列
      synthetic_id.value[0] = [];
      for (let i = 0; i < synthetic_id.value[1]!.length; i++) {
        const need = synthetic_id.value[1][i].need;
        if (need) {
          for (let i = 0; i < need?.length; i++) {
            const res = await getEquipSynthetic(need[i].id);
            synthetic_id.value[0].push(res);
          }
        }
      }
      synthetic_id.value[0].sort(function (a, b) {
        return a.id - b.id;
      });

      // 计算二三列竖线距离顶部及高度;
      try {
        vertical_line.value[1] = {
          top: t(synthetic_id.value[0][0].id, synthetic_id.value[1][0].id),
          height: h(
            synthetic_id.value[1].at(-1)!.id,
            synthetic_id.value[0][0].id,
            synthetic_id.value[0].at(-1)!.id
          ),
        };

        if (synthetic_id.value[2][0]) {
          vertical_line.value[2] = {
            top: t(synthetic_id.value[1][0].id, synthetic_id.value[2][0].id),
            height: h(
              synthetic_id.value[2].at(-1)?.id || 0,
              synthetic_id.value[1][0].id,
              synthetic_id.value[1].at(-1)!.id
            ),
          };
        }
      } catch (error) {
        /*  */
      }
    }

    equipSelectFn.value.forEach((item) => {
      item();
    });
  };

  /** @description: 清空合成组 */
  const clearSynthetic = () => {
    vertical_line.value = [
      {},
      { top: "0", height: "0" },
      { top: "0", height: "0" },
    ];
    synthetic_id.value = [[], [], []];
  };

  return {
    category,
    active_id,
    synthetic,
    synthetic_id,
    equip_list,
    equip_list_column,
    active_array,
    equip_element,
    equipSelectFn,
    vertical_line,
    type_list,
    getEquipList,
    setEquipList,
    setEquipElement,
    setType,
    setSelectFn,
    setEquipActive,
    addSynthetic,
    clearSynthetic,
  };
});
