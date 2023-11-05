import mitt from "mitt";

type EventData = {
  loading: { text?: string; show: boolean };
  msg: { text: string; type: MsgType };
  tip: Control.Tip;
  /** 全局手指抬起事件 */
  resize: Event;
  mousemove: Event;
  mouseup: Event;
  /** 瀑布流刷新布局 */
  "update-waterfall": any;
};

type MittEventMap = {
  [key in keyof EventData]: EventData[key];
};

const emitter = mitt<MittEventMap>();
export default emitter;
