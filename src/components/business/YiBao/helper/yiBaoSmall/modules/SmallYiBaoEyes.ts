import { _random } from "@/utils/tool";

/** @description 眼睛类 */
class SmallYiBaoEyes {
  /** 左眼DOM */
  private left_eye_dom!: HTMLElement;
  /** 右眼DOM */
  private right_eye_dom!: HTMLElement;
  /** 自动眨眼定时器 */
  private auto_blink_timer!: NodeJS.Timeout;
  /** 双眼是否处于眨眼中 */
  private blinking = false;
  /** 左眼是否处于眨眼中 */
  private left_blinking = false;
  /** 右眼是否处于眨眼中 */
  private right_blinking = false;

  constructor() {}

  /** @description 初始化DOM
   * @param left_eye_dom 左眼DOM
   * @param right_eye_dom 右眼DOM
   */
  init(left_eye_dom: HTMLElement, right_eye_dom: HTMLElement) {
    this.left_eye_dom = left_eye_dom;
    this.right_eye_dom = right_eye_dom;

    left_eye_dom.addEventListener("click", () => {
      this.blinkEye("LEFT");
    });
    right_eye_dom.addEventListener("click", () => {
      this.blinkEye("RIGHT");
    });

    this.autoBlinkEyes();
  }

  /** @description 眨眼一次
   * @param type 左眼or右眼
   */
  blinkEye(type: "LEFT" | "RIGHT") {
    const blinks = {
      LEFT: "left_blinking",
      RIGHT: "right_blinking",
    } as const;

    if (this[blinks[type]]) return;
    this[blinks[type]] = true;

    const doms = {
      LEFT: "left_eye_dom",
      RIGHT: "right_eye_dom",
    } as const;

    this[doms[type]].style.transition = "all 0.1s";
    this[doms[type]].style.clipPath = "ellipse(40% 1% at 50% 50%)";
    setTimeout(() => {
      this[doms[type]].style.transition = "all 0.25s";
      this[doms[type]].style.clipPath = "";

      setTimeout(() => {
        this[blinks[type]] = false;
      }, 250);
    }, 100);
  }

  /** @description 双眼眨一次 */
  blinkEyes() {
    if (this.blinking) return;
    this.blinking = true;
    this.blinkEye("LEFT");
    this.blinkEye("RIGHT");

    setTimeout(() => {
      this.blinking = false;
    }, 350);
  }

  /** @description 开启自动眨眼 */
  autoBlinkEyes() {
    const duration = _random(1, 5);
    this.blinkEyes();
    this.auto_blink_timer = setTimeout(() => {
      this.autoBlinkEyes();
    }, duration * 1000);
  }

  /** @description 重置样式 */
  resetStyle() {
    this.left_eye_dom.style.cssText = "";
    this.right_eye_dom.style.cssText = "";
  }
}

const smallYiBaoEyes = new SmallYiBaoEyes();

export { smallYiBaoEyes };
