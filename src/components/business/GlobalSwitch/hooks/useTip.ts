import { reactive } from "vue";
import { MsgText } from "../interface";

export default ($store: any) => {
  const messages = reactive<MsgText[]>([]); //消息队列
  const tip = (text = "未设置提示", type = "info") => {
    const text_length = text.split("").length / 3; //获取文字长度
    const time = text_length > 3 ? text_length : text_length + 1; //通过文字长度，设置显示时长
    // 延迟提醒，避免与点击操作同时播放
    setTimeout(() => {
      const msgName: Record<string, string> = {
        info: "消息提示",
        warning: "警告提示",
        error: "错误提示",
      };
      $store.$clickAudio(msgName[type]); //播放指定名称的音效

      // 创建消息内容
      const msgText: MsgText = {
        id: new Date().getTime(),
        text,
        type,
      };

      // 将消息内容添加进消息队列
      messages.unshift(msgText);
      setTimeout(() => {
        messages.pop();
      }, time * 1000);
    });
  };

  return { messages, tip };
};
