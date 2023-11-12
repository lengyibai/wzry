import { defineStore } from "pinia";
import { ref } from "vue";
import _debounce from "lodash/debounce";
import _cloneDeep from "lodash/cloneDeep";

import { API_HERO } from "@/api";
import { $bus, $tool } from "@/utils";
import { usePagingLoad } from "@/hooks";

/** @description 图集 */
const AtlasStore = defineStore("atlas", () => {
  const { all_data, resetPage, loadMore, setScroll, scroll, filter_list, show_list, finish } =
    usePagingLoad<Hero.AloneAtlas>();

  /** 当前排序类型 */
  const sort_type = ref("倒序");
  /** 职业类型 */
  const profession = ref<Hero.Profession>("全部");
  /** 当前性别排序类型 */
  const gender_type = ref<Gender>(0);

  /** @description 获取图集列表 */
  const getAtlasList = async () => {
    /** 用于模糊图片预加载 */
    const poster_blur: string[] = [];

    const res = await API_HERO.getHeroAtlas();

    res.forEach((hero) => {
      all_data.value.push({
        id: hero.id,
        cover: hero.cover,
        coverBlur: hero.coverBlur,
        poster: hero.poster,
        name: hero.name,
        heroName: "",
        type: "HERO",
        profession: hero.profession,
        gender: hero.gender,
        posterBlur: hero.posterBlur,
        posterBig: hero.posterBig,
      });
      poster_blur.push(hero.posterBlur);
      hero.skins.forEach((skin) => {
        all_data.value.push({
          id: hero.id,
          cover: skin.cover,
          coverBlur: skin.posterBlur,
          name: skin.name,
          heroName: hero.name,
          type: "SKIN",
          profession: hero.profession,
          gender: hero.gender,
          poster: skin.poster,
          posterBlur: skin.posterBlur,
          posterBig: skin.posterBig,
        });

        poster_blur.push(skin.posterBlur);
      });
    });

    $tool.preloadImages(poster_blur);

    sortAll();
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
        filter_list.value = [...all_data.value];
      } else {
        filter_list.value = all_data.value.filter((item: Hero.AloneAtlas) => {
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
    $bus.emit("watch-waterfall");
  };

  const debounceSearchAtlas = _debounce((name: string) => {
    if (name) {
      filter_list.value = $tool.search<Hero.AloneAtlas>(_cloneDeep(all_data.value), name, [
        "name",
        "heroName",
      ]);
      $bus.emit("watch-waterfall");
    } else {
      sortAll();
    }

    resetPage();
  }, 500);

  /** @description 搜索图集 */
  const searchAtlas = (name: string) => {
    debounceSearchAtlas(name);
  };

  return {
    /** 滚动坐标 */
    scroll,
    /** 展示的列表 */
    show_list,
    /** 职业类型 */
    profession,
    /** 排序方式 */
    sort_type,
    /** 暂无更多 */
    finish,
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
