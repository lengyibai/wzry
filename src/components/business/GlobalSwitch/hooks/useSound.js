import { ref } from 'vue';

export default (store) => {
  const sound_name = ref('default'); //音效名
  // 音效类型
  const sound_type = {
    default: ['默认'],
    tab: ['tab'],
    login: ['login'],
    模式选择: ['/home'],
    查看详情: ['/system/hero'],
    皮肤相关: ['/system/skin'],
    装备相关: ['/system/equip', '/equip', '/system/epigraph'],
    英雄列表: ['/hero'],
    查看: ['查看'],
    确定: ['确定'],
    关闭: ['关闭'],
    取消: ['取消'],
    消息提示: ['消息提示'],
    警告提示: ['警告提示'],
    错误提示: ['错误提示'],
    确认弹窗: ['确认弹窗'],
    关闭抽屉: ['收起侧边栏'],
    项目组件: ['/system/components'],
  };
  // 获取音效路径
  const getAudio = (src) => {
    return new URL(`../../../../assets/audios/${src}.mp3`, import.meta.url).href;
  };
  //点击触发音效
  const clickAudio = (name) => {
    //获取点击触发的音效名
    sound_name.value = (typeof name === 'string'
        && Object.keys(sound_type).find((item) => sound_type[item].find((item) => name.includes(item))))
      || 'default';

    new Audio(getAudio(sound_name.value)).play().catch(() => {
      // console.error('音频播放失败，用户未与页面交互');
    });
  };

  store.$patch({
    $clickAudio: clickAudio, //全局点击音效
  });

  return {
    sound_name,
    sound_type,
    getAudio,
    clickAudio,
  };
};
