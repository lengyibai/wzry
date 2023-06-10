<script setup lang="ts">
import { Store } from "@/store";

interface Props {
  modelValue: Gender; //标识符
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: Gender): void;
}
const emit = defineEmits<Emits>();

const $controlStore = Store.control();

/* 选择触发 */
const handerSetGender = (v: Gender) => {
  emit("update:modelValue", v);
  $controlStore.$audioStore();
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
