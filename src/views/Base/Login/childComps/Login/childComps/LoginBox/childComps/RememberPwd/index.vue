<script setup lang="ts">
import { computed } from "vue";

import switchStore from "@/store/switch";

interface Props {
  modelValue: boolean | string; //选中状态
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const icon = computed(
  () =>
    `${IMGBED}/image/${
      props.modelValue ? "check_true_yellow" : "check_false_yellow"
    }.png`
);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
  $switchStore.$clickAudio();
};
</script>

<template>
  <div class="remember-pwd cursor-pointer" @click="toggle">
    <img :src="icon" @dragstart.prevent />
    <span class="lib-click">记住密码</span>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
