<script setup lang="ts">
import { ref, onMounted } from "vue";

import controlStore from "@/store/modules/control";
import settingStore from "@/store/modules/setting";

interface Props {
  modelValue: boolean;
  text: string; //内容
  title?: string; //左上角标题
  noTipName?: TipKeys | string; //不再提示的属性名
  align?: TipType; //对齐方式
  btnText?: string; //按钮文字
  btnFn?: () => void; //点击按钮触发的函数
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
const $controlStore = controlStore();

const IMGBED = window.IMGBED; //全局图床链接

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
  props.noTipName && $settingStore.setNoTip(props.noTipName as TipKeys);

  emit("update:modelValue", false);
  $controlStore.$audioStore("6xc6");

  setTimeout(() => {
    props.btnFn();
  }, 500);
};
</script>

<template>
  <div class="mask">
    <transition :name="align">
      <div v-show="show_tip" class="k-tip" :style="position[align]">
        <div class="top">
          <!-- 左上角标题 -->
          <div class="title">{{ $t(title) }}</div>

          <!-- 小兵 -->
          <img class="soldier" :src="IMGBED + '/image/warn.png'" alt="小兵" @dragstart.prevent />
        </div>

        <!-- 内容 -->
        <div v-typewriterMultiple class="content">{{ text }}</div>

        <!-- 按钮 -->
        <div class="btns">
          <K-Button width="9.375rem" height="2.5rem" font-size="1.25rem" @click="handleClose">{{
            $t(btnText)
          }}</K-Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
