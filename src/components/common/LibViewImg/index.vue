<template>
  <div class="lib-view-img">
    <div ref="mask" class="mask"></div>
    <div ref="pic" class="pic">
      <img
        ref="clonedBox"
        class="clonedBox"
        :src="link"
        alt=""
        @dragstart.prevent
      />
    </div>
    <div ref="tool" class="tool">
      <div class="clockwise" @click="handleClockwise">
        <svg
          t="1662135824052"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1399"
        >
          <path
            d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z"
            p-id="1400"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
      <div class="counter" @click="handleCounter">
        <svg
          t="1662135840330"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1590"
        >
          <path
            d="M541.226667 66.517333L393.045333 217.685333a21.333333 21.333333 0 0 0 0 29.866667l147.84 150.826667a21.333333 21.333333 0 0 0 28.16 2.090666l2.346667-2.090666 27.050667-27.605334a21.333333 21.333333 0 0 0 0-29.866666l-69.888-71.338667a304.64 304.64 0 1 1-318.421334 352.682667l-1.024-6.826667a176.554667 176.554667 0 0 1-0.64-5.632 21.333333 21.333333 0 0 0-22.314666-19.114667l-42.666667 2.261334a21.333333 21.333333 0 0 0-20.224 22.4l0.085333 1.024 1.194667 10.496A389.973333 389.973333 0 1 0 539.178667 184.746667l59.306666-60.458667a21.333333 21.333333 0 0 0 0-29.866667l-27.093333-27.605333a21.333333 21.333333 0 0 0-30.165333-0.298667z"
            p-id="1591"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
    <div ref="closeBtn" class="closeBtn" @click="close">
      <svg
        t="1662135922951"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2662"
      >
        <path
          d="M1022.583467 127.803733 894.779733 0 511.291733 383.4624 127.8464 0 0 127.803733 383.496533 511.274667 0 894.737067 127.8464 1022.5408 511.291733 639.0784 894.779733 1022.5408 1022.583467 894.737067 639.138133 511.274667Z"
          p-id="2663"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean;
  link: string;
}
defineProps<Props>();

const $switchStore = switchStore();

const pic = ref();
const closeBtn = ref();
const clonedBox = ref();
const mask = ref();
const tool = ref();

let x = 0;
let y = 0;
let size = 1;
let rotate = 0;
let status = 0;
let origin = [0, 0];

/* 设置样式 */
const setStyle = () => {
  clonedBox.value.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg) scale(${size})`;
  clonedBox.value.style.transformOrigin = `${
    origin[0] + pic.value.offsetWidth / 2 - 240
  }px ${origin[1] + pic.value.offsetHeight / 2 - 200}px`;
};

/* 设置坐标 */
const setPosition = (name: string) => {
  const obj: Record<string, () => void> = {
    clockwise() {
      rotate += 90;
      status++;
    },
    counter() {
      rotate -= 90;
      status--;
    },
  };
  obj[name].call(this);
  setStyle();
  $switchStore.$clickAudio("n4r4");
};

/* 顺时针旋转 */
const handleClockwise = (e: Event) => {
  e.stopPropagation();
  setPosition("clockwise");
};

/* 逆时针旋转 */
const handleCounter = (e: Event) => {
  e.stopPropagation();
  setPosition("counter");
};

const wheel = (e: WheelEvent) => {
  requestAnimationFrame(() => {
    if (e.deltaY > 0) {
      size /= 1.25;
      if (size < 0.25) size = 0.25;
    } else {
      size *= 1.25;
      if (size > 20) size = 20;
    }
    setStyle();
  });
};

/* 注册事件 */
const addEventListener = () => {
  pic.value.addEventListener("mousewheel", wheel.bind(this));
  clonedBox.value.addEventListener("click", (e: Event) => {
    e.stopPropagation();
  });
  // closeBtn.value.addEventListener("click", close.bind(this));
  // pic.value.addEventListener("click", close.bind(this));
  let startX = 0;
  let startY = 0;
  let moveX = 0;
  let moveY = 0;
  let originX = 0;
  let originY = 0;
  function fn(e: MouseEvent) {
    requestAnimationFrame(() => {
      if (status % 4 === 0) {
        x = moveX + (e.pageX - startX) / size;
        y = moveY + (e.pageY - startY) / size;
        origin[0] = originX - (e.pageX - startX) / size;
        origin[1] = originY - (e.pageY - startY) / size;
      }
      if (status % 4 === 1 || status % 4 === -3) {
        x = moveX + (e.pageY - startY) / size;
        y = moveY - (e.pageX - startX) / size;
        origin[0] = originX - (e.pageY - startY) / size;
        origin[1] = originY + (e.pageX - startX) / size;
      }
      if (status % 4 === 2 || status % 4 === -2) {
        x = moveX - (e.pageX - startX) / size;
        y = moveY - (e.pageY - startY) / size;
        origin[0] = originX + (e.pageX - startX) / size;
        origin[1] = originY + (e.pageY - startY) / size;
      }
      if (status % 4 === 3 || status % 4 === -1) {
        x = moveX - (e.pageY - startY) / size;
        y = moveY + (e.pageX - startX) / size;
        origin[0] = originX + (e.pageY - startY) / size;
        origin[1] = originY - (e.pageX - startX) / size;
      }
      setStyle();
    });
  }
  clonedBox.value.addEventListener("mousedown", (e: MouseEvent) => {
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY;
    moveX = x;
    moveY = y;
    originX = origin[0];
    originY = origin[1];
    clonedBox.value.style.transition = "all 0s";

    clonedBox.value.addEventListener("mousemove", fn);
  });
  clonedBox.value.addEventListener("mouseup", () => {
    clonedBox.value.style.transition = "all 0.1s";
    clonedBox.value.removeEventListener("mousemove", fn);
  });
};

/* 关闭 */
interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();
const close = () => {
  emit("update:modelValue", false);
  $switchStore.$clickAudio("6xc6");
};

onMounted(() => {
  addEventListener();
});
</script>
<style scoped lang="less">
.lib-view-img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black-50);
  overflow: hidden;
  z-index: 9;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
  }
  .pic {
    position: relative;
    width: 100%;
    height: 100%;
    .clonedBox {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 75%;
      max-height: 75%;
      object-fit: contain;
      cursor: move;
      transition: all 0.1s;
    }
  }
  .tool {
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 110px;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    background-color: #606266;
    border-radius: 50px;
    padding: 10px 23px;
    .clockwise,
    .counter {
      cursor: pointer;
      width: 23px;
      height: 23px;
    }
  }
  .closeBtn {
    position: fixed;
    top: 60px;
    right: 60px;
    width: 40px;
    height: 40px;
    padding: 11px;
    background-color: #606266;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
