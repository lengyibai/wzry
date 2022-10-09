import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getHero } from '@/api/main/hero/self/index.js';
import switchStore from '@/store/globalSwitch.js';
import heroStore from '@/store/hero.js';

//#####··········资料聚合处理··········#####//
/* 详细信息 */
//英雄故事
import { getGameStory } from '@/api/main/hero/gameStory/index.js';
//历史故事
import { getHistory } from '@/api/main/hero/history/index.js';
//语音列表
import { getVoice } from '@/api/main/hero/voice/index.js';
//皮肤列表
import { getSkin } from '@/api/main/hero/skin/index.js';
//技能列表
import { getSkill } from '@/api/main/hero/skill/index.js';

export default (id) => {
  const $router = useRouter();
  const $switchStore = switchStore();
  const $heroStore = heroStore();
  const show_HeroDetail = ref(false); //显示英雄详情
  const show_HeroSidebar = ref(false); //显示英雄分类侧边栏
  const hero_info = ref({}); //英雄信息
  const hero_list = ref([]); //英雄列表

  /* 获取列表 */
  const getList = () => {
    getHero().then(async (res) => {
      await $switchStore.$loading.close();
      await $heroStore.setHeroList(res.data);
      show_HeroSidebar.value = true;
    });
  };

  /* 查看详情 */
  const viewClick = (id) => {
    $switchStore.$loading.show('正在请求英雄数据');
    const params = { id };
    const k2 = ['voices', 'skills', 'gameStory', 'history'];
    const r2 = [getVoice, getSkill, getGameStory, getHistory];
    getHero(params).then(async (res) => {
      const data = res.data[0];
      await $switchStore.$loading.close();
      for (let i = 0; i < r2.length; i++) {
        data[k2[i]] = (await r2[i](params)).data[0]?.data;
      }
      data.skins = (await getSkin(params)).data;
      hero_info.value = data;
      $heroStore.hero_info = data;
      await $switchStore.$loading.close();
      show_HeroDetail.value = true;

      /* 参数只用于记录，并不会跳转 */
      $router.push({
        path: '/hero',
        query: {
          id: hero_info.value.id,
        },
      });
      /* 静默加载列表 */
      getList();
    });
  };

  /* 如果地址栏有id则查看详情 */
  if (id) {
    viewClick(id);
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
