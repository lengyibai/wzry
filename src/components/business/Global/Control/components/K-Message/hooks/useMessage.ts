import { reactive } from "vue";

import { usePlayAudio } from "@/hooks";
import { dayjs } from "@/utils/tool";

const ExposeData = {
  /** 消息队列 */
  messages: reactive<Global.Message.Info[]>([]),
};
const { messages } = ExposeData;

export const useMessage = () => {
  const { playAudio } = usePlayAudio();

  const ExposeMethods = {
    openMsg(text = "未设置提示", type: Global.Message.Status = "info") {
      /** 获取文字长度 */
      const text_length = text.split("").length / 3;
      /** 通过文字长度，设置显示时长 */
      const time = text_length > 3 ? text_length : text_length + 1;

      //延迟提醒，避免与点击操作同时播放
      const msgName: Record<string, Partial<keyof Global.Audio.Key>> = {
        info: "n74s",
        warning: "p6q3",
        error: "vw31",
      };

      //播放指定名称的音效
      playAudio(msgName[type]);

      //创建消息内容
      const msgText: Global.Message.Info = {
        id: dayjs().valueOf(),
        text,
        type,
        duration: time,
      };

      //将消息内容添加进消息队列
      messages.unshift(msgText);
      setTimeout(() => {
        messages.pop();
      }, time * 1000);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};
