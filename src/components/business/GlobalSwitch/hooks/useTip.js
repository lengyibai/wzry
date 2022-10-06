import { reactive } from 'vue';

export default (store) => {
  const messages = reactive([]); //消息队列
  const tip = (text = '未设置提示', type = 'info') => {
    const text_length = text.split('').length / 3; //获取文字长度
    const time = text_length > 3 ? text_length : text_length + 1; //通过文字长度，设置显示时长
    /* 延迟提醒，避免与点击操作同时播放 */
    setTimeout(() => {
      const obj = {
        info: '消息提示',
        warning: '警告提示',
        error: '错误提示',
      };
      store.$clickAudio(obj[type]);
      messages.unshift({
        id: new Date().getTime(),
        text,
        type,
      });
      setTimeout(() => {
        messages.pop();
      }, time * 1000);
    });
  };

  store.$patch({
    $tip: tip,
  });

  return {
    messages,
    tip,
  };
};
