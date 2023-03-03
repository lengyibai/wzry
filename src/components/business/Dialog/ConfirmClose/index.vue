<script setup lang="ts">
import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean; //显示/隐藏
  text?: string; //提示描述
}
withDefaults(defineProps<Props>(), {
  text: "即将关闭，是否保存为草稿？",
});

interface Emits {
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

$switchStore.$clickAudioStore("45iy");

/* 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

/* 取消 */
const handleCancel = () => {
  emit("cancel");
  close();
  $switchStore.$clickAudioStore("6xc6");
};

/* 确定 */
const handleConfirm = () => {
  emit("confirm");
  close();
  $switchStore.$clickAudioStore("36jn");
};
</script>

<template>
  <K-Dialog align="center" @close="close">
    <div class="text">{{ text }}</div>
    <div class="button">
      <K-Button type="info" @click="handleCancel">取消</K-Button>
      <K-Button class="last" type="warning" @click="handleConfirm">确定</K-Button>
    </div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
