<script setup lang="ts">
import { vMouseTip } from "@/directives";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { usePlayAudio } from "@/hooks";

const gender = defineModel<Game.GenderId>({ required: true });

const { playAudio } = usePlayAudio();

/** @description 选择触发
 * @param v 性别值
 */
const handleSetGender = (v: Game.GenderId) => {
  gender.value = v;
  playAudio();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">只看：</span>
    <i
      v-mouse-tip="{
        text: $mouseTipText('iv65', { gender: '男' }),
      }"
      class="iconfont wzry-nan"
      :class="{ 'nan-active': gender === 1 }"
      @click="handleSetGender(1)"
    />
    <i
      v-mouse-tip="{
        text: $mouseTipText('iv65', { gender: '女' }),
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
