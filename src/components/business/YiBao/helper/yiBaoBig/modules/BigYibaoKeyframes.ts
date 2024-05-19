import { bigYiBaoBody } from "./BigYiBaoBody";
import { bigYiBaoMouth } from "./BigYiBaoMouth";

import { _promiseTimeout } from "@/utils/tool";

/** @description 左跳-右跳-跳中-旋落
 * @param el 乂宝身体元素
 */
export const leftJumpRightJumpCenterRotateDown = (el: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const transformOrigin = "center bottom";
    const transformOrigin1 = `left bottom ${el.offsetHeight / 2}px`;
    const transformOrigin2 = `right bottom ${el.offsetHeight / 2}px`;

    el.style.transformOrigin = "center bottom";

    el.animate(
      [
        { transform: "" },
        {
          transform: "scaleY(0.75)",
        },
        {
          transform: "translateY(-50%) scaleY(1.15)",
        },
        {
          transform: "rotateX(25deg) rotateY(-35deg)",
          transformOrigin: transformOrigin1,
        },
        {
          transform: "rotateX(25deg) rotateY(-35deg) scaleY(0.5)",
          transformOrigin: transformOrigin1,
        },
        {
          transform: "translateY(-50%) scale(1.15)",
          transformOrigin: transformOrigin1,
        },
        {
          transform: "rotateX(25deg) rotateY(35deg)",
          transformOrigin: transformOrigin2,
        },
        {
          transform: "rotateX(25deg) rotateY(35deg) scaleY(0.75)",
          transformOrigin: transformOrigin2,
        },
        {
          transform: "rotateX(25deg) rotateY(35deg) scaleY(0.5)",
          transformOrigin: transformOrigin2,
        },
        {
          transform: "rotateX(25deg) rotateY(35deg) scaleY(0.75)",
          transformOrigin: transformOrigin2,
        },
        {
          transform: "translateY(-50%) scaleY(1.15)",
          transformOrigin,
        },
        {
          transform: "translateY(-9.375rem) rotateY(-90deg)",
        },
        {
          transform: "translateY(-6.25rem) rotateY(-180deg)",
        },
        {
          transform: "translateY(-3.125rem) rotateY(-270deg)",
        },
        {
          transform: "rotateY(-360deg)",
        },
        {
          transform: "rotateY(-360deg) scaleY(0.5)",
        },
        {
          transform: "rotateY(-360deg) scaleY(0.75)",
        },
        {
          transform: "rotateY(-360deg)",
        },
      ],
      {
        duration: 2500,
      },
    ).onfinish = function () {
      this.cancel();
      resolve();
    };
  });
};

/** @description 旋跳一圈
 * @param el 乂宝身体元素
 */
export const rotateRound = (el: HTMLElement) => {
  return new Promise<void>((resolve) => {
    el.style.transformOrigin = "center bottom";
    let rotate = 0;

    el.animate(
      [
        { transform: "" },
        {
          transform: "scaleY(0.75)",
        },
        {
          transform: "",
        },
        {
          transform: "translateY(-50%) scaleY(1.15)",
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) translateY(-50%) scaleY(1.15)`,
        },
        {
          transform: `rotateY(${(rotate += 45)}deg)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.75)`,
        },
        {
          transform: `rotateY(${rotate}deg) scaleY(0.875)`,
        },
        {
          transform: `rotateY(${rotate}deg)`,
        },
      ],
      {
        duration: 4000,
      },
    ).onfinish = function () {
      this.cancel();
      resolve();
    };
  });
};

/** @description 跳左-跳右-跳后-翻筋斗跳前（仅用于入场动画）
 * @param el 乂宝身体元素
 */
export const jumpLeftJumpRightJumpBackRotateFront = (el: HTMLElement) => {
  return new Promise<void>((resolve) => {
    el.style.pointerEvents = "none";
    el.style.transformOrigin = "center bottom";

    el.animate(
      [
        { transform: "translateY(-50vh)" },
        { transform: "translateY(-25vh)" },
        { transform: "scaleY(1)" },
        {
          transform: "scaleY(0.5)",
        },
        {
          transform: "",
        },
        {
          transform: "translateY(-100%) rotateZ(45deg) scaleY(1.15)",
        },
        {
          transform: "rotateZ(45deg) translateX(-50%) translateY(50%)",
        },
        {
          transform: "rotateZ(45deg) translateX(-50%) translateY(50%) scaleY(0.5)",
        },
        {
          transform: "rotateZ(45deg) translateX(-50%) translateY(50%)",
        },
        {
          transform: "translateY(-100%) scaleY(1.15)",
        },
        {
          transform: "rotateZ(-45deg) translateX(50%) translateY(50%)",
        },
        {
          transform: "rotateZ(-45deg) translateX(50%) translateY(50%) scaleY(0.5)",
        },
        {
          transform: "rotateZ(-45deg) translateX(50%) translateY(50%)",
        },
        {
          transform: "translateY(-100%) scaleY(1.15)",
        },
        {
          transform: "translateZ(-62.5rem) rotateX(-45deg)",
        },
        {
          transform: "translateZ(-62.5rem) rotateX(-45deg) scaleY(0.75)",
        },
        {
          transform: "translateZ(-62.5rem) rotateX(-45deg) scaleY(0.5)",
        },
        {
          transform: "translateZ(-62.5rem) rotateX(-45deg) scaleY(0.25)",
        },
        {
          transform: "translateZ(-62.5rem) rotateX(-45deg)",
        },
        {
          transform: "translateZ(-56.25rem) translateY(-50%) rotateX(-135deg)",
        },
        {
          transform: "translateZ(-50rem) translateY(-100%) rotateX(-225deg)",
        },
        {
          transform: "translateZ(-43.75rem) translateY(-150%) rotateX(-315deg)",
        },
        {
          transform: "translateZ(-37.5rem) translateY(-200%) rotateX(-405deg)",
        },
        {
          transform: "translateZ(-31.25rem) translateY(-250%) rotateX(-495deg)",
        },
        {
          transform: "translateZ(-25rem) translateY(-200%) rotateX(-585deg)",
        },
        {
          transform: "translateZ(-18.75rem) translateY(-150%) rotateX(-675deg)",
        },
        {
          transform: "rotateX(-695deg) translateY(-100%)",
        },
        {
          transform: "translateZ(18.75rem) rotateX(-695deg)",
        },
        {
          transform: "translateZ(18.75rem) rotateX(-695deg) scaleY(0.5)",
        },
        {
          transform: "translateZ(18.75rem) rotateX(-695deg)",
        },
        {
          transform: "rotateX(-720deg)",
        },
        {
          transform: "rotateX(-720deg) scaleY(0.75)",
        },
        {
          transform: "rotateX(-720deg) scaleY(0.875)",
        },
        {
          transform: "rotateX(-720deg)",
        },
      ],
      {
        duration: 4500,
      },
    ).onfinish = function () {
      bigYiBaoBody.resetStyle();
      this.cancel();
      resolve();
    };
  });
};

/**
 * @description 播放动画函数
 * @param animationFn 动画函数
 */
export const playAnimation = async (animationFn: (el: HTMLElement) => Promise<void>) => {
  //关闭身体嘴巴呼吸动画
  await bigYiBaoBody.toggleBreathAnimation(false);
  await bigYiBaoMouth.smile();

  await animationFn(bigYiBaoBody.body_dom);

  //开启身体嘴巴呼吸动画
  bigYiBaoMouth.resetStyle();
  bigYiBaoBody.toggleBreathAnimation(true);

  //延迟开启呼吸动画，避免嘴巴重置时无动画
  await _promiseTimeout(500);
  bigYiBaoMouth.toggleBreathAnimation(true);
};
