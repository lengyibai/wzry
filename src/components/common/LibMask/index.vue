<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      v-maskGradient="{
        color: 'rgba(40, 100, 195, 0.5)',
        num1: '0%',
        num2: '50%',
      }"
      class="LibMask"
      @click="hide"
    >
      <slot></slot>
    </div>
  </transition>
</template>
<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const hide = (e) => {
  if (e.target._prevClass === "LibMask") {
    emit("update:modelValue", false);
  }
};
</script>
<style scoped lang="less">
.LibMask {
  position: fixed;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: var(--white);
  background-color: rgb(0 0 0 / 50%);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
