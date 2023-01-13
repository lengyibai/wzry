<script setup lang="ts">
interface Emits {
  (e: "into", v: string): void;
}
const emit = defineEmits<Emits>();

/* 进入方式 */
const handleInto = (v: string) => {
  emit("into", v);
};
</script>

<template>
  <div class="select-into">
    <K-Button class="reg" @click="handleInto('注册')">{{ "注册" }}</K-Button>
    <K-Button type="warning" @click="handleInto('登录')">{{ "登录" }}</K-Button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
