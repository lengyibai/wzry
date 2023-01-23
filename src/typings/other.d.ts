/** @description: 弹窗位置 */
type TipType = "left-top" | "right-top" | "left-bottom" | "right-bottom";

/** @description: 消息类型 */
type MsgType = "info" | "warning" | "error";
interface MsgText {
  id: number; //唯一值
  text: string; //提示内容
  type: MsgType; //提示类型
}

/** @description: 设置配置项 */
interface SettingConfig {
  tip: boolean; //小贴士
  videoBg: boolean; //使用视频背景
  audio: boolean; //音效
  audioVolume: number; //音效音量
  music: boolean; //音乐
  musicVolume: number; //音乐音量
  speed: 0 | 1 | 2; //动画速率
  particle: boolean; //粒子特效
  muted: boolean; //登录页视频静音
}

/** @description: 开关 */
declare namespace Switch {
  type ClickAudio = (name?: string) => void;
  type Msg = (text: string, type?: MsgType) => void;
  type Tip = (obj: {
    title?: string; //左上角标题
    text: string; //提示内容
    align?: TipType; //在页面上的位置
    btn?: boolean; //显示按钮
    btnText?: string[]; //按钮上的文字
    btnFn?: () => void; //点击确认后执行的函数
  }) => void;
  interface Loading {
    show: (text?: string) => void;
    close: () => void;
  }
}
