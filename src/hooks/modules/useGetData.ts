import { computed, ref } from "vue";

import { useIndexedDB } from "./useIndexedDB";

import { API_DATA, KVP_HERO, LOCAL_HERO } from "@/api";
import { $msgTipText, $tipText, REQUEST } from "@/config";
import { $tip } from "@/utils/busTransfer";
import { ResultData } from "@/api/interface";
import { _retryRequest } from "@/utils/tool";

/** @description 下载数据 */
const useGetData = () => {
  const { BaseData, VoiceData } = useIndexedDB();

  /** 请求总数 */
  const total = ref(0);
  /** 用于计算下载进度 */
  const index = ref(0);

  const ExposeData = {
    /** 正在下载的数据类型 */
    type: ref(""),
    /** 请求结束 */
    finish: ref(false),
  };
  const { type, finish } = ExposeData;

  const ExposeComputed = {
    /** 下载进度百分比 */
    progress: computed(() => {
      return ((index.value / total.value || 0) * 100).toFixed(0) + "%";
    }),
  };

  /**
   * @description 将数据写入数据库
   * @param name 数据名称
   * @param data 数据
   * @param type 数据类型
   */
  const setData = async (name: string, data: any, type: "BASE" | "VOICE") => {
    const setItem = type === "BASE" ? BaseData.setItem : VoiceData.setItem;
    await setItem(name, data);
  };

  /**
   * @description 判断本地是否存在数据
   * @param name数据名称
   * @param type 数据类型
   */
  const isExist = async (name: string, type: "BASE" | "VOICE") => {
    const getItem = type === "BASE" ? BaseData.getItem : VoiceData.getItem;
    return !!(await getItem(name));
  };

  /* 收集缺失的数据 */
  const getLacksData = async () => {
    /** 缺失的数据 */
    const data_lacks: [string, () => Promise<ResultData<unknown>>][] = [];

    //循环判断收集
    for (let i = 0; i < REQUEST.length; i++) {
      const item = REQUEST[i];

      //判断本地是否存在，不存在则收集
      const is_exist = await isExist(item[0], "BASE");
      if (!is_exist) {
        data_lacks.push([item[0], item[1]]);
      }
    }

    //整合请求，请求成功后存入本地，并追加索引
    const data_requests = data_lacks.map(async (item) => {
      //请求错误重连
      await _retryRequest({
        promiseFn: item[1],
      })
        .then(async (res) => {
          type.value = `正在下载${item[0]}`;
          await setData(item[0], res.data, "BASE");
        })
        .catch(() => {
          alert($msgTipText("rc53", { v: item[0] }));
        })
        .finally(() => {
          index.value++;
        });
    });

    return {
      data_lacks,
      data_requests,
    };
  };

  /* 收集缺少的语音 */
  const getLacksVoice = async () => {
    /** 丢失的语音 */
    const voice_lacks: [string, () => Promise<ResultData<Remote.Voice.Data[]>>][] = [];

    const hero_names = await LOCAL_HERO.getHeroNameList();

    for (let i = 0; i < hero_names.length; i++) {
      const item = hero_names[i];

      //判断本地是否存在，不存在则收集
      const is_exist = await isExist(item.value, "VOICE");
      if (!is_exist && !["梦奇", "盾山"].includes(item.value)) {
        const pinyin = (await KVP_HERO.getHeroPinyinKvp())[item.id];
        voice_lacks.push([item.value, () => API_DATA.Voice(pinyin)]);
      }
    }

    //整合请求，请求成功后存入本地，并追加索引
    const voice_requests = voice_lacks.map(async (item) => {
      //请求错误重连
      await _retryRequest({
        promiseFn: item[1],
      })
        .then(async (res) => {
          type.value = `正在下载${item[0]}语音`;
          await setData(item[0], res.data, "VOICE");
        })
        .catch(() => {
          alert($msgTipText("rc53", { v: item[0] + "语音" }));
        })
        .finally(() => {
          index.value++;
        });
    });

    return {
      voice_lacks,
      voice_requests,
    };
  };

  /* 生成日志Tip */
  const getLogTip = (silent: boolean, data_lacks: string[], voice_lacks: string[]) => {
    if (silent && (data_lacks.length || voice_lacks.length)) {
      if (data_lacks.length) {
        const data_text = data_lacks.join("、");
        $tip({
          text: $tipText("zd98", { t: "数据", v: data_text }),
        });
      }

      if (voice_lacks.length) {
        const voice_text = voice_lacks.join("、");
        $tip({
          text: $tipText("zd98", { t: "语音", v: voice_text }),
        });
      }
    }
  };

  const ExposeMethods = {
    /**
     * @description 获取数据
     * @param silent 是否显示数据缺失提示
     */
    async getData(silent: boolean = false) {
      index.value = 0;
      type.value = "准备下载基础数据";
      const data = await getLacksData();
      total.value = data.data_lacks.length;
      await Promise.all(data.data_requests);

      type.value = "准备下载语音包";
      index.value = 0;
      const voice = await getLacksVoice();
      total.value = voice.voice_lacks.length;
      await Promise.all(voice.voice_requests);
      finish.value = true;
      type.value = "加载完毕，祝你体验愉快。";
      //将索引和总数设为1是为了避免没有缺失数据时，再0%的时候显示所有资源下载完毕，不美观
      index.value = 1;
      total.value = 1;

      const data_lacks_text = data.data_lacks.map((item) => item[0]);
      const voice_lacks_text = voice.voice_lacks.map((item) => item[0]);
      getLogTip(silent, data_lacks_text, voice_lacks_text);
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
};

export { useGetData };
