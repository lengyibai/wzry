<script setup lang="ts">
import { AudioStore } from "@/store";

interface Props {
  /** 选择的值 */
  modelValue: Gender;
}

defineProps<Props>();
const $emit = defineEmits<{
  "update:modelValue": [v: Gender];
}>();

const $audioStore = AudioStore();

/* 选择触发 */
const handerSetGender = (v: Gender) => {
  $emit("update:modelValue", v);
  $audioStore.play();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">只看：</span>
    <i class="iconfont wzry-nan" :class="{ 'nan-active': modelValue === 1 }" title="男" @click="handerSetGender(1)" />
    <i class="iconfont wzry-nv" :class="{ 'nv-active': modelValue === 2 }" title="女" @click="handerSetGender(2)" />
    <i
      class="iconfont wzry-xingbie"
      :class="{ 'all-active': modelValue === 0 }"
      title="全部"
      @click="handerSetGender(0)"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
