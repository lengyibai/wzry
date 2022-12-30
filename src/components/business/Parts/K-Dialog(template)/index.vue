<template>
  <LibMask :show="modelValue">
    <transition :name="type">
      <div class="K-Dialog" :style="{ width: width }" v-show="modelValue">
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-if="showClose"
          src="https://lengyibai.gitee.io/wzry-material/image/close.png"
          @dragstart.prevent
          @click="close"
        />
        <img class="bg" src="https://lengyibai.gitee.io/wzry-material/image/dialog.png" />
        <div class="content">
          <div class="box"></div>
          <!-- v-if解决按钮隐式显示，高度却未知，导致粒子无法正常显示 -->
          <transition name="fade">
            <K-Button type="warning" v-if="modelValue" @click="close">确定</K-Button>
          </transition>
        </div>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import { ref } from "vue";
import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean;
  width?: string;
  showClose?: boolean; //是否显示右上角关闭按钮
  title?: string; //左上角描述文字
  placeholder?: string; //输入框描述
  type?: "default" | "confirm"; //动画类型
}
interface Emits {
  (e: "update:modelValue", arg: boolean): void;
  (e: "get-link", link: string): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: true,
  width: "50%",
  showClose: true,
  title: "更改名字",
  placeholder: "请输入",
  type: "default",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const link = ref("");

const close = () => {
  $switchStore.$clickAudio("关闭");
  emit("update:modelValue", false);
  emit("get-link", link.value);
  link.value = "";
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
