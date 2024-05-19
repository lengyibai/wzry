/** @description 嘴巴类 */
class BigYiBaoMouth {
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

    this.startBreathAnimation();
  }

  /** @description 初始化呼吸动画 */
  startBreathAnimation() {
    this.breathAnimation?.cancel();
    this.breathAnimation = this.inner_mouth_dom.animate(
      [{ width: "80%", height: "40px", offset: 0.5 }],
      {
        duration: 3000,
        iterations: Infinity,
      },
    );
  }

  /** @description 控制呼吸动画的暂停与播放 */
  toggleBreathAnimation(status: boolean) {
    return new Promise<void>((resolve) => {
      if (status) {
        this.startBreathAnimation();
      } else {
        this.breathAnimation.cancel();
      }

      setTimeout(resolve);
    });
  }

  /** @description 高兴 */
  async smile() {
    await this.toggleBreathAnimation(false);

    let style = this.outer_mouth_dom.style;
    style.height = "75px";
    style.transform = "translateY(0)";

    style = this.inner_mouth_dom.style;
    style.top = "-25px";
    style.height = "100px";

    style = this.tooth_dom.style;
    style.top = "25px";
    style.height = "50px";
  }

  /** @description 重置样式 */
  resetStyle() {
    this.outer_mouth_dom.style.cssText = "";
    this.inner_mouth_dom.style.cssText = "";
    this.tongue_dom.style.cssText = "";
    this.tooth_dom.style.cssText = "";
  }
}

const bigYiBaoMouth = new BigYiBaoMouth();

export { bigYiBaoMouth };
