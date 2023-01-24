<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

import settingStore from "@/store/setting";
import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean;
  text: string; //内容
  title?: string; //左上角标题
  noTipName: TipKeys | string; //不再提示的属性名
  align?: TipType; //对齐方式
  btn?: boolean; //是否需要按钮
  btnText?: string[]; //按钮文字
  btnFn?: () => void; //点击按钮触发的函数
}
const props = withDefaults(defineProps<Props>(), {
  align: "right-bottom",
  title: "小贴士",
  btnText: () => [],
  btnFn: () => {},
});

interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "update:btn", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $settingStore = settingStore();
const $switchStore = switchStore();

let timer: Interval; //倒计时计时器
let status = false; // 悬浮状态，控制打字结束是否开始倒计时
const IMGBED = window.IMGBED; //全局图床链接

const time = ref(-1); //倒计时
const position = {
  "left-top": {
    left: 0,
    top: "50px",
  },
  "right-top": {
    right: 0,
    top: "50px",
  },
  "left-bottom": {
    left: 0,
    bottom: 0,
  },
  "right-bottom": {
    right: 0,
    bottom: 0,
  },
};

/* 取消倒计时 */
const cancelCountDown = () => {
  clearInterval(timer);
  time.value = -1;
};

/* 开始/取消倒计时 */
const handleCountDown = (v: boolean) => {
  if (props.btn) return;
  if (v) {
    time.value = 3;

    timer = setInterval(() => {
      time.value--;
      if (time.value <= -1) {
        clearInterval(timer);
        emit("update:modelValue", false);
      }
    }, 1000);
  } else {
    status = true;
    cancelCountDown();
  }
};

/* 打字结束开始倒计时 */
const finish = () => {
  if (status) return;
  handleCountDown(true);
};

/* 不再提示 */
const handleNoTip = () => {
  $settingStore.setNoTip(props.noTipName as TipKeys);
  handleClose();
};

/* 关闭弹窗 */
const handleClose = () => {
  emit("update:modelValue", false);
  emit("update:btn", false);
  $switchStore.$clickAudio("6xc6");
};

onBeforeUnmount(() => {
  cancelCountDown();
});
</script>

<template>
  <div
    class="k-tip"
    :style="position[align]"
    @mouseenter="handleCountDown(false)"
    @mouseleave="handleCountDown(true)"
  >
    <div class="top">
      <!-- 左上角标题 -->
      <div class="title">{{ title }}</div>

      <!-- 小兵 -->
      <img
        class="soldier"
        :src="IMGBED + '/image/warn.png'"
        alt="小兵"
        @dragstart.prevent
      />
    </div>

    <!-- 内容 -->
    <div v-typewriterMultiple="finish" class="content">{{ text }}</div>

    <!-- 不再提示 -->
    <div
      v-show="time === -1"
      v-if="!btn"
      class="not-tip cursor-pointer lib-click"
      @click="handleNoTip"
    >
      不再提示
    </div>

    <!-- 倒计时 -->
    <div
      v-if="!btn"
      v-show="time !== -1"
      class="count-down cursor-pointer lib-click"
    >
      {{ time }}秒后关闭，鼠标进入可取消
    </div>

    <!-- 按钮 -->
    <div v-if="btn" class="btns">
      <K-Button
        width="150px"
        height="40px"
        font-size="20px"
        @click="handleClose"
        >{{ btnText[0] }}</K-Button
      >
      <K-Button
        width="150px"
        height="40px"
        font-size="20px"
        type="warning"
        @click="btnFn(), handleClose()"
        >{{ btnText[1] }}</K-Button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
