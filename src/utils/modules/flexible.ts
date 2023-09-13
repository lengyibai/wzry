interface Trigger {
  /** 触发区间 */
  range: [number, number];
  /** 触发回调 */
  callback: (progress: number) => void;
  /** 锁住0 */
  lock0: boolean;
  /** 锁住1 */
  lock1: boolean;
}

class Flexible {
  private triggers: Trigger[] = [];
  private scrollPos: number = 0;

  constructor() {
    window.addEventListener("resize", this.handleResize.bind(this));
    window.addEventListener("DOMContentLoaded", this.handleResize.bind(this));
  }

  /** @description 添加回调函数 */
  trigger(range: [number, number], callback: (progress: number) => void) {
    this.triggers.push({ range, callback, lock0: true, lock1: true });
  }

  // 处理缩放事件
  private handleResize() {
    this.scrollPos = window.innerWidth;
    this.checkTriggers();
  }

  // 检查触发回调函数
  private checkTriggers() {
    // 遍历所有的回调函数
    this.triggers.forEach((t) => {
      const [start, end] = t.range;

      //检查是否进入区间
      if (this.scrollPos <= start && this.scrollPos >= end) {
        // 计算进度
        const progress = (this.scrollPos - start) / (end - start);

        //触发回调
        t.callback(Number(progress.toFixed(2)));

        //允许触发
        t.lock0 = false;
        t.lock1 = false;
      } /* 如果离开区间 */ else if (this.scrollPos < start) {
        //判断是否允许触发(此处只能触发一次)
        if (t.lock0) return;
        t.callback(1);
        t.lock0 = true; //设置禁止出发
      } else if (this.scrollPos > end) {
        //判断是否允许触发(此处只能触发一次)
        if (t.lock1) return;
        t.callback(0);
        t.lock1 = true; //设置禁止出发
      }
    });
  }
}

const flexible = new Flexible();

const setFontsize = (size: [number, number], v: number) => {
  document.documentElement.style.fontSize = size[0] - (size[0] - size[1]) * v + "px";
};

export default { init: flexible, setFontsize };
