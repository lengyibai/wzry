import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("clickAudio", () => {
  const sound_name = ref("默认"); //音效名
  const volume = ref(0); //音量
  const audio = new Audio(); //播放器

  /* 音效类型 */
  const sound_type: Record<string, string[]> = {
    默认: ["默认"],
    tab: ["tab"],
    登录: ["登录"],
    模式选择: ["/home"],
    查看详情: ["/system/hero"],
    皮肤相关: ["/system/skin"],
    装备相关: ["/system/add", "/system/edit"],
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
    tip: ["tip"],
  };

  /** @description: 播放指定音效 */
  const play = (name?: string) => {
    //获取点击触发的音效名
    sound_name.value =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) =>
          sound_type[item].find((item: string) => name.includes(item))
        )) ||
      "默认";

    audio.src = `https://lengyibai.gitee.io/img-bed/wzry/audio/${sound_name.value}.mp3`;
    audio.volume = volume.value;

    audio.play().catch(() => {
      /*  */
    });
  };

  /** @description: 音量调节 */
  const setVolume = (v: number) => {
    volume.value = v / 100;
    audio.volume = volume.value;
  };

  return { play, setVolume };
});

export default switchStore;
