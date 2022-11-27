import { ref } from "vue";

export default () => {
  const sound_name = ref("默认"); //音效名
  /* 音效类型 */
  const sound_type: Record<string, string[]> = {
    默认: ["默认"],
    tab: ["tab"],
    登录: ["登录"],
    模式选择: ["/home"],
    查看详情: ["/system/hero"],
    皮肤相关: ["/system/skin"],
    装备相关: ["/system/equip", "/equip", "/system/epigraph"],
    英雄列表: ["/hero"],
    查看: ["查看"],
    确定: ["确定"],
    关闭: ["关闭"],
    取消: ["取消"],
    消息提示: ["消息提示"],
    警告提示: ["警告提示"],
    错误提示: ["错误提示"],
    确认弹窗: ["确认弹窗"],
    关闭抽屉: ["收起侧边栏"],
  };

  /* 设置方法 */
  const clickAudio = (name?: string) => {
    //获取点击触发的音效名
    sound_name.value =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) => sound_type[item].find((item: string) => name.includes(item)))) ||
      "默认";

    new Audio(`https://lengyibai.gitee.io/wzry-material/audio/${sound_name.value}.mp3`).play().catch(() => {
      // console.error('音频播放失败，用户未与页面交互');
    });
  };

  return { clickAudio };
};
