import { ref } from "vue";
import { useRouter } from "vue-router";
import { getHeroDetail } from "@/api/main/games/hero";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";

export default (id: number | unknown) => {
  const $router = useRouter();
  const $heroStore = heroStore();

  const hero_info = ref<Hero.Data>($deepCopy(heroDefault)); //英雄信息
  const hero_list = ref<Hero.Data[]>([]); //英雄列表
  const show_HeroDetail = ref(false); //显示英雄详情
  const show_HeroSidebar = ref(false); //显示英雄分类侧边栏

  /* 获取列表 */
  const getList = (profession?: string) => {
    $heroStore.getHeroList(profession);
    show_HeroSidebar.value = true;
  };

  /* 查看详情 */
  const viewClick = (id: number) => {
    /* 获取指定英雄数据 */
    getHeroDetail(id).then((hero) => {
      /* 获取指定英雄皮肤 */
      hero_info.value = hero;
      $heroStore.setHeroInfo(hero_info.value);
      show_HeroDetail.value = true;

      /* 设置路由参数只用于记录，方便刷新时直接打开详情 */
      $router.push({
        path: "/hero",
        query: {
          id: hero_info.value.id,
        },
      });
      setTimeout(() => {
        /* 静默加载英雄列表 */
        if ($heroStore.profession === "") {
          getList($heroStore.hero_info.profession[0]);
        }
      }, 3000);
    });
  };

  /* 如果地址栏存在id，则打开查看详情 */
  if (id) {
    viewClick(Number(id));
  } else {
    getList();
  }

  return {
    hero_info,
    hero_list,
    show_HeroDetail,
    show_HeroSidebar,
    viewClick,
  };
};
