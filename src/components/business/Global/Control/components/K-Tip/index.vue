<script setup lang="ts">
import { ref, onMounted } from "vue";

import { SettingStore, AudioStore } from "@/store";

interface Props {
  /** 是否显示 */
  modelValue: boolean;
  /** 内容 */
  text: string;
  /** 左上角标题 */
  title?: string;
  /** 不再提示的属性名 */
  noTipName?: TipKeys | string;
  /** 对齐方式 */
  align?: TipType;
  /** 按钮文字 */
  btnText?: string;
  /** 点击按钮触发的函数 */
  btnFn?: () => void;
}
const $props = withDefaults(defineProps<Props>(), {
  align: "right-bottom",
  title: "小贴士",
  btnText: "确定",
  btnFn: () => {},
});

interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "update:btn", v: boolean): void;
}
const $emit = defineEmits<Emits>();

const $settingStore = SettingStore();
const $audioStore = AudioStore();

const IMGBED = window.IMGBED;

const show_tip = ref(false);

onMounted(() => {
  show_tip.value = true;
});

const position = {
  "left-top": {
    left: 0,
    top: "3.125rem",
  },
  "right-top": {
    right: 0,
    top: "3.125rem",
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
  $props.noTipName && $settingStore.setNoTip($props.noTipName as TipKeys);

  $emit("update:modelValue", false);
  $audioStore.play("6xc6");

  setTimeout(() => {
    $props.btnFn();
  }, 500);
};
</script>

<template>
  <div class="mask">
    <transition :name="align">
      <div v-show="show_tip" class="k-tip" :style="position[align]">
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
          <K-Button width="9.375rem" height="2.5rem" font-size="1.25rem" @click="handleClose">{{ btnText }}</K-Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
