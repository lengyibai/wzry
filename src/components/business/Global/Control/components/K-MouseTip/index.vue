<script setup lang="ts">
import { ref } from "vue";
import _debounce from "lodash/debounce";
import { onMounted } from "vue";

import { connectCircle } from "./helper/connectCircle";
import type { MouseTip } from "./interface";

import { $bus } from "@/utils";
import { vTypewriterMultiple } from "@/directives";

let timer1: NodeJS.Timeout;
let timer2: NodeJS.Timeout;

const tipRef = ref<HTMLElement>();
const dotRef = ref<HTMLElement>();
const roundBoxRef = ref<HTMLElement>();
const roundLineRef = ref<HTMLElement>();

const x = ref(window.innerWidth / 2);
const y = ref(window.innerHeight / 2);
/** 是否显示 */
const show = ref(true);
/** 提示文字 */
const tip = ref("");
/** 是否处于移动中 */
const moving = ref(false);
/** 是否处于按下状态 */
const downing = ref(false);
/** 是否显示tip */
const show_tip = ref(false);
/** 是否处于禁用状态 */
const disabled = ref(false);
/** 是否已经点击过了 */
const is_click = ref(false);
/** tip类型 */
const type = ref<"NORMAL" | "INPUT">("NORMAL");
/** 提示框位置 */
const tip_position = ref<"left-bottom" | "right-bottom" | "left-top" | "right-top">("left-top");

/* 鼠标悬浮时触发 */
const debounceMouseTip = _debounce((v: MouseTip) => {
  if (downing.value) return;
  //解决某些元素销毁时会直接隐藏掉正常显示的Tip

  show.value = false;
  show_tip.value = false;
  is_click.value = false;

  clearTimeout(timer1);
  timer1 = setTimeout(() => {
    show.value = true;
    show_tip.value = v.show;
    tip.value = v.text || "";
    type.value = v.type || "NORMAL";
    disabled.value = !!v.disabled;
  }, 100);
}, 100);
$bus.on("mouse-tip", debounceMouseTip);

/* 鼠标进入浏览器时显示 */
document.documentElement.addEventListener("mouseenter", () => {
  clearTimeout(timer2);
  show.value = true;
});

/* 鼠标离开浏览器时隐藏 */
document.documentElement.addEventListener("mouseleave", () => {
  timer2 = setTimeout(() => {
    show.value = false;
  }, 250);
});

/* 鼠标在250毫秒没有移动，则改变状态 */
const debounceStillness = _debounce(() => {
  moving.value = false;
}, 250);
const moveFn = (e: MouseEvent | TouchEvent) => {
  requestAnimationFrame(() => {
    moving.value = true;

    if (e instanceof MouseEvent) {
      x.value = e.pageX;
      y.value = e.pageY;
    } else if (e instanceof TouchEvent) {
      x.value = e.touches[0].pageX;
      y.value = e.touches[0].pageY;
    }

    debounceStillness();
  });
};
window.addEventListener("mousemove", moveFn);
window.addEventListener("touchmove", moveFn);

/* 鼠标按下 */
const downFn = () => {
  downing.value = true;
};
window.addEventListener("mousedown", downFn);
window.addEventListener("touchstart", downFn);

/* 鼠标抬起 */
const upFn = () => {
  downing.value = false;
  is_click.value = true;
};
window.addEventListener("mouseup", upFn);
window.addEventListener("touchend", upFn);
window.addEventListener("dragend", upFn);

/* 获取Tip的位置 */
const getTipPosition = () => {
  if (!dotRef.value) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const {
    left: dot_left,
    right: dot_right,
    top: dot_top,
    bottom: dot_bottom,
  } = dotRef.value.getBoundingClientRect();

  //小圆点处于左上角区域
  if (dot_right < w / 2 && dot_bottom < h / 2) {
    tip_position.value = "right-bottom";
  }

  //小圆点处于右上角区域
  if (dot_left > w / 2 && dot_bottom < h / 2) {
    tip_position.value = "left-bottom";
  }

  //小圆点处于右下角区域
  if (dot_left > w / 2 && dot_top > h / 2) {
    tip_position.value = "left-top";
  }
  //小圆点处于左下角区域
  if (dot_right < w / 2 && dot_top > h / 2) {
    tip_position.value = "right-top";
  }

  connectCircle(dotRef.value!, roundBoxRef.value!, roundLineRef.value!);
  requestAnimationFrame(getTipPosition);
};

onMounted(getTipPosition);
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="show" class="k-mouse-line">
        <!-- 移动点 -->
        <div class="dot-box" :style="{ left: x + 'px', top: y + 'px' }">
          <!-- 小圆点 -->
          <div
            ref="dotRef"
            class="dot"
            :class="{
              downing: downing,
              clickable: show_tip && !is_click && !disabled,
              input: type === 'INPUT',
            }"
          >
            <!-- 连接光圈的线条 -->
            <div ref="roundLineRef" class="round-line"></div>
          </div>

          <!-- 连接tip的线条 -->
          <div
            class="line"
            :class="[
              tip_position,
              {
                show: show_tip && !is_click,
                disabled: disabled,
                clickable: !is_click,
              },
            ]"
            :style="{
              visibility: tip ? 'visible' : 'hidden',
            }"
          >
            <!-- tip框 -->
            <div
              ref="tipRef"
              class="tip"
              :class="{
                show: show_tip && !is_click,
              }"
            >
              <span
                v-if="tip && show_tip"
                v-typewriter-multiple="{
                  delay: 250,
                  speed: 50,
                  content: tip,
                }"
              >
              </span>
            </div>
          </div>
        </div>

        <!-- 跟随的光圈 -->
        <div
          ref="roundBoxRef"
          class="round-box"
          :class="{
            clickable: show_tip && !disabled && !is_click,
            disabled: disabled,
            moving: moving,
            downing: downing,
          }"
          :style="{ left: x + 2.5 + 'px', top: y + 2.5 + 'px' }"
        >
          <!-- 光圈动画 -->
          <div
            class="box"
            :style="{
              opacity: moving && !show_tip ? '0' : '1',
            }"
          >
            <div
              v-for="(item, index) in 3"
              :key="index"
              class="round"
              :style="`--i:${index}`"
            ></div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
