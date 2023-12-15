import { ref } from "vue";

import { API_DATA, API_HERO, API_HERO_INFO } from "@/api";
import { CONFIG } from "@/config";
import { ResultData } from "@/api/interface";

/** @description 初次进入网站下载数据 */
const useGetData = () => {
  const requests: [string, () => Promise<ResultData<unknown>>, string][] = [
    [CONFIG.LOCAL_KEY.USER_LIST, API_DATA.User, "用户"],
    [CONFIG.LOCAL_KEY.HERO_PINYIN, API_DATA.HeroPinyin, "英雄拼音"],
    [CONFIG.LOCAL_KEY.HERO_GENDER, API_DATA.HeroGender, "英雄性别"],
    [CONFIG.LOCAL_KEY.HERO_NAME, API_DATA.HeroName, "英雄名"],
    [CONFIG.LOCAL_KEY.HERO_HEAD, API_DATA.HeroHead, "英雄头像"],
    [CONFIG.LOCAL_KEY.HERO_IMAGE, API_DATA.HeroImage, "英雄图片"],
    [CONFIG.LOCAL_KEY.HERO_ATLAS, API_DATA.HeroAtlas, "英雄图集"],
    [CONFIG.LOCAL_KEY.SKIN_IMAGE, API_DATA.SkinImage, "皮肤图片"],
    [CONFIG.LOCAL_KEY.HERO_DATA, API_DATA.Herodata, "英雄信息"],
    [CONFIG.LOCAL_KEY.HERO_PROFESSION, API_DATA.HeroProfession, "英雄职业"],
    [CONFIG.LOCAL_KEY.SKILL, API_DATA.Skill, "技能列表"],
    [CONFIG.LOCAL_KEY.SKILL_TYPE, API_DATA.Skilltype, "技能类型"],
    [CONFIG.LOCAL_KEY.SKILL_EFFECT, API_DATA.Skilleffect, "技能效果"],
    [CONFIG.LOCAL_KEY.SKIN, API_DATA.Skin, "皮肤"],
    [CONFIG.LOCAL_KEY.SKIN_TYPE, API_DATA.Skintype, "皮肤类型"],
    [CONFIG.LOCAL_KEY.RELATIONSHIP, API_DATA.Relationship, "关系"],
    [CONFIG.LOCAL_KEY.EQUIP, API_DATA.Equip, "装备"],
    [CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC, API_DATA.EquipSynthetic, "装备合成"],
    [CONFIG.LOCAL_KEY.EQUIP_TYPE, API_DATA.Equiptype, "装备类型"],
    [CONFIG.LOCAL_KEY.EQUIP_EFFECT, API_DATA.Equipeffect, "装备效果"],
    [CONFIG.LOCAL_KEY.EPIGRAPH, API_DATA.Epigraph, "铭文"],
    [CONFIG.LOCAL_KEY.EPIGRAPH_TYPE, API_DATA.Epigraphtype, "铭文类型"],
    [CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT, API_DATA.Epigrapheffect, "铭文效果"],
    [CONFIG.LOCAL_KEY.PROFESSION_TYPE, API_DATA.Professiontype, "职业"],
    [CONFIG.LOCAL_KEY.LOCATION_TYPE, API_DATA.Locationtype, "定位"],
    [CONFIG.LOCAL_KEY.SPECIALTY_TYPE, API_DATA.Specialtytype, "特长"],
    [CONFIG.LOCAL_KEY.PERIOD_TYPE, API_DATA.Periodtype, "时期"],
    [CONFIG.LOCAL_KEY.CAMP_TYPE, API_DATA.Camptype, "阵营"],
    [CONFIG.LOCAL_KEY.RACE_TYPE, API_DATA.RaceType, "种族"],
  ];

  const ExposeData = {
    /** 请求总数 */
    total: ref(0),
    /** 用于计算下载进度 */
    index: ref(1),
    /** 正在下载的数据类型 */
    type: ref("基础数据"),
    /** 请求结束 */
    finish: ref(false),
  };
  const { total, index, type, finish } = ExposeData;

  /* 将数据写入本地存储 */
  const setData = <T extends { data: unknown }>(name: string, data: T) => {
    localStorage.setItem(name, JSON.stringify(data.data));
  };

  /* 判断本地是否存在数据 */
  const isExist = (name: string, prefix = "") => {
    return !!localStorage.getItem(prefix + name);
  };

  /* 获取数据 */
  (async function getData() {
    total.value = requests.length;

    /* 下载数据 */
    //收集处理请求
    const data_requests = requests.map(async ([key, request]) => {
      //如果本地存储不存在，则下载数据并存储
      if (!isExist(key)) {
        setData(key, await request());
        index.value++;
      }
    });
    await Promise.all(data_requests);

    const hero_list = await API_HERO.getHeroName();
    //减2是为了忽略掉没有语音的盾山和梦奇，否则进度会出现错误
    total.value = hero_list.length - 2;

    /* 下载语音数据 */
    type.value = "语音包";
    index.value = 0;
    //收集处理请求
    const voice_requests = hero_list.map(async (item) => {
      //如果不是梦奇和盾山，并且本地不存在英雄语音，则请求
      if (!["梦奇", "盾山"].includes(item.name)) {
        const pinyin = await API_HERO_INFO.getHeroPinyin(item.id);
        const voices = (await API_DATA.Voice(item.id)).data;

        if (!isExist(pinyin, "voice_")) {
          setData(`voice_${pinyin}`, {
            data: voices,
          });
          type.value = `${item.name}语音`;
          index.value++;
        }
      }
    });
    await Promise.all(voice_requests);

    finish.value = true;
  })();

  return ExposeData;
};

export { useGetData };
