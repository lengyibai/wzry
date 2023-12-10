import { reactive } from "vue";
import dayjs from "dayjs";

import { AudioStore } from "@/store";

export default () => {
  const $audioStore = AudioStore();

  const ExposeData = {
    /** 消息队列 */
    messages: reactive<MsgText[]>([]),
  };
  const { messages } = ExposeData;

  const ExposeMethods = {
    msg(text = "未设置提示", type: MsgType = "info") {
      /** 获取文字长度 */
      const text_length = text.split("").length / 3;
      /** 通过文字长度，设置显示时长 */
      const time = text_length > 3 ? text_length : text_length + 1;

      //延迟提醒，避免与点击操作同时播放
      setTimeout(() => {
        const msgName = {
          info: "n74s",
          warning: "16vy",
          error: "vw31",
        };

        //播放指定名称的音效
        $audioStore.play(msgName[type]);

        //创建消息内容
        const msgText: MsgText = {
          id: dayjs().unix(),
          text,
          type,
        };

        //将消息内容添加进消息队列
        messages.unshift(msgText);
        setTimeout(() => {
          messages.pop();
        }, time * 1000);
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};
