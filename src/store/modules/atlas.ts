import { defineStore } from "pinia";
import { Ref, nextTick, ref } from "vue";

import { API_HERO } from "@/api";
import { $tool } from "@/utils";

/** @description 图集 */
const AtlasStore = defineStore("atlas", () => {
  /** 当前页数 */
  let page = 0;
  /** 总页数 */
  let page_total = 0;
  /** 一页个数 */
  const page_count = 25;

  /** 滚动坐标 */
  const scroll = ref(0);
  /** 当前排序类型 */
  const sort_type = ref("倒序");
  /** 职业类型 */
  const profession = ref<Hero.Profession>("全部");
  /** 当前性别排序类型 */
  const gender_type = ref<Gender>(0);
  /** 图集完整列表 */
  const hero_atlas = ref<Hero.AloneAtlas[]>([]);
  /** 筛选后的列表 */
  const filter_list = ref<Hero.AloneAtlas[]>([]);
  /** 展示的列表 */
  const show_list = ref<Hero.AloneAtlas[]>([]);

  /**
   * @description: 设置滚动坐标
   * @param v y轴坐标
   */
  const setScroll = (v: number) => {
    scroll.value = v;
  };

  /** @description 获取图集列表 */
  const getAtlasList = async () => {
    const res = await API_HERO.getHeroAtlas();
    res.forEach((hero) => {
      hero_atlas.value.push({
        id: hero.id,
        cover: hero.cover,
        poster: hero.poster,
        name: hero.name,
        heroName: hero.name,
        type: "HERO",
        profession: hero.profession,
        gender: hero.gender,
      });
      hero.skins.forEach((skin) => {
        hero_atlas.value.push({
          id: hero.id,
          cover: skin.cover,
          poster: skin.poster,
          name: skin.name,
          heroName: hero.name,
          type: "SKIN",
          profession: hero.profession,
          gender: hero.gender,
        });
      });
    });

    sortAll();
  };

  /** @description 每次筛选后重新计算分页 */
  const resetPage = () => {
    page = 0;
    show_list.value = [];
    show_list.value = filter_list.value.slice(page * page_count, (page + 1) * page_count);
    page_total = Math.round(filter_list.value.length / page_count);
  };

  /** @description 加载更多 */
  const loadMore = (waterfallRef: Ref<any>) => {
    if (page_total > page) {
      page += 1;
      show_list.value.push(...filter_list.value.slice(page * page_count, (page + 1) * page_count));
    }

    nextTick(() => {
      waterfallRef.value?.updateLoad();
    });
  };

  /**
   * @description: 职业筛选
   * @param name 职业名称
   */
  const setProfessional = (name: Hero.Profession) => {
    if (profession.value === name) return;
    profession.value = name;
    sortAll();
  };

  /**
   * @description: 性别筛选
   * @param name 性别标识符
   */
  const filterGender = (name: Gender) => {
    if (gender_type.value === name) return;
    gender_type.value = name;
    sortAll();
  };

  /**
   * @description: 正序|倒序
   * @param type 排序名称
   */
  const sortType = (name: string) => {
    if (sort_type.value === name) return;
    sort_type.value = name;
    sortAll();
  };

  /** @description 一键排序 */
  const sortAll = () => {
    scroll.value = 0;

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        filter_list.value = [...hero_atlas.value];
      } else {
        filter_list.value = hero_atlas.value.filter((item: Hero.AloneAtlas) => {
          return item.profession.includes(profession.value!);
        });
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Hero.AloneAtlas[] = [];
      const girl: Hero.AloneAtlas[] = [];
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

    /** 正/倒排序 */
    const sortType = () => {
      if (sort_type.value === "倒序") {
        filter_list.value.reverse();
      }
    };

    filterProfession();
    filterGender();
    sortType();
    resetPage();
  };

  /** @description 搜索图集 */
  const searchAtlas = (name: string) => {
    $tool.debounce(() => {
      if (name) {
        filter_list.value = $tool.search<Hero.AloneAtlas>(hero_atlas.value, name, ["name", "heroName"], true);
      } else {
        sortAll();
      }

      resetPage();
    }, 500);
  };

  return {
    /** 展示的列表 */
    show_list,
    /** 职业类型 */
    profession,
    /** 排序方式 */
    sort_type,
    setScroll,
    loadMore,
    getAtlasList,
    sortType,
    setProfessional,
    filterGender,
    searchAtlas,
  };
});

export { AtlasStore };
