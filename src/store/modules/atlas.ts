import { defineStore } from "pinia";
import { ref } from "vue";
import _debounce from "lodash/debounce";
import _cloneDeep from "lodash/cloneDeep";

import { $bus, $tool } from "@/utils";
import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";

/** @description 图集 */
const AtlasStore = defineStore("atlas", () => {
  const $usePagingLoad = usePagingLoad<Hero.AloneAtlas>();

  /** @description 一键排序 */
  const sortAll = () => {
    $usePagingLoad.setScroll(0);

    /** 职业筛选 */
    const filterProfession = () => {
      const { all_data, setFilterData } = $usePagingLoad;
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        setFilterData([...all_data.value]);
      } else {
        const data = all_data.value.filter((item: Hero.AloneAtlas) => {
          return item.profession.includes(profession.value!);
        });
        setFilterData(data);
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const { filter_list, setFilterData } = $usePagingLoad;

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
        setFilterData(boy);
      } else if (gender_type.value === 2) {
        setFilterData(girl);
      }
    };

    /** 正/倒排序 */
    const sortType = () => {
      if (sort_type.value === "倒序") {
        $usePagingLoad.reverseFilterData();
      }
    };

    filterProfession();
    filterGender();
    sortType();
    $usePagingLoad.resetPage();
    $bus.emit("watch-waterfall");
  };

  /** @description 搜索图集 */
  const debounceSearchAtlas = _debounce((name: string) => {
    const { all_data, setFilterData } = $usePagingLoad;

    //如果搜索的值不为空，则进行搜索，否则重新排序
    if (name) {
      const data = $tool.search<Hero.AloneAtlas>(_cloneDeep(all_data.value), name, [
        "name",
        "heroName",
      ]);
      setFilterData(data);

      $bus.emit("watch-waterfall");
    } else {
      sortAll();
    }

    $usePagingLoad.resetPage();
  }, 500);

  const ExposeData = {
    /** 滚动坐标 */
    scroll: $usePagingLoad.scroll,
    /** 是否处于加载中 */
    loading: $usePagingLoad.loading,
    /** 暂无更多 */
    finish: $usePagingLoad.finish,
    /** 展示的数据列表 */
    show_list: $usePagingLoad.show_list,

    /** 当前排序类型 */
    sort_type: ref("倒序"),
    /** 职业类型 */
    profession: ref<Hero.Profession>("全部"),
    /** 当前性别排序类型 */
    gender_type: ref<Gender>(0),
  };
  const { sort_type, profession, gender_type } = ExposeData;

  const ExposeMethods = {
    /** @description 设置滚动坐标 */
    setScroll: $usePagingLoad.setScroll,
    /** @description 加载更多 */
    loadMore: $usePagingLoad.loadMore,

    /* 获取图集列表 */
    getAtlasList() {
      //用于模糊图片预加载
      const poster_blur: string[] = [];

      const hero_atlas = GAME_HERO.getHeroAtlas();

      hero_atlas.forEach((hero) => {
        $usePagingLoad.pushAllData({
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
          $usePagingLoad.pushAllData({
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
    },

    /**
     * @description: 职业筛选
     * @param name 职业名称
     */
    setProfessional(name: Hero.Profession) {
      if (profession.value === name) return;
      profession.value = name;
      sortAll();
    },

    /**
     * @description: 性别筛选
     * @param name 性别标识符
     */
    filterGender(name: Gender) {
      if (gender_type.value === name) return;
      gender_type.value = name;
      sortAll();
    },

    /**
     * @description: 正序|倒序
     * @param type 排序名称
     */
    sortType(name: string) {
      if (sort_type.value === name) return;
      sort_type.value = name;
      sortAll();
    },

    /** @description 搜索图集 */
    searchAtlas(name: string) {
      debounceSearchAtlas(name);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AtlasStore };
