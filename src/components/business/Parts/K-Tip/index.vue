<script setup lang="ts">
import settingStore from "@/store/setting";
import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean;
  text: string; //内容
  title?: string; //左上角标题
  noTipName?: TipKeys | string; //不再提示的属性名
  align?: TipType; //对齐方式
  btnText?: string; //按钮文字
  btnFn?: Func; //点击按钮触发的函数
}
const props = withDefaults(defineProps<Props>(), {
  align: "right-bottom",
  title: "小贴士",
  btnText: "确定",
  btnFn: () => {},
});

interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "update:btn", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $settingStore = settingStore();
const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

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

/* 不再提示 */
const handleClose = () => {
  props.noTipName && $settingStore.setNoTip(props.noTipName as TipKeys);

  emit("update:modelValue", false);
  $switchStore.$clickAudio("6xc6");

  setTimeout(() => {
    props.btnFn();
  }, 1000);
};
</script>

<template>
  <div class="k-tip" :style="position[align]">
    <div class="top">
      <!-- 左上角标题 -->
      <div class="title">{{ title }}</div>

      <!-- 小兵 -->
      <img class="soldier" :src="IMGBED + '/image/warn.png'" alt="小兵" @dragstart.prevent />
    </div>

    <!-- 内容 -->
    <div v-typewriterMultiple class="content">{{ text }}</div>

    <!-- 按钮 -->
    <div class="btns">
      <K-Button width="150px" height="40px" font-size="20px" @click="handleClose">{{ btnText }}</K-Button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
