<template>
  <K-Dialog v-bind="$attrs" align="center">
    <div class="text">{{ text }}</div>
    <div class="button">
      <K-Button type="info" @click="handleCancel">取消</K-Button>
      <K-Button class="last" type="warning" @click="handleConfirm"
        >确定</K-Button
      >
    </div>
  </K-Dialog>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

import switchStore from "@/store/switch";

interface Props {
  text?: string; //提示描述
  show?: boolean; //是否隐藏
}
interface Emits {
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:v-if", v: boolean): void;
}

withDefaults(defineProps<Props>(), {
  text: "即将关闭，是否保存为草稿？",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

/* 关闭 */
const handleClose = () => {
  emit("update:v-if", false);
};

/* 取消 */
const handleCancel = () => {
  emit("cancel");
  handleClose();
  $switchStore.$clickAudio("6xc6");
};

/* 确定 */
const handleConfirm = () => {
  emit("confirm");
  handleClose();
  $switchStore.$clickAudio("36jn");
};

onMounted(() => {
  $switchStore.$clickAudio("45iy");
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
