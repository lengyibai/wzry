<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";

const $emit = defineEmits<{
  change: [v: Game.GenderId];
}>();

const $audioStore = AudioStore();

const gender = ref<Game.GenderId>(0);

/* 选择触发 */
const handerSetGender = (v: Game.GenderId) => {
  gender.value = v;
  $emit("change", v);
  $audioStore.play();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">只看：</span>
    <i
      class="iconfont wzry-nan"
      :class="{ 'nan-active': gender === 1 }"
      title="男"
      @click="handerSetGender(1)"
    />
    <i
      class="iconfont wzry-nv"
      :class="{ 'nv-active': gender === 2 }"
      title="女"
      @click="handerSetGender(2)"
    />
    <i
      class="iconfont wzry-xingbie"
      :class="{ 'all-active': gender === 0 }"
      title="全部"
      @click="handerSetGender(0)"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
