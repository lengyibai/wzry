<template>
  <transition name="fade">
    <div
      class="LibMask"
      v-if="modelValue"
      @click="hide"
      v-maskGradient="{
        color: 'rgba(40, 100, 195, 0.5)',
        num1: '0%',
        num2: '50%',
      }"
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
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: rgb(0 0 0 / 50%);
  inset: 0;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}
</style>
