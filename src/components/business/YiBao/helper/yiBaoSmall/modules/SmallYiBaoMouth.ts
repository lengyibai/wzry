/** @description 嘴巴类 */
class SmallYiBaoMouth {
  /** 嘴巴外层 */
  private outer_mouth_dom!: HTMLElement;
  /** 嘴巴内部 */
  private inner_mouth_dom!: HTMLElement;
  /** 牙齿 */
  private tooth_dom!: HTMLElement;
  /** 舌头 */
  private tongue_dom!: HTMLElement;
  /** 呼吸动画函数 */
  private breathAnimation!: Animation;

  constructor() {}

  /** @description 初始化DOM
   * @param outer_mouth_dom 外层DOM
   * @param inner_mouth_dom 内部DOM
   */
  init(
    outer_mouth_dom: HTMLElement,
    inner_mouth_dom: HTMLElement,
    tooth_dom: HTMLElement,
    tongue_dom: HTMLElement,
  ) {
    this.outer_mouth_dom = outer_mouth_dom;
    this.inner_mouth_dom = inner_mouth_dom;
    this.tooth_dom = tooth_dom;
    this.tongue_dom = tongue_dom;
  }

  /** @description 高兴 */
  smile() {
    let style = this.outer_mouth_dom.style;
    style.top = "0";
    style.width = "";
    style.height = `${75 / 4}px`;
    style.transform = "translateY(0)";

    style = this.inner_mouth_dom.style;
    style.top = `${-25 / 4}px`;
    style.height = `${100 / 4}px`;

    style = this.tooth_dom.style;
    style.top = `${25 / 4}px`;
    style.height = `${50 / 4}px`;
  }

  /** @description 重置样式 */
  resetStyle() {
    this.outer_mouth_dom.style.cssText = "";
    this.inner_mouth_dom.style.cssText = "";
    this.tongue_dom.style.cssText = "";
    this.tooth_dom.style.cssText = "";
  }
}

const smallYiBaoMouth = new SmallYiBaoMouth();

export { smallYiBaoMouth };
