<script setup lang="ts">
import switchStore from "@/store/switch";

interface Props {
  modelValue: Gender; //标识符
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: Gender): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

/* 选择触发 */
const handerSetGender = (v: Gender) => {
  emit("update:modelValue", v);
  $switchStore.$clickAudio();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span>只看：</span>
    <i
      class="iconfont wzry-nan cursor-pointer"
      :class="{ 'nan-active': modelValue === 1 }"
      title="男"
      @click="handerSetGender(1)"
    />
    <i
      class="iconfont wzry-nv cursor-pointer"
      :class="{ 'nv-active': modelValue === 2 }"
      title="女"
      @click="handerSetGender(2)"
    />
    <i
      class="iconfont wzry-xingbie cursor-pointer"
      :class="{ 'all-active': modelValue === 0 }"
      title="全部"
      @click="handerSetGender(0)"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
