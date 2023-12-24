import { ref } from "vue";

import { API_DATA, KVP_HERO, LOCAL_HERO } from "@/api";
import { LOCAL_KEY, REQUEST } from "@/config";

/** @description 初次进入网站下载数据 */
const useGetData = () => {
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
    alert("执行下载");
    total.value = REQUEST.length;

    /* 下载数据 */
    //收集处理请求
    const data_requests = REQUEST.map(async (item) => {
      const [key, request] = item;
      //如果本地存储不存在，则下载数据并存储
      if (!isExist(key)) {
        setData(key, await request());
        index.value++;
      }
    });
    await Promise.all(data_requests);

    const hero_names = LOCAL_HERO.getHeroNameList();
    //减2是为了忽略掉没有语音的盾山和梦奇，否则进度会出现错误
    total.value = hero_names.length - 2;

    /* 下载语音数据 */
    type.value = "语音包";
    index.value = 0;
    //收集处理请求
    const voice_requests = hero_names.map(async (item) => {
      //如果不是梦奇和盾山，并且本地不存在英雄语音，则请求
      if (!["梦奇", "盾山"].includes(item.value)) {
        const pinyin = KVP_HERO.getHeroPinyinKvp()[item.id];

        //检测本地是否存在语音丢失
        if (!isExist(pinyin, LOCAL_KEY.VOICE)) {
          const voices = (await API_DATA.Voice(pinyin)).data;
          setData(`voice_${pinyin}`, {
            data: voices,
          });
          type.value = `${item.value}语音`;
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
