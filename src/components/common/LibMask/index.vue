<template>
  <transition name="fade">
    <div class="LibMask" v-if="modelValue" @click="hide">
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

const emit = defineEmits(['update:modelValue']);
const hide = (e) => {
  if (e.target._prevClass === 'LibMask') {
    this.$emit('update:modelValue', false);
  }
};
</script>
<style scoped lang="less">
.LibMask {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;

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
