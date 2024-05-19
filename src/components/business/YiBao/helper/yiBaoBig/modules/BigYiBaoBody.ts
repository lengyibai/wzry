import { useDragMove } from "../hooks/useDragMove";

import { bigYiBaoMouth } from "./BigYiBaoMouth";
import { bigYiBaoIris } from "./BigYiBaoIris";
import { playAnimation, leftJumpRightJumpCenterRotateDown, rotateRound } from "./BigYibaoKeyframes";

import { _random } from "@/utils/tool";

/** @description 身体类 */
class BigYiBaoBody {
  /** 呼吸动画函数 */
  private breathAnimation!: Animation;
  /** 按下拖动函数 */
  private bodyDragMove!: {
    enableDragMove(): void;
    disableDragMove(): void;
  };
  /** 身体DOM */
  body_dom!: HTMLElement;
  /** 鼠标离开身体定时器，为了适配离开身体开启嘴巴呼吸动画 */
  body_mouseleave_timer!: NodeJS.Timeout;
  /** 是否开启了身体跟随 */
  body_follow_status = false;
  /** 是否开启了按下拖动 */
  body_drag_status = false;
  /** 是否正在播放动画 */
  body_animate_running = false;

  constructor() {}

  /** @description 按下拖动 */
  private initDragMove() {
    this.bodyDragMove = useDragMove(this.body_dom);
  }

  /** @description 初始化DOM
   * @param dom 身体DOM
   */
  init(dom: HTMLElement) {
    this.body_dom = dom;

    this.initDragMove();

    dom.addEventListener("mouseenter", async () => {
      clearTimeout(this.body_mouseleave_timer);
      bigYiBaoMouth.smile();
    });

    dom.addEventListener("mouseleave", () => {
      clearTimeout(this.body_mouseleave_timer);

      this.body_mouseleave_timer = setTimeout(() => {
        bigYiBaoIris.resetStyle();
        bigYiBaoMouth.resetStyle();
        setTimeout(() => {
          bigYiBaoMouth.toggleBreathAnimation(true);
        }, 250);
      }, 1000);
    });
  }

  /** @description 初始化呼吸动画 */
  startBreathAnimation() {
    this.breathAnimation = this.body_dom.animate(
      [
        { transformOrigin: "bottom center", transform: "scaleY(1.03)", offset: 0.45 },
        { transformOrigin: "bottom center", transform: "scaleY(1.03)", offset: 0.52 },
      ],
      {
        duration: 3000,
        iterations: Infinity,
      },
    );
  }

  /** @description 控制呼吸动画的暂停与播放
   * @param status 播放状态
   */
  toggleBreathAnimation(status: boolean) {
    return new Promise<void>((resolve) => {
      if (status) {
        this.startBreathAnimation();
      } else {
        this.breathAnimation?.cancel();
      }

      setTimeout(resolve);
    });
  }

  /** @description 播放换装动画 */
  async playChangePartAnimation() {
    if (this.body_drag_status || this.body_animate_running) return;
    this.body_animate_running = true;

    const animates = [leftJumpRightJumpCenterRotateDown, rotateRound];

    const random_animate = _random(0, animates.length - 1);
    await playAnimation(animates[random_animate]);
    this.body_animate_running = false;
  }

  /** @description 控制按下拖动
   * @param status 允许拖动状态
   */
  toggleDragMove(status: boolean) {
    if (this.body_animate_running) return;
    this.body_drag_status = status;

    return new Promise<void>(async (resolve) => {
      if (status) {
        await this.toggleBreathAnimation(false);
        this.bodyDragMove.enableDragMove();
      } else {
        this.bodyDragMove.disableDragMove();
        setTimeout(() => {
          this.toggleBreathAnimation(true);
        }, 250);
      }

      setTimeout(resolve);
    });
  }

  /** @description 重置样式 */
  resetStyle() {
    this.body_dom.style.cssText = "";
  }
}

const bigYiBaoBody = new BigYiBaoBody();
export { bigYiBaoBody };
