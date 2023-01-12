import type { DirectiveBinding, App } from "vue";
/* 全屏背景视差 */
//视频
import { $random } from "../utils";

const particle = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const box = el;
    const box_width = box.offsetWidth;
    const box_height = box.offsetHeight;
    const {
      color = "#cfb45c",
      size = 10,
      brightness = 1.3,
      contrast = 1.1,
      filter = true,
      num = 35,
    } = binding.value || {};
    document.styleSheets[0].insertRule(
      `
      @keyframes particle-rise {
        0% {
          transform: translateY(0px) translateZ(0);
          opacity: 1;
        }
        50% {
          transform: translateY(-${box_height / 2}px) translateZ(0);
          opacity: 1;
        }
        100% {
          transform: translateY(-${box_height}px) translateZ(0);
          opacity: 0;
        }
      }
      `,
      1
    );
    for (let i = 0; i < num; i++) {
      const p = document.createElement("span");

      const style = `
      position: absolute;
      background-color: ${color};
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      bottom: 0;
      opacity: 0;
      box-shadow: 0 0 10px 0 ${color};
      filter: contrast(125%) brightness(125%);
      `;
      const left = $random(0, box_width - size);
      const scale = $random(0.25, 0.75, 1);
      const time = $random(0.5, 2, 1);
      const delay = $random(0, 5, 1);
      p.style.cssText = style;
      p.style.left = `${left}px`;
      p.style.scale = scale.toString();
      p.style.animation = `particle-rise ${time}s linear infinite`;
      p.style.animationDelay = delay + "s";

      box.appendChild(p);
    }

    if (filter) el.style.transition = "all 0.25s";
    box.addEventListener("mouseenter", () => {
      if (!filter) return;
      box.style.filter = `brightness(${brightness * 100}%) contrast(${
        contrast * 100
      }%)`;
    });

    box.addEventListener("mouseleave", () => {
      box.style.filter = "";
    });
  },
};

/* 底部渐变 */
const maskGradient = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const {
      color = "rgba(0, 0, 0, 0.75)",
      rotate = "0deg",
      num1 = "0%",
      num2 = "50%",
    } = binding.value || {};
    const mask = document.createElement("div");
    mask.style.cssText = `
    position: absolute;
    inset:0;
    background-image: linear-gradient(${rotate}, ${color} ${num1}, transparent ${num2});
    pointer-events: none;
    `;
    el.appendChild(mask);
  },
};

/* 卡片扫光 */
const sweepLight = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    setTimeout(() => {
      const auto = binding.value !== false;
      const light = document.createElement("div");
      el.style.position = "relative";
      light.style.cssText = `
      position: absolute;
      top: 0px;
      left: 0px;
      width: ${el.offsetWidth / 3}px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      transform: skewX(45deg) translateX(${el.offsetWidth * 2}px);
      transition: all 2s;
      filter: blur(5px)
    `;
      el.appendChild(light);
      if (auto) {
        light.style.transitionDelay = ` ${binding.value}s`;
        light.style.transform = `skewX(45deg) translateX(${
          -el.offsetWidth * 1.5
        }px)`;
      } else {
        el.addEventListener("mouseenter", () => {
          light.style.transform = `skewX(45deg) translateX(${
            -el.offsetWidth * 1.5
          }px)`;
        });

        el.addEventListener("mouseleave", () => {
          light.style.transform = `skewX(45deg) translateX(${
            el.offsetWidth * 2
          }px)`;
        });
      }
    });
  },
};

/* 打字机 */
const typewriter = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    setTimeout(() => {
      const say = binding.value;
      let timer: Interval = 0;
      let num = 0; //用于累加遍历字符串
      let text = ""; //用于输出在屏幕上
      timer = setInterval(() => {
        text += say[num]; //遍历输出的文字
        el.innerHTML = text; //输出在屏幕上
        num++;
        if (num === say.length) {
          //如果文字输出完毕
          clearInterval(timer); //清除用于输出文字的计时器
        }
      }, 100);
    }, 750);
  },
};

/* 文字悬浮变色 */
const textHoverColor = {
  mounted(el: HTMLElement) {
    const mask = document.createElement("div");
    el.style.position = "relative";
    mask.innerHTML = el.innerHTML;
    mask.style.cssText = `
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    color: transparent;
    background-color: #fff;
    transition: all 0.25s;
    font-size: inherit;
    animation: light 3s infinite;
    -webkit-background-clip: text;
    clip-path: circle(75% at 50% 50%);
    `;

    el.appendChild(mask);
    el.addEventListener("mouseenter", () => {
      mask.style.clipPath = "circle(0% at 50% 50%)";
    });
    el.addEventListener("mouseleave", () => {
      mask.style.clipPath = "circle(75% at 50% 50%)";
    });
  },
};

/* 元素支持拖动 */
const drag = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.userSelect = "none";
    el.style.position = "absolute";
    let x = 0;
    let y = 0;
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;
    el.addEventListener("mousedown", (e) => {
      x = e.pageX;
      y = e.pageY;
      startX = el.offsetLeft;
      startY = el.offsetTop;
      function fn(e: MouseEvent) {
        moveX = e.pageX - x;
        moveY = e.pageY - y;
        el.style.left = `${moveX + startX}px`;
        el.style.top = `${moveY + startY}px`;
        binding.value.fn(
          el,
          {
            x: el.getBoundingClientRect().left + el.offsetWidth / 2,
            y: el.getBoundingClientRect().top + el.offsetHeight / 2,
          },
          binding.value.index
        );
      }
      window.addEventListener("mousemove", fn);

      function up() {
        binding.value.fn(el, false, binding.value.index);
        window.removeEventListener("mousemove", fn);
        setTimeout(() => {
          window.removeEventListener("mouseup", up);
        });
      }
      window.addEventListener("mouseup", up);
    });
  },
};

/* 单行打字机 */
const typewriterSingle = {
  mounted(el: HTMLElement) {
    const lyb = el;

    const say = lyb.innerHTML;
    function again() {
      lyb.innerHTML = "";
      let timer: Interval = 0;
      let num = 0; //用于累加遍历字符串
      let text = ""; //用于输出在屏幕上
      lyb.innerHTML = "";
      timer = setInterval(() => {
        text += say[num]; //遍历输出的文字
        lyb.innerHTML = text; //输出在屏幕上
        num++;

        if (num === say.length) {
          //如果文字输出完毕
          clearInterval(timer); //清除用于输出文字的计时器
        }
      }, 150);
    }
    again();
  },
};

/* 自动获取焦点 */
const focus = {
  mounted(el: HTMLElement) {
    el.focus();
  },
};

interface Directives {
  [propName: string]: any;
}
const directives: Directives = {
  particle,
  maskGradient,
  sweepLight,
  typewriter,
  textHoverColor,
  drag,
  typewriterSingle,
  focus,
};

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
