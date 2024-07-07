import { defineStore } from "pinia";
import { ref } from "vue";

import { usePagingLoad } from "@/hooks";
import { GAME_HERO } from "@/api";
import { $bus } from "@/utils/eventBus";
import { _cloneDeep, _search } from "@/utils/tool";

/** @description 图集 */
const AtlasStore = defineStore("atlas", () => {
  const $usePagingLoad = usePagingLoad<Game.Hero.AloneAtlas>();
  const { all_data, setFilterData, filter_list } = $usePagingLoad;

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
    profession: ref<Game.Hero.Profession>("全部"),
    /** 当前性别排序类型 */
    gender_type: ref<Game.GenderId>(0),
  };
  const { sort_type, profession, gender_type } = ExposeData;

  /** @description 一键排序 */
  const sortAll = () => {
    $usePagingLoad.setScroll(0);

    /** 职业筛选 */
    const filterProfession = () => {
      if (profession.value === "全部") {
        //为了解决排序拷贝问题
        setFilterData([...all_data.value]);
      } else {
        const data = all_data.value.filter((item: Game.Hero.AloneAtlas) => {
          return item.profession.includes(profession.value!);
        });
        setFilterData(data);
      }
    };

    /** 性别筛选 */
    const filterGender = () => {
      const boy: Game.Hero.AloneAtlas[] = [];
      const girl: Game.Hero.AloneAtlas[] = [];

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
    $bus.emit("update-waterfall");
  };
  const ExposeMethods = {
    /** @description 设置滚动坐标 */
    setScroll: $usePagingLoad.setScroll,
    /** @description 加载更多 */
    loadMore: $usePagingLoad.loadMore,

    /** @description 获取图集列表 */
    async getAtlasList() {
      const hero_atlas = await GAME_HERO.getHeroAtlas();
      const data: Game.Hero.AloneAtlas[] = [];

      hero_atlas.forEach((hero) => {
        data.push({
          id: hero.id,
          cover: hero.cover,
          coverBlur: hero.coverBlur,
          poster: hero.poster,
          name: hero.name,
          heroName: "",
          heroId: hero.id,
          type: "HERO",
          profession: hero.profession,
          gender: hero.gender,
          posterBlur: hero.posterBlur,
          posterBig: hero.posterBig,
        });

        hero.skins.forEach((skin) => {
          data.push({
            id: skin.id,
            heroId: hero.id,
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
        });
      });

      $usePagingLoad.pushAllData(data);
      sortAll();
    },

    /**
     * @description: 职业筛选
     * @param name 职业名称
     */
    setProfessional(name: Game.Hero.Profession) {
      if (profession.value === name) return;
      profession.value = name;
      sortAll();
    },

    /**
     * @description: 性别筛选
     * @param name 性别标识符
     */
    filterGender(name: Game.GenderId) {
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

    /** @description 搜索图集
     * @param name 搜索名称
     */
    searchAtlas(name: string) {
      sort_type.value = "倒序";
      profession.value = "全部";
      gender_type.value = 0;

      const { all_data, setFilterData } = $usePagingLoad;

      //如果搜索的值不为空，则进行搜索，否则重新排序
      if (name) {
        const data = _search<Game.Hero.AloneAtlas>(_cloneDeep(all_data.value), name, [
          "name",
          "heroName",
        ]);
        setFilterData(data);

        $bus.emit("update-waterfall");
      } else {
        sortAll();
      }

      $usePagingLoad.resetPage();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AtlasStore };
