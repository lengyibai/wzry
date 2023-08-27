<script setup lang="ts">
import audioStore from "@/store/modules/audio";

interface Props {
  modelValue: Gender; //标识符
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: Gender): void;
}
const emit = defineEmits<Emits>();

const $audioStore = audioStore();

/* 选择触发 */
const handerSetGender = (v: Gender) => {
  emit("update:modelValue", v);
  $audioStore.play();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">{{ $t("只看") }}：</span>
    <i
      class="iconfont wzry-nan cursor-pointer"
      :class="{ 'nan-active': modelValue === 1 }"
      :title="$t('男')"
      @click="handerSetGender(1)"
    />
    <i
      class="iconfont wzry-nv cursor-pointer"
      :class="{ 'nv-active': modelValue === 2 }"
      :title="$t('女')"
      @click="handerSetGender(2)"
    />
    <i
      class="iconfont wzry-xingbie cursor-pointer"
      :class="{ 'all-active': modelValue === 0 }"
      :title="$t('全部')"
      @click="handerSetGender(0)"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
