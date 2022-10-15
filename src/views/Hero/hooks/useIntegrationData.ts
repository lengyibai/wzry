import { ref } from 'vue';
import { getHero, getSkin } from '@/api/main/game';
import { useRouter } from 'vue-router';
import { Hero } from '@/interface/hero';
import { hero } from '@/interface/defaults';
import heroStore from '@/store/hero';
import switchStore from '@/store/globalSwitch';

export default (id: number | unknown) => {
  const $router = useRouter();
  const $switchStore = switchStore();
  const $heroStore = heroStore();

  const hero_info = ref<Hero>(hero); //英雄信息
  const hero_list = ref<Hero[]>([]); //英雄列表
  const show_HeroDetail = ref(false); //显示英雄详情
  const show_HeroSidebar = ref(false); //显示英雄分类侧边栏

  /* 获取列表 */
  const getList = () => {
    getHero().then(async (res) => {
      await $switchStore.$loading.close();
      $heroStore.setHeroList(res.data);
      show_HeroSidebar.value = true;
    });
  };

  /* 查看详情 */
  const viewClick = (id: number) => {
    $switchStore.$loading.show('正在请求英雄数据');
    const params = { id };
    /* 获取指定英雄数据 */
    getHero(params).then(async (res) => {
      const data = res.data[0];
      hero_info.value = data;
      hero_info.value.skins = (await getSkin(params)).data; //获取并设置英雄皮肤列表
      $heroStore.hero_info = data;
      await $switchStore.$loading.close();
      show_HeroDetail.value = true;

      /* 设置路由参数只用于记录，方便刷新时直接打开详情 */
      $router.push({
        path: '/hero',
        query: {
          id: hero_info.value.id,
        },
      });
      /* 静默加载英雄列表 */
      getList();
    });
  };

  /* 如果地址栏存在id，则打开查看详情 */
  if (id) {
    viewClick(Number(id));
  } else {
    $switchStore.$loading.show('正在请求英雄列表');
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
