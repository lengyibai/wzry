<template>
  <LibMask>
    <transition :name="up ? 'confirm' : 'default'">
      <div
        v-show="show"
        class="k-dialog"
        :style="{
          width: width,
          height: 'calc(' + width + ' * 0.5989)',
        }"
      >
        <div v-if="title" class="title">{{ title }}</div>
        <div v-if="header" class="header">{{ header }}</div>
        <img
          v-show="showClose"
          class="close cursor-pointer"
          :src="IMGBED + '/image/close.png'"
          @dragstart.prevent
          @click="handleClose"
        />
        <img class="bg" :src="IMGBED + '/image/dialog.png'" />
        <div
          class="content"
          :style="{
            width: ctxWidth,
            justifyContent: align,
          }"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean; //是否显示
  showClose?: boolean; //是否显示右上角关闭按钮
  title?: string; //左上角描述文字
  header?: string; //中间标题文字
  width?: string; //弹窗宽度
  ctxWidth?: string;
  up?: boolean; //上升动画
  align?: "flex-start" | "center" | "flex-end"; //垂直对齐方式
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "close"): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  showClose: true,
  title: "",
  header: "",
  width: "720px",
  up: false,
  ctxWidth: "80%",
  align: "flex-start",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const show = ref(false); //是否显示弹窗

onMounted(() => {
  show.value = true;
  if (props.up) {
    $switchStore.$clickAudio("e6b4");
  }
});

/* 关闭 */
const handleClose = () => {
  $switchStore.$clickAudio("6xc6");
  emit("update:modelValue", false);
  emit("close");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
