import { defineStore } from "pinia";
import { ref } from "vue";

const audioStore = defineStore("audio", () => {
  const sound_name = ref("默认"); //音效名
  const volume = ref(0.5); //音量
  const status = ref(true); //是否启用音效

  /* 音效类型 */
  const sound_type: Record<string, string[]> = {
    activity: ["数据库"],
    back: ["返回"],
    cancel: ["取消"],
    close: ["关闭"],
    confirm_dialog: ["确认弹窗"],
    confirm: ["确定"],
    default: ["默认"],
    delete: ["确认删除"],
    detail: ["查看详情", "/system/hero"],
    epigraph: ["铭文"],
    equip: ["装备"],
    error: ["错误提示"],
    fold: ["收起侧边栏"],
    hero: ["英雄列表", "/hero"],
    into: ["主页"],
    key: ["键盘"],
    login: ["登录"],
    message: ["消息提示"],
    mode: ["/home"],
    num: ["range"],
    show: ["查看"],
    skin: ["皮肤"],
    tv: ["tv"],
    tab: ["tab"],
    tip: ["tip"],
    warning: ["警告提示"],
  };

  /** @description: 播放指定音效 */
  const play = (name?: string) => {
    if (!status.value) return;

    //获取点击触发的音效名
    sound_name.value =
      (typeof name === "string" &&
        Object.keys(sound_type).find((item) =>
          sound_type[item].find((item: string) => name.includes(item))
        )) ||
      "默认";

    const audio = new Audio(); //播放器
    audio.src = `${IMGBED}/audio/${sound_name.value}.mp3`;
    audio.volume = volume.value;

    audio.play().catch(() => {
      /*  */
    });
  };

  /** @description: 音量调节 */
  const setVolume = (v: number) => {
    volume.value = v / 100;
  };

  /** @description: 关闭音效功能 */
  const setAudio = (v: boolean) => {
    status.value = v;
  };

  return { play, setVolume, setAudio };
});

export default audioStore;
export type AudioStore = ReturnType<typeof audioStore>;
