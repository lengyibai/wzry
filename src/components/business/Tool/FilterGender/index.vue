<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

const $emit = defineEmits<{
  change: [v: Game.GenderId];
}>();

const $audioStore = AudioStore();

const gender = ref<Game.GenderId>(0);

/* 选择触发 */
const handleSetGender = (v: Game.GenderId) => {
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
      v-mouse-tip="{
        text: MOUSE_TIP.ix29,
      }"
      class="iconfont wzry-nan"
      :class="{ 'nan-active': gender === 1 }"
      @click="handleSetGender(1)"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.iv65,
      }"
      class="iconfont wzry-nv"
      :class="{ 'nv-active': gender === 2 }"
      @click="handleSetGender(2)"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.jx58,
      }"
      class="iconfont wzry-xingbie"
      :class="{ 'all-active': gender === 0 }"
      @click="handleSetGender(0)"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
