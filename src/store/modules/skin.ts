import { ref } from "vue";
import { defineStore } from "pinia";
import _debounce from "lodash/debounce";

import { API_SKIN } from "@/api";
import { $tool } from "@/utils";
import { usePagingLoad } from "@/hooks";

/** @description 皮肤列表页 */
const SkinStore = defineStore("skin", () => {
  const {
    all_data,
    resetPage,
    loadMore,
    setScroll,
    scroll,
    filter_list,
    show_list,
  } = usePagingLoad<Hero.Skin>();

  /** 职业类型 */
  const profession = ref<Hero.Profession>("全部");
  /** 价格排序类型 */
  const price_type = ref("全部价格");
  /** 皮肤筛选类型 */
  const skin_type = ref("全部皮肤");
  /** 排序类型 */
  const sort_type = ref("倒序");
  /** 性别筛选类型 */
  const gender_type = ref<Gender>(0);

  /** @description 获取皮肤列表并设置皮肤类型图片及类型命 */
  const getSkinList = async () => {
    const skinList = await API_SKIN.getSkin();
    const skinType = await API_SKIN.getSkinType();

    skinList.forEach((skin) => {
      const type = skinType.find((type) => type.id === skin.type)!;
      skin.type = type.link;
      skin.category = type.name;

      //设置备用名称，解决高亮问题
      skin.hero_name = skin.heroName;
      skin.skin_name = skin.name;
    });

    all_data.value = skinList;

    sortAll();
  };

  /**
   * @description: 设置职业
   * @param name 职业名称
   */
  const setProfessional = (name: Hero.Profession) => {
    if (profession.value === name) return;
    profession.value = name;
    sortAll();
  };

  /**
   * @description: 性别筛选
   * @param type 性别标识符
   */
  const filterGender = (type: Gender) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /**
   * @description: 皮肤类型筛选
   * @param type 皮肤类型名称
   */
  const filterSkinType = (type: string) => {
    if (skin_type.value === type) return;
    skin_type.value = type;
    sortAll();
  };

  /**
   * @description: 价格排序
   * @param type 价格排序方式
   */
  const sortPrice = (type: string) => {
    if (price_type.value === type) return;
    price_type.value = type;
    sortAll();
  };

  /**
   * @description: 正序|倒序
   * @param type 排序名称
   */
  const sortType = (type: string) => {
    if (sort_type.value === type) return;
    sort_type.value = type;
    sortAll();
  };

  /** @description 一键排序 */
  const sortAll = () => {
    scroll.value = 0;

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        filter_list.value = [...all_data.value];
      } else {
        filter_list.value = all_data.value.filter((item: Hero.Skin) => {
          return item.profession.includes(profession.value);
        });
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Hero.Skin[] = [];
      const girl: Hero.Skin[] = [];
      filter_list.value.forEach((item) => {
        if (item.gender === "男") {
          boy.push(item);
        } else {
          girl.push(item);
        }
      });

      if (gender_type.value === 1) {
        filter_list.value = boy;
      } else if (gender_type.value === 2) {
        filter_list.value = girl;
      }
    };

    /** 皮肤类型筛选 */
    const filterSkinType = () => {
      //皮肤类型筛选
      const alone = [
        "勇者",
        "史诗",
        "传说",
        "唯一限定",
        "荣耀典藏",
        "KPL",
        "星传说",
        "五虎上将",
        "战令限定",
        "赛季专属",
        "周年限定",
        "五五",
        "正版授权",
        "世冠",
        "王者之证",
        "FMVP",
        "年限定",
      ];
      const multiple = [
        {
          label: "情侣",
          value: ["情人节限定", "520限定"],
        },
        {
          label: "其他限定",
          value: [
            "成就限定",
            "圣诞限定",
            "贵族限定",
            "会员限定",
            "赏金赛限定",
            "战队赛限定",
            "浪一夏限定",
            "圣诞限定",
            "航天限定",
            "仙剑限定",
          ],
        },
        {
          label: "其他专属",
          value: [
            "必胜客专属",
            "新春专属",
            "信誉专属",
            "源梦",
            "活动专属",
            "星会员专属",
          ],
        },
        {
          label: "特殊标志",
          value: ["御龙在天", "国家宝藏", "敦煌研究院", "永宁纪"],
        },
        { label: "团战精神", value: ["沉稳", "敏锐", "掌控", "守护", "坚韧"] },
      ];
      if (skin_type.value && skin_type.value !== "全部皮肤") {
        if (alone.includes(skin_type.value)) {
          filter_list.value = filter_list.value.filter((item) => {
            return item.category.includes(skin_type.value);
          });
        } else {
          multiple.forEach((type) => {
            if (skin_type.value === type.label) {
              filter_list.value = filter_list.value.filter((skin) => {
                return type.value.some((item) => {
                  return skin.category.includes(item);
                });
              });
            }
          });
        }
        filter_list.value = $tool.typeSort(filter_list.value, "category");
      }
    };

    /** 价格排序 */
    const sortPrice = () => {
      const SortStrategy: Record<string, (list: Hero.Skin[]) => Hero.Skin[]> = {
        免费: (list) => {
          const noFree = [
            "积分夺宝",
            "星会员15级",
            "贵族专属",
            "荣耀战令获取",
            "会员限定",
            "限时兑换",
          ];
          const noNum = list.filter(
            (item) =>
              !noFree.includes(item.price.toString()) &&
              isNaN(Number(item.price)),
          );
          return $tool.typeSort(noNum, "price");
        },
        由低到高: (list) => {
          const isNum = list.filter((item) => !isNaN(Number(item.price)));
          return isNum.sort((a, b) => Number(a.price) - Number(b.price));
        },
        由高到低: (list) => {
          const isNum = list.filter((item) => !isNaN(Number(item.price)));
          const strange = list.filter(
            (item) => item.type.toString().indexOf("26.png") !== -1,
          );
          return [...strange, ...isNum].sort(
            (a, b) => Number(b.price) - Number(a.price),
          );
        },
      };

      if (price_type.value && price_type.value !== "全部价格") {
        if (SortStrategy.hasOwnProperty(price_type.value)) {
          filter_list.value = SortStrategy[price_type.value](filter_list.value);
          sort_type.value = "正序";
        }
      }
    };

    /** 正/倒排序 */
    const sortType = () => {
      if (sort_type.value === "倒序") {
        filter_list.value.reverse();
      }
    };

    filterProfession();
    filterGender();
    filterSkinType();
    sortPrice();
    sortType();
    resetPage();
  };

  const debounceSearchSkin = _debounce((name: string) => {
    if (name) {
      filter_list.value = $tool.search(
        all_data.value,
        name,
        ["skin_name", "hero_name", "category"],
        true,
      );
    } else {
      sortAll();
    }

    resetPage();
  }, 500);
  /** @description 搜索皮肤 */
  const searchSkin = (name: string) => {
    debounceSearchSkin(name);
  };

  return {
    /** 筛选后的列表 */
    filter_list,
    /** 性别筛选类型 */
    gender_type,
    /** price_type */
    price_type,
    /** 职业类型 */
    profession,
    /** 滚动坐标 */
    scroll,
    /** 排序类型，正序|倒序 */
    sort_type,
    /** 展示的列表 */
    show_list,
    /** 皮肤完整列表 */
    all_data,
    /** 皮肤筛选类型 */
    skin_type,
    getSkin: getSkinList,
    setProfessional,
    sortPrice,
    filterGender,
    sortAll,
    searchSkin,
    filterSkinType,
    sortType,
    loadMore,
    resetPage,
    setScroll,
  };
});

export { SkinStore };
