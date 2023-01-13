<template>
  <LibMask v-model="modelValue">
    <transition name="confirm">
      <div class="ConfirmClose" :style="{ width: '750px' }" v-show="modelValue">
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-show="showClose"
          src="https://lengyibai.gitee.io/wzry-material/image/close.png"
          @dragstart.prevent
          @click="handleClose"
        />
        <img
          class="bg"
          src="https://lengyibai.gitee.io/wzry-material/image/dialog.png"
        />
        <div class="content">
          <div class="text">{{ text }}</div>
          <div class="button">
            <K-Button type="info" @click="handleCancel">取消</K-Button>
            <K-Button class="last" type="warning" @click="handleConfirm"
              >确定</K-Button
            >
          </div>
        </div>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean; //是否显示
  showClose?: boolean; //是否显示右上角关闭按钮
  title?: string; //左上角描述文字
  text?: string; //提示描述
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "cancel"): void;
  (e: "confirm"): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  showClose: true,
  title: "",
  text: "即将关闭，是否保存为草稿？",
});
const emit = defineEmits<Emits>();

const { modelValue } = toRefs(props);

const $switchStore = switchStore();

/* 关闭 */
const handleClose = () => {
  $switchStore.$clickAudio("关闭");
  emit("update:modelValue", false);
};

/* 取消 */
const handleCancel = () => {
  emit("cancel");
  handleClose();
};

/* 确定 */
const handleConfirm = () => {
  emit("confirm");
  handleClose();
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
