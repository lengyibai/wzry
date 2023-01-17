<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

import tipStore from "@/store/tip";

interface Props {
  modelValue: boolean;
  text: string;
  align: TipType;
  noTipName: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  text: "Hello World!",
  align: "right-bottom",
  noTipName: "",
});

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $tipStore = tipStore();

let timer: Interval; //倒计时计时器
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
  time.value = -1;
  clearInterval(timer);
};

/* 开始/取消倒计时 */
const handleCountDown = (v: boolean) => {
  if (v) {
    time.value = 3;
    timer = setInterval(() => {
      time.value--;
      if (time.value === -1) {
        clearInterval(timer);
        emit("update:modelValue", false);
      }
    }, 1000);
  } else {
    cancelCountDown();
  }
};

/* 打字机结束 */
const finish = () => {
  handleCountDown(true);
};

/* 不再提示 */
const handleNoTip = () => {
  $tipStore.tips[props.noTipName].noTip = true;
  emit("update:modelValue", false);
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
      <div class="title">小贴士</div>
      <img class="soldier" :src="IMGBED + '/image/warn.png'" alt="小兵" />
    </div>
    <div v-typewriterMultiple="finish" class="content">{{ text }}</div>
    <div
      v-show="time === -1"
      class="not-tip cursor-pointer lib-click"
      @click="handleNoTip"
    >
      不再提示
    </div>
    <div v-show="time !== -1" class="count-down cursor-pointer lib-click">
      {{ time }}秒后关闭，鼠标进入可取消
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
