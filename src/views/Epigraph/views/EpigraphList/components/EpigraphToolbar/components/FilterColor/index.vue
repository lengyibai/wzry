<script setup lang="ts">
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { usePlayAudio } from "@/hooks";

const color = defineModel<Game.Epigraph.Data["color"]>();

const { playAudio } = usePlayAudio();

/** 颜色选项 */
const colors: Game.Epigraph.Data["color"][] = ["BLUE", "GREEN", "RED"];

/** @description 选择触发
 * @param v 颜色
 */
const handleSetGender = (v?: Game.Epigraph.Data["color"]) => {
  color.value = v;
  playAudio();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">只看：</span>
    <div
      v-for="(item, index) in colors"
      :key="index"
      v-mouse-tip="{
        text: MOUSE_TIP.ns41,
      }"
      class="box"
      :class="[
        item.toLocaleLowerCase(),
        {
          active: color === item,
        },
      ]"
      @click="handleSetGender(item)"
    ></div>
    <div
      v-mouse-tip="{
        text: MOUSE_TIP.xv00,
      }"
      class="box all"
      :class="{
        active: color === undefined,
      }"
      @click="handleSetGender()"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
