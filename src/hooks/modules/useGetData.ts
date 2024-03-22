import { ref } from "vue";

import { useIndexedDB } from "./useIndexedDB";
import { useDataFinish } from "./useDataFinish";

import { API_DATA, KVP_HERO, LOCAL_HERO } from "@/api";
import { $msgTipText, $tipText, REQUEST } from "@/config";
import { $message, $tip } from "@/utils/busTransfer";
import { ResultData } from "@/api/interface";
import { _retryRequest } from "@/utils/tool";

/** @description 下载数据 */
const useGetData = () => {
  const { BaseData, VoiceData } = useIndexedDB();

  const ExposeData = {
    /** 请求总数 */
    total: ref(0),
    /** 用于计算下载进度 */
    index: ref(0),
    /** 正在下载的数据类型 */
    type: ref(""),
    /** 请求结束 */
    finish: ref(false),
  };
  const { total, index, type, finish } = ExposeData;

  /* 将数据写入本地存储 */
  const setData = async (name: string, data: any, type: "BASE" | "VOICE") => {
    const setItem = type === "BASE" ? BaseData.setItem : VoiceData.setItem;
    await setItem(name, data);
  };

  /* 判断本地是否存在数据 */
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
          type.value = `${item[0]}`;
          await setData(item[0], res.data, "BASE");
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: item[0] }), "error");
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
          type.value = `${item[0]}语音`;
          await setData(item[0], res.data, "VOICE");
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: item[0] + "语音" }), "error");
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
      type.value = "基础数据";
      const data = await getLacksData();
      total.value = data.data_lacks.length;
      await Promise.all(data.data_requests);

      type.value = "语音包";
      index.value = 0;
      const voice = await getLacksVoice();
      total.value = voice.voice_lacks.length;
      await Promise.all(voice.voice_requests);
      finish.value = true;

      const data_lacks_text = data.data_lacks.map((item) => item[0]);
      const voice_lacks_text = voice.voice_lacks.map((item) => item[0]);
      getLogTip(silent, data_lacks_text, voice_lacks_text);

      useDataFinish.readyDataResolve();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGetData };
