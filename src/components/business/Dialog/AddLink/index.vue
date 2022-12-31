<template>
  <LibMask>
    <transition :name="type">
      <div class="AddLink" :style="{ width: '750px' }" v-show="modelValue">
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-show="showClose"
          src="https://lengyibai.gitee.io/wzry-material/image/close.png"
          @dragstart.prevent
          @click="close"
        />
        <img
          class="bg"
          src="https://lengyibai.gitee.io/wzry-material/image/dialog.png"
        />
        <transition name="fade">
          <div class="content" v-if="modelValue">
            <input
              type="text"
              v-focus
              :placeholder="placeholder"
              v-model="input_link"
              @keyup.enter="confirm"
            />
            <!-- v-if解决按钮隐式显示，高度却未知，导致粒子无法正常显示 -->
            <K-Button type="warning" @click="confirm">确定</K-Button>
          </div>
        </transition>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";
import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean; //是否显示
  showClose?: boolean; //是否显示右上角关闭按钮
  title?: string; //左上角描述文字
  placeholder?: string; //输入框描述
  type?: "default" | "confirm"; //动画类型
  link?: string; //图片链接，用于修改原有的图片
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "get-link", v: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  showClose: true,
  title: "",
  placeholder: "请输入",
  type: "default",
  link: "",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const input_link = ref(""); //输入的链接

nextTick(() => {
  input_link.value = props.link;
});

/* 关闭 */
const close = () => {
  $switchStore.$clickAudio("关闭");
  emit("update:modelValue", false);
};

/* 确定 */
const confirm = () => {
  close();
  emit("get-link", input_link.value);
  input_link.value = "";
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
