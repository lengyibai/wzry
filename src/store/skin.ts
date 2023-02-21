import { ref } from "vue";
import { defineStore } from "pinia";

import { getSkin } from "@/api/main/games/skin";
import { getSkinType } from "@/api/main/games/skin";
import { $debounce, $search, $typeSort } from "@/utils";

/** @description 皮肤列表页 */
const skinStore = defineStore("skin", () => {
  const profession = ref(""); //职业类型
  const price_type = ref(""); //价格排序类型
  const skin_type = ref(""); //皮肤筛选类型
  const sort_type = ref("正序"); //排序类型
  const gender_type = ref(0); //性别筛选类型
  const skin_list = ref<Hero.Skin[]>([]); //皮肤列表
  const filter_list = ref<Hero.Skin[]>([]); //筛选后的列表
  const type_logo = ref<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >([]); //皮肤类型logo列表

  const scroll = ref(0); //滚动坐标
  const page = ref(1); //当前页数
  const page_total = ref(0); //总页数
  const page_count = ref(20); //一页显示的个数
  const show_list = ref<Hero.Skin[]>([]); //展示的列表

  /** @description 设置滚动坐标 */
  const setScroll = (v: number) => {
    scroll.value = v;
  };

  /** @description 重新计算分页 */
  const filterListChange = () => {
    page.value = 0;
    show_list.value = [];
    show_list.value = filter_list.value.slice(page.value * page_count.value, (page.value + 1) * page_count.value);
    page_total.value = Math.round(filter_list.value.length / page_count.value);
  };

  /** @description 加载更多 */
  const loadMore = () => {
    if (page_total.value > page.value) {
      page.value += 1;

      show_list.value.push(
        ...filter_list.value.slice(page.value * page_count.value, (page.value + 1) * page_count.value)
      );
    }
  };

  /** @description 获取皮肤列表并设置皮肤类型图片及类型命 */
  const getSkinList = async () => {
    const skinList = await getSkin();
    const skinType = await getSkinType();
    skinList.forEach((skin) => {
      const type = skinType.find((type) => type.id === skin.type)!;
      skin.type = type.link;
      skin.category = type.name;
      //设置备用名称，解决高亮问题
      skin.hero_name = skin.heroName;
      skin.skin_name = skin.name;
    });
    skin_list.value = skinList;
    setProfessional("全部");
  };

  /**
   * @description: 设置职业
   * @param p 职业名称
   */
  const setProfessional = (p: Hero.Profession) => {
    if (profession.value === p) return;
    profession.value = p;
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
   * @description: 皮肤类型筛选
   * @param type 皮肤类型名称
   */
  const filterType = (type: string) => {
    if (skin_type.value === type) return;
    skin_type.value = type;
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

  /**
   * @description: 性别筛选
   * @param type 性别标识符
   */
  const sortGender = (type: number) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /** @description 一键排序 */
  const sortAll = () => {
    scroll.value = 0;

    //职业筛选
    if (profession.value === "全部") {
      filter_list.value = [...skin_list.value]; //为了解决排序拷贝问题
    } else {
      filter_list.value = skin_list.value.filter((item: Hero.Skin) => {
        return item.profession.includes(profession.value);
      });
    }

    //性别筛选
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

    //价格排序
    const p = price_type.value;
    const noFree = ["贵族专属", "荣耀战令获取", "积分夺宝获取", "会员限定", "限时兑换", "星会员15级"];
    if (p && p !== "全部价格") {
      if (price_type.value === "免费") {
        const noNum: Hero.Skin[] = [];
        filter_list.value.forEach((item) => {
          if (!noFree.includes(item.price.toString()) && isNaN(Number(item.price))) noNum.push(item);
        });
        filter_list.value = $typeSort(noNum, "price");
      } else if (price_type.value === "价格由低到高") {
        const isNum: Hero.Skin[] = [];
        const noNum: Hero.Skin[] = [];
        filter_list.value.forEach((item) => {
          if (!isNaN(Number(item.price))) {
            isNum.push(item);
          } else {
            noNum.push(item);
          }
        });
        isNum.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
        filter_list.value = [...isNum, ...noNum];
      } else if (price_type.value === "价格由高到低") {
        const isNum: Hero.Skin[] = [];
        const strange: Hero.Skin[] = [];
        const noNum: Hero.Skin[] = [];
        filter_list.value.forEach((item) => {
          if (!isNaN(Number(item.price))) {
            isNum.push(item);
          } else {
            if (item.type.toString().indexOf("26.png") !== -1) {
              strange.push(item);
            } else {
              noNum.push(item);
            }
          }
        });
        isNum.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
        filter_list.value = [...strange, ...isNum, ...noNum];
      }
    }

    //皮肤类型筛选
    const s = skin_type.value;
    const alone = ["勇者", "史诗", "传说", "限定", "荣耀典藏", "KPL限定", "星传说", "五虎上将", "战令限定"];
    const multiple = [
      {
        label: "世冠",
        value: ["世冠2019", "世冠2020", "世冠2021", "世冠2022", "世冠2023"],
      },
      {
        label: "王者之证",
        value: ["2020王者之证", "2021王者之证", "2022王者之证"],
      },
      { label: "FMVP", value: ["FMVP/gold", "FMVP/blue"] },
      {
        label: "生肖限定",
        value: ["猴年限定", "鸡年限定", "狗年限定", "猪年限定", "鼠年限定", "牛年限定", "虎年限定", "兔年限定"],
      },
      {
        label: "情侣",
        value: [
          "情人节限定(zx)",
          "情人节限定(zz)",
          "情人节限定(z)",
          "情人节限定(dy)",
          "情人节限定(hc)",
          "情人节限定(m)",
          "情人节限定(yy)",
          "520限定(sd)",
        ],
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
        ],
      },
      { label: "五五节", value: ["五五开黑节", "五五朋友节"] },
      {
        label: "赛季专属",
        value: [
          "S3赛季专属",
          "S4赛季专属",
          "S5赛季专属",
          "S6赛季专属",
          "S7赛季专属",
          "S8赛季专属",
          "S9赛季专属",
          "S10赛季专属",
          "S11赛季专属",
          "S12赛季专属",
          "S13赛季专属",
          "S14赛季专属",
          "S15赛季专属",
          "S16赛季专属",
          "S17赛季专属",
          "S18赛季专属",
          "S19赛季专属",
          "S20赛季专属",
          "S21赛季专属",
          "S22赛季专属",
          "S23赛季专属",
          "S24赛季专属",
          "S25赛季专属",
          "S26赛季专属",
          "S27赛季专属",
          "S28赛季专属",
          "S29赛季专属",
          "S30赛季专属",
        ],
      },
      {
        label: "其他专属",
        value: ["必胜客专属", "新春专属", "信誉专属", "源梦", "活动专属", "星会员专属"],
      },
      {
        label: "特殊标志",
        value: ["御龙在天", "国家宝藏", "敦煌研究院", "永宁纪"],
      },
      { label: "团战精神", value: ["沉稳", "敏锐", "掌控", "守护", "坚韧"] },
      {
        label: "正版授权",
        value: ["梅西正版授权", "DC正版授权", "圣斗士星矢正版授权", "SNK正版授权", "西游记86版正版授权"],
      },
      {
        label: "周年限定",
        value: ["1周年限定", "2周年限定", "3周年限定", "4周年限定", "5周年限定", "6周年限定", "7周年限定"],
      },
    ];
    if (s && s !== "全部类型") {
      if (alone.includes(s)) {
        filter_list.value = filter_list.value.filter((item) => {
          return item.category === s;
        });
      } else {
        multiple.forEach((item) => {
          if (s === item.label) {
            filter_list.value = filter_list.value.filter((skin) => {
              return item.value.includes(skin.category || "");
            });
          }
        });
      }
      filter_list.value = $typeSort(filter_list.value, "category");
    }

    //正序/倒序
    if (sort_type.value === "倒序") {
      filter_list.value.reverse();
    }

    filterListChange();
  };

  /** @description 搜索皮肤 */
  const searchSkin = (name: string) => {
    $debounce(() => {
      if (name) {
        filter_list.value = $search(skin_list.value, name, ["skin_name", "hero_name", "category"], true);
      } else {
        sortAll();
      }

      filterListChange();
    }, 500);
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
    skin_list,
    /** 皮肤筛选类型 */
    skin_type,
    /** 皮肤类型logo列表 */
    type_logo,
    getSkin: getSkinList,
    setProfessional,
    sortPrice,
    sortGender,
    sortAll,
    searchSkin,
    filterType,
    sortType,
    loadMore,
    filterListChange,
    setScroll,
  };
});

export default skinStore;
export type SkinStore = ReturnType<typeof skinStore>;
